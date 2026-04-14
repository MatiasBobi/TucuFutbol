import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatisticsTable } from "../../../types/league_full_info";
import StatsTable from "./stats_table/stats_table";
export default function LeaguePlayerStats({
  league_stats,
}: {
  league_stats: StatisticsTable[] | undefined;
}) {
  const renderSubTable = ({ item }: { item: StatisticsTable }) => {
    return (
      <View style={[styles.cardItem, { alignItems: "center" }]}>
        <StatsTable
          rows_table={item?.rows.slice(0, 20)}
          table_name={item?.name}
        />
      </View>
    );
  };

  // Si respuesta no contiene informacion
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
    <ScreenContainer>
      <View style={styles.container}>
        <FlatList
          data={league_stats}
          renderItem={renderSubTable}
          keyExtractor={(item, index) =>
            `${item?.name}_${index} || 'no-name'LP_${index} `
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  error_container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  error_text: {
    fontSize: 28,
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
  cardItem: {
    backgroundColor: "#1e2a44",
    borderRadius: 16,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
