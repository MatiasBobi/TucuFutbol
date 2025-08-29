import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Colors } from '@/constants/colors/colors';
import { GameStage, Statistic } from '@/types/game_info';
import { Image } from 'expo-image';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const MatchStats = ({
  events,
  statistics,
}: {
  events?: GameStage[];
  statistics?: Statistic[];
}) => {
  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <View style={styles.teamcolors_container}>
          <Text style={styles.local_text}>{'(Local)'} Rojo</Text>
          <Text style={styles.separator_text}>-</Text>
          <Text style={styles.visitante_text}>Verde {'(Visitante)'}</Text>
        </View>
        <View style={styles.all_stats_container}>
          <View style={styles.stats_match_container}>
            {statistics === undefined ? (
              <View>
                <Text>No hay estadísticas numéricas del partido.</Text>
              </View>
            ) : (
              statistics?.map((stats) => {
                return (
                  <View key={stats.name}>
                    <View style={styles.progress_bar_name}>
                      <Text style={styles.progress_bar_name_text}>
                        {stats.name}
                      </Text>
                    </View>
                    <View style={styles.progress_bar_container}>
                      <View
                        style={[
                          styles.bar_one,
                          {
                            width: `${stats?.percentages?.[0] * 100}%`,
                            backgroundColor: Colors.GREEN_TEAM_STATS_ONE,
                          },
                        ]}
                      >
                        <Text style={styles.value_stat_text}>
                          {stats?.values?.[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.bar_two,
                          {
                            width: `${stats?.percentages?.[1] * 100}%`,
                            backgroundColor: Colors.GREEN_TEAM_STATS_TWO,
                          },
                        ]}
                      >
                        <Text style={styles.value_stat_text}>
                          {stats?.values?.[1]}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
          <Text style={styles.events_name}>Comienzo del partido</Text>
          {events === undefined ? (
            <View>
              <Text>No hay eventos en vivo disponibles.</Text>
            </View>
          ) : (
            events.map((event, index) => (
              <View
                key={`${event.name}_${index}`}
                style={styles.events_container}
              >
                {event.rows.map((row, index) => (
                  <View key={index} style={styles.events_row_container}>
                    <Text style={styles.events_time}>{row?.time}</Text>
                    {row?.events?.map((event, index) => (
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
                                contentFit="contain"
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
                                contentFit="contain"
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
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamcolors_container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  },
  local_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.RED_CHANGE_PLAYER,
  },
  visitante_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.GREEN_TEAM_STATS_TWO,
  },
  separator_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
  },
  events_row_container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  events_name: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
  },
  events_time: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }],
    fontSize: 16,
    color: Colors.WHITE_GRAY,
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
    width: '100%',
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
    color: Colors.YELLOW_GOAL,
    textAlign: 'center',
  },
  events_container_text: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  events_text: {
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  events_text_change: {
    color: Colors.RED_CHANGE_PLAYER,
    textAlign: 'center',
  },
  goal_player_name_text: {},
  goals_match_container_team1_results: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  goals_match_container_team2_results: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  events_text_penalty: {
    color: Colors.RED_CHANGE_PLAYER,

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  all_stats_container: {
    flexDirection: 'column',
  },
  stats_match_container: {
    flexDirection: 'column',
    borderBottomWidth: 10,
    borderBottomColor: Colors.BLUE_BORDER,
    marginBottom: 16,
  },
  progress_bar_container: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  bar_one: {
    height: '100%',
  },
  bar_two: {
    height: '100%',
  },
  value_stat_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.GRAY_LIGHT,
    textAlign: 'center',
  },
  progress_bar_name: {
    marginVertical: 14,
  },
  progress_bar_name_text: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
  },
  moreInfo_container: {
    width: '100%',
    height: height * 0.1,
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfo_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
  },
});

export default MatchStats;
