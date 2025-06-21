import { Game } from '@/types/todayMatches';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function MatchTodayInfo(props: { teams: Game }) {
  const { teams } = props;
  const team1 = teams.teams[0];
  const team2 = teams.teams[1];

  return (
    <View style={styles.info_match_container}>
      <View style={styles.container_match}>
        <View style={styles.time_match}>
          <Text style={styles.time_match_text}>
            {teams.status.enum === 3
              ? teams.status.short_name
              : teams.status.short_name === 'ET'
              ? 'ET'
              : teams.status.enum === 1
              ? teams.start_time.split(' ')[1]
              : teams.game_time_to_display === '-1'
              ? 'ERROR'
              : teams.game_time_to_display}
          </Text>
        </View>
        <View style={styles.team_match}>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1.id}/1`,
              }}
              style={{ width: 31, height: 40 }}
              resizeMode="center"
            />
            <Text
              style={styles.team_match_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team1.short_name}
            </Text>
          </View>
          <View style={styles.team_match_score}>
            <Text style={styles.team_match_score_text}>
              {teams.status.enum === 1 ? ' ' : teams.scores[0].toString()}
            </Text>
            <Text style={styles.team_match_vs}>-</Text>
            <Text style={styles.team_match_score_text}>
              {teams.status.enum === 1 ? ' ' : teams.scores[1].toString()}
            </Text>
          </View>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2.id}/1`,
              }}
              style={{ width: 31, height: 40 }}
              resizeMode="center"
            />
            <Text
              style={styles.team_match_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team2.short_name}
            </Text>
          </View>
        </View>
      </View>
      {(team1.goals || team2.goals) && (
        <View style={styles.goals_match_container}>
          <View style={styles.goals_match_container_team1}>
            {team1.goals?.map((goal, index) => (
              <Text key={index} style={styles.goal_text}>
                <Text style={styles.time_text}>
                  {goal.time_to_display}{' '}
                  {goal.goal_type && '(' + goal.goal_type?.slice(0, 1) + ')'}
                </Text>
                <Text style={styles.goal_player_name_text}>
                  {goal.player_sname}
                </Text>
              </Text>
            ))}
          </View>
          <View style={styles.goals_match_container_team2}>
            {team2.goals?.map((goal, index) => (
              <Text key={index} style={styles.goal_text}>
                <Text style={styles.time_text}>
                  {goal.time_to_display}{' '}
                  {goal.goal_type && '(' + goal.goal_type?.slice(0, 1) + ')'}
                </Text>
                <Text style={styles.goal_player_name_text}>
                  {goal.player_sname}
                </Text>
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  info_match_container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goals_match_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  goals_match_container_team1: {
    width: 120,
    marginLeft: 50,
  },
  goals_match_container_team2: {
    width: 120,
  },
  container_match: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: 'white',
    paddingHorizontal: 10,
  },
  goal_text: {
    width: 100,
    marginTop: 5,
  },
  time_text: {
    fontSize: 14,
    color: '#e71c4a',
    fontWeight: 'bold',
  },
  goal_player_name_text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  time_match: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 5,
    marginLeft: -10,
  },
  time_match_text: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  team_match: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team_match_text: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    width: 90,
    textAlign: 'left',
  },
  team_match_info: {
    width: 140,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  team_match_score: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginRight: 20,
  },
  team_match_score_text: {
    fontSize: 24,
    color: '#e71c4a',
    fontWeight: 'bold',
    width: 10,
    textAlign: 'center',
  },
  team_match_vs: {
    fontSize: 24,
    color: '#FFFFFF',
    width: 20,
    textAlign: 'center',
  },
});
