import LeagueTableData from "@/components/league_table_info/league_table/league_table";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import useLeagueHistory from "@/hooks/league_history/league_history";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, StyleSheet, Text, View } from "react-native";
const ModalTable = () => {
  const { league_id, season_id } = useLocalSearchParams();
  const { data, isLoading, isFetching, error } = useLeagueHistory(
    league_id as string,
    season_id as string
  ); // Query para obtener la info dela liga.

  const table = data?.tables_groups;

  if (isLoading || isFetching) {
    return (
      <View style={styles.nodata_container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: data?.league?.name || " ",
            headerStyle: {
              backgroundColor: Colors.DARK_BLUE,
            },
            headerTintColor: Colors.WHITE_GRAY,
          }}
        />
        <Text style={styles.text_nodata}>Cargando campeones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.nodata_container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: data?.league?.name || " ",
            headerStyle: {
              backgroundColor: Colors.DARK_BLUE,
            },
            headerTintColor: Colors.WHITE_GRAY,
          }}
        />
        <Text style={styles.text_nodata}>Error al cargar los campeones</Text>
      </View>
    );
  }
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: data?.league?.name || " ",
            headerStyle: {
              backgroundColor: Colors.DARK_BLUE,
            },
            headerTintColor: Colors.WHITE_GRAY,
          }}
        />
        <View style={styles.modal_table_container}>
          {table?.map((item) =>
            item.tables.map((table) => (
              <View key={table.name}>
                <LeagueTableData table={table.table} table_name={table.name} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DARK_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_table_container: {
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
  },
  nodata_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.DARK_BLUE,
  },
  text_nodata: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default ModalTable;
