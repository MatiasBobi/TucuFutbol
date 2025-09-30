import { TeamLink } from "@/components/league_table_info/league_teams/team/team_link";
import { Colors } from "@/constants/colors/colors";
import { useFavoritesStore } from "@/store/favorites";
import { Stack } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const FavoritesTeam = () => {
  const { getAllTeams } = useFavoritesStore();
  const allTeams = getAllTeams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Mis equipos",
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container_teams}>
          {allTeams.map((team) => (
            <View key={team.id} style={styles.teamItem}>
              <TeamLink id={team.id} team_name={team.name} />
            </View>
          ))}
        </View>

        {allTeams.length === 0 && (
          <View style={styles.add_team_container}>
            <Text style={styles.add_team_text}>
              Para agregar un equipo a favoritos, necesitas entrar a ese equipo
              y apretar el botón de "Agregar a favoritos".
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  scrollContainer: {},
  container_teams: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    padding: 20,
  },
  teamItem: {
    minWidth: 150,
    minHeight: 100,
    maxHeight: 150,
    marginBottom: 15,
    backgroundColor: Colors.DARK_BLUE,
  },
  add_team_container: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  add_team_text: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    lineHeight: 24,
  },
});

export default FavoritesTeam;
