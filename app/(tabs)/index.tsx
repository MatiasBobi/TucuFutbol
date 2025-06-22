import LeagueTableToday from '@/components/today/table_today';
import useToday from '@/hooks/today_data/useTodayData';
import { TodayMatches } from '@/types/todayMatches';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { data, isLoading, error } = useToday();
  const [lastData, setLastData] = useState<TodayMatches | null>(null);

  useEffect(() => {
    if (data?.leagues) {
      setLastData(data);
    }
  }, [data]);

  const oneTimeLoading = isLoading && !lastData;

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
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <LeagueTableToday league={item} />}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'red',
  },
});
