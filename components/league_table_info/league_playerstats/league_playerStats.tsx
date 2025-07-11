import { Colors } from '@/constants/colors/colors';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View } from 'react-native';
import { StatisticsTable } from '../../../types/league_full_info';
import StatsTable from './stats_table/stats_table';
export default function LeaguePlayerStats({
  league_stats,
}: {
  league_stats: StatisticsTable[] | undefined;
}) {
  const renderSubTable = ({
    item,
    index,
  }: {
    item: StatisticsTable;
    index: number;
  }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <StatsTable
          rows_table={item.rows.slice(0, 20)}
          table_name={item.name}
        />
      </View>
    );
  };

  if (league_stats === undefined) {
    return (
      <View style={styles.error_container}>
        <Text style={styles.error_text}>
          La liga/copa actual no contiene estadísticas de los jugadores.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlashList
        estimatedItemSize={100}
        data={league_stats}
        renderItem={renderSubTable}
        keyExtractor={(item, index) =>
          `${item.name}_${index} || 'no-name'LP_${index} `
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  error_container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  error_text: {
    fontSize: 28,
    textAlign: 'center',
    color: Colors.WHITE_GRAY,
  },
});
