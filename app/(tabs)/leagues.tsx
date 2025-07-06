import League_table from '@/components/leagues/league_container';
import { Colors } from '@/constants/colors/colors';
import { useLeagueList } from '@/hooks/league_list/useLeagueList';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Leagues() {
  const { data, isLoading, error } = useLeagueList();

  const renderLeagueItem = ({ item, index }: { item: any; index: number }) => (
    <League_table key={index} league={item} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ligas</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#427130" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Error: {error.message}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderLeagueItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  title: {
    color: Colors.YELLOW_LIGHT,
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
  },
  leagues_container: {
    paddingVertical: 20,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.YELLOW_LIGHT,
  },
});
