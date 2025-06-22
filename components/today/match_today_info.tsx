import useGameInfo from '@/hooks/game_info/useGameInfo';
import { Game } from '@/types/todayMatches';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MatchTodayInfo(props: { teams: Game }) {
  const { teams } = props;
  const team1 = teams?.teams?.[0];
  const team2 = teams?.teams?.[1];
  const [isExpanded, setIsExpanded] = useState(false);
  const matchStatus =
    teams?.status?.enum === 3
      ? 'finished'
      : teams?.status?.enum === 1
      ? 'pre'
      : 'live';

  const { data, isLoading, error, isFetching, refetch } = useGameInfo(
    teams?.id,
    isExpanded,
    matchStatus,
  );
  const events = data?.game?.events || null;

  return (
    <View>
      <Pressable
        style={styles.info_match_container}
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <View style={styles.team_match}>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1?.id}/2`,
              }}
              style={{ width: 51, height: 60 }}
              resizeMode="center"
            />
            <Text
              style={styles.team_match_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team1?.short_name}
            </Text>
          </View>
          <View style={styles.team_match_score}>
            <Text style={styles.team_match_score_text}>
              {teams?.status?.enum === 1 ? ' ' : teams?.scores?.[0].toString()}
            </Text>
            <View>
              <Text style={styles.time_match_text}>
                {teams?.status?.enum === 3
                  ? teams?.status?.short_name
                  : teams?.status?.short_name === 'ET'
                  ? 'ET'
                  : teams?.status?.enum === 1
                  ? teams?.start_time?.split(' ')[1]
                  : teams?.game_time_to_display === '-1'
                  ? 'ERROR'
                  : teams?.game_time_to_display}
              </Text>
            </View>
            <Text style={styles.team_match_score_text}>
              {teams?.status?.enum === 1 ? ' ' : teams?.scores?.[1].toString()}
            </Text>
          </View>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2?.id}/2`,
              }}
              style={{ width: 60, height: 60 }}
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

        {isExpanded ? (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="#F5F5F5" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#F5F5F5" />
        )}

        {isExpanded ? (
          <View>
            {events &&
              events.map((event, index) => (
                <View key={index} style={styles.events_container}>
                  {event.rows.map((row, index) => (
                    <View key={index} style={styles.events_row_container}>
                      <Text style={styles.events_time}>{row.time}</Text>
                      {row.events.map((event, index) => (
                        <View key={index} style={styles.events_row}>
                          <View
                            style={
                              event.team === 1
                                ? styles.events_team1
                                : styles.events_team2
                            }
                          >
                            {event.team === 1 && (
                              <View>
                                <Image
                                  source={{
                                    uri: `https://api.promiedos.com.ar/images/games/event/${event.type}`,
                                  }}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode="center"
                                />
                              </View>
                            )}
                            <View style={styles.events_container_text}>
                              <Text style={styles.events_text}>
                                {event.texts?.[0].split(' ').slice(-1)}
                              </Text>
                              {event.texts?.[1] && (
                                <Text
                                  style={
                                    event.type === 1
                                      ? styles.events_text_goal
                                      : styles.events_text_change
                                  }
                                >
                                  {event.texts?.[1].split(' ').slice(-1)}
                                </Text>
                              )}
                            </View>
                            {event.team === 2 && (
                              <View>
                                <Image
                                  source={{
                                    uri: `https://api.promiedos.com.ar/images/games/event/${event.type}`,
                                  }}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode="center"
                                />
                              </View>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                  <Text style={styles.events_name}>{event.name}</Text>
                </View>
              ))}
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

/*

{(team1?.goals || team2?.goals) && (
              <View style={styles.goals_match_container}>
                <View style={styles.goals_match_container_team1}>
                  {team1.goals?.map((goal, index) => (
                    <Text key={index} style={styles.goal_text}>
                      <Text style={styles.time_text}>
                        {goal?.time_to_display}{' '}
                        {goal?.goal_type &&
                          '(' + goal?.goal_type?.slice(0, 1) + ')'}
                      </Text>
                      <Text style={styles.goal_player_name_text}>
                        {goal?.player_sname}
                      </Text>
                    </Text>
                  ))}
                </View>
                <View style={styles.goals_match_container_team2}>
                  {team2.goals?.map((goal, index) => (
                    <Text key={index} style={styles.goal_text}>
                      <Text style={styles.goal_player_name_text}>
                        {goal?.player_sname}
                      </Text>
                      <Text style={styles.time_text}>
                        {' '}
                        {goal?.time_to_display}
                        {goal?.goal_type &&
                          '(' + goal?.goal_type?.slice(0, 1) + ')'}
                      </Text>
                    </Text>
                  ))}
                </View>
              </View>
            )}
*/

const styles = StyleSheet.create({
  info_match_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1b2a57',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#2c3b70',
  },
  team_match: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  team_match_info: {
    width: 140,
    alignItems: 'center',
  },
  team_match_text: {
    fontSize: 17,
    color: '#F5F5F5',
    fontWeight: 'bold',
    width: 140,
    textAlign: 'center',
  },
  team_match_score: {
    width: 80,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  team_match_score_text: {
    fontSize: 28,
    color: '#EDEDED',
    fontWeight: 'bold',
    width: 10,
    textAlign: 'center',
  },
  time_match_text: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  goals_match_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  goals_match_container_team1: {
    width: 150,
    gap: 10,
    alignItems: 'flex-start',
  },
  goals_match_container_team2: {
    width: 150,
    gap: 10,
    alignItems: 'flex-end',
  },
  goal_text: {
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
  time_text: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  events_row_container: {
    borderBottomWidth: 1,
    borderBottomColor: '#1b2a57',
    paddingVertical: 10,
    position: 'relative',
  },
  events_name: {
    fontSize: 16,
    color: '#F5F5F5',
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1b2a57',
  },
  events_time: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }],
    fontSize: 16,
    color: '#F5F5F5',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 2,
    zIndex: 1,
  },
  events_row: {
    paddingTop: 10,
    justifyContent: 'space-between',
    gap: 10,
    height: 60,
  },
  events_container: {
    width: 360,
  },
  events_team1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  events_team2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  events_text_goal: {
    color: '#aa9526',
    textAlign: 'center',
  },
  events_container_text: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  events_text: {
    color: '#FFD700',
    textAlign: 'center',
  },
  events_text_change: {
    color: '#e31919',
    textAlign: 'center',
  },
  goal_player_name_text: {},
});
