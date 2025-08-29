import { LeagueTableToday } from '@/components/today/table_today';
import { Colors } from '@/constants/colors/colors';
import useToday from '@/hooks/today_data/useTodayData';
import { League, TodayMatches } from '@/types/todayMatches';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default function HomeScreen() {
  const { data, isLoading, error, isFetching } = useToday();
  const [lastData, setLastData] = useState<TodayMatches | null>(null);

  // Actualiza el estado con la data vieja.
  useEffect(() => {
    if (data?.leagues) {
      setLastData(data);
    }
  }, [data]);

  const renderMatches = useCallback(
    ({ item }: { item: League }) => <LeagueTableToday league={item} />,
    [],
  );

  const oneTimeLoading = isLoading && !lastData;

  /* Verifica si se esta cargando por primera vez, una vez cargado ya no muestra el mensaje de cargando sino data vieja.*/
  if (oneTimeLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#427130" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && !lastData && (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      )}
      {lastData && (
        <FlatList
          data={data?.leagues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatches}
          contentContainerStyle={styles.contentContainer}
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
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DARK_BLUE,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
  },
  errorText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'red',
  },
});
