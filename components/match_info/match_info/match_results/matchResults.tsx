import { Colors } from '@/constants/colors/colors';
import { RecentForm } from '@/types/game_info';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

type teamInfo = {
  name: string;
  id: string | undefined;
};

const MatchResults = ({
  recent,
  team1Info,
  team2Info,
}: {
  recent: RecentForm;
  team1Info: teamInfo;
  team2Info: teamInfo;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title_text}>Últimos partidos</Text>
      </View>
      <View style={styles.teams_container}>
        <View style={styles.team_container}>
          <View style={styles.image_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1Info.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <View style={styles.name_team_container}>
              <Text style={styles.team_name_text}>{team1Info.name}</Text>
            </View>
          </View>
          <View style={styles.last_results_container}>
            {recent.home.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.text_recent_container,
                  {
                    backgroundColor:
                      value === 1
                        ? '#16831b'
                        : value === 0
                        ? '#B50B0B'
                        : '#828204',
                  },
                ]}
              >
                <Text style={[styles.text_recent]}>
                  {value === 1 ? 'V' : value === 0 ? 'P' : 'E'}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.team_container}>
          <View style={styles.image_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2Info.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <View style={styles.name_team_container}>
              <Text style={styles.team_name_text}>{team2Info.name}</Text>
            </View>
          </View>
          <View style={styles.last_results_container}>
            {recent.away.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.text_recent_container,
                  {
                    backgroundColor:
                      value === 1
                        ? '#16831b'
                        : value === 0
                        ? '#B50B0B'
                        : '#828204',
                  },
                ]}
              >
                <Text style={[styles.text_recent, ,]}>
                  {value === 1 ? 'V' : value === 0 ? 'P' : 'E'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,

    borderRadius: 10,
    width: width * 0.95,
  },
  name_team_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    maxWidth: '100%',
  },
  title_text: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  last_results_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
  text_recent_container: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teams_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  team_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text_recent: {
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
    fontSize: 12,
  },
  team_name_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    maxWidth: 100,
  },
});
export default MatchResults;
