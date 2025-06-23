import { Colors } from '@/constants/colors/colors';
import { useLeagueList } from '@/hooks/league_list/useLeagueList';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Leagues() {
  const { data, isLoading, error } = useLeagueList();

  return (
    <ScrollView>
      <View style={styles.leagues_container}>
        {data?.map((category, index) => (
          <View key={index} style={styles.league_container}>
            <Text style={styles.league_name}>{category.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  leagues_container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    alignItems: 'center',
  },
  league_container: {
    padding: 20,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  league_name: {
    fontSize: 24,
    color: Colors.YELLOW_LIGHT,
    padding: 10,
    fontWeight: 'bold',
  },
});
