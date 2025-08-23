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
    height: height * 0.15,
  },
  name_team_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_text: {
    fontSize: 22,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  last_results_container: {
    flexDirection: 'row',
    gap: 10,
  },
  text_recent_container: {
    marginTop: 10,
    height: height * 0.03,
    width: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teams_container: {
    flexDirection: 'row',
    height: '100%',
  },
  team_container: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_recent: {
    color: Colors.WHITE_GRAY,
  },
  team_name_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
  },
});
export default MatchResults;
