import { TeamLink } from '@/components/league_table_info/league_teams/team/team_link';
import { Colors } from '@/constants/colors/colors';
import { useFavoritesStore } from '@/store/favorites';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
const FavoritesTeam = () => {
  const { getAllTeams } = useFavoritesStore();
  const allTeams = getAllTeams();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Mis equipos',
            headerStyle: {
              backgroundColor: Colors.DARK_BLUE,
            },
            headerTintColor: Colors.WHITE_GRAY,
          }}
        />
        <View style={styles.container_teams}>
          {allTeams.map((team, index) => {
            return (
              <View key={team.id}>
                <TeamLink id={team.id} team_name={team.name} />
              </View>
            );
          })}
        </View>
        <View style={styles.add_team_container}>
          <Text style={styles.add_team_text}>
            Para agregar un equipo a favoritos, necesitas entrar a ese equipo y
            apretar el botón de "Agregar a favoritos".
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    alignItems: 'center',
  },
  container_teams: {
    paddingTop: 20,
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 20,
  },
  add_team_container: {
    alignItems: 'center',
    marginTop: 24,
    width: '95%',
    justifyContent: 'center',
  },
  add_team_text: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
  },
});

export default FavoritesTeam;
