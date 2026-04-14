import { Colors } from "@/constants/colors/colors";
import { GamesData } from "@/types/team_info";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import FixtureTable from "./fixture_table/fixture_table";

export default function FixtureTeam({ fixture }: { fixture: GamesData }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section_header}>
          <Text style={styles.table_name_text}>Próximos Partidos</Text>
        </View>
        <FixtureTable fixture_data={fixture?.next} table_type="next" />

        <View style={styles.section_header}>
          <Text style={styles.table_name_text}>Resultados</Text>
        </View>
        <FixtureTable fixture_data={fixture?.last} table_type="last" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  section_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderLeftWidth: 4,
    borderLeftColor: Colors.YELLOW_LIGHT,
    paddingLeft: 12,
    marginBottom: 4,
    marginTop: 8,
  },
  table_name_text: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
});
