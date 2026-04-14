import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import { GameStage, Goal, Statistic } from "@/types/game_info";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("window");
const MatchStats = ({
  events,
  statistics,
  goals_team_1,
  goals_team_2,
  team1_name,
  team2_name,
  video_id,
}: {
  events?: GameStage[];
  statistics?: Statistic[];
  goals_team_1?: Goal[];
  goals_team_2?: Goal[];
  team1_name?: string;
  team2_name?: string;
  video_id?: string;
}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.goals_header_text}>Goles</Text>
        </View>
        <View style={styles.goals_match_container}>
          <View
            style={{
              flex: 1,
            }}
          >
            {goals_team_1?.map((goal, index) => {
              return (
                <View
                  key={`${goal.player_sname}_${index}`}
                  style={[
                    styles.team_goal_container,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  <Text style={styles.team_goal_time}>
                    {goal.time_to_display}
                  </Text>
                  <Text style={styles.team_goal_type}>{goal.goal_type}</Text>
                  <Text style={styles.team_goal_sname}>
                    {goal.player_sname}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ flex: 1 }}>
            {goals_team_2?.map((goal, index) => {
              return (
                <View
                  key={`${goal.player_sname}_${index}`}
                  style={[
                    styles.team_goal_container,
                    { justifyContent: "flex-end" },
                  ]}
                >
                  <Text style={styles.team_goal_sname}>
                    {goal.player_sname}
                  </Text>
                  <Text style={styles.team_goal_time}>
                    {goal.time_to_display}
                  </Text>
                  <Text style={styles.team_goal_type}>{goal.goal_type}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.teamcolors_container}>
          <Text style={styles.local_text}>{team1_name}</Text>
          <Text style={styles.separator_text}>-</Text>
          <Text style={styles.visitante_text}>{team2_name}</Text>
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
            <View style={styles.events_container}>
              <Text style={styles.events_text}>
                No hay eventos en vivo disponibles.
              </Text>
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
                              {event.texts?.[0].split(" ").slice(-1)}
                            </Text>
                            {event.texts?.[1] && (
                              <Text
                                style={
                                  event.type === 1
                                    ? styles.events_text_goal
                                    : styles.events_text_change
                                }
                              >
                                {event.texts?.[1].split(" ").slice(-1)}
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
                <View style={styles.stage_separator}>
                  <View style={styles.stage_line} />
                  <Text style={styles.stage_text}>{event.name}</Text>
                  <View style={styles.stage_line} />
                </View>
              </View>
            ))
          )}
        </View>
        {video_id ? (
          <>
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
              }}
            >
              <Text style={styles.video_title_text}>Resumen del partido</Text>
              <View>
                <YoutubePlayer
                  height={300}
                  play={playing}
                  videoId={video_id ?? ""}
                  onChangeState={onStateChange}
                />
              </View>
            </Pressable>
          </>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  teamcolors_container: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  local_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.RED_CHANGE_PLAYER,
  },
  visitante_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.GREEN_WIN,
  },
  separator_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
  },
  events_row_container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
    paddingVertical: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  events_name: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    paddingVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
  },
  events_time: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    transform: [{ translateY: -10 }],
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 2,
    zIndex: 1,
  },
  events_row: {
    paddingTop: 10,
    justifyContent: "space-between",
    gap: 10,
    height: 60,
  },
  events_container: {
    width: "100%",
  },
  events_team1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  events_team2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  events_text_goal: {
    color: Colors.YELLOW_GOAL,
    textAlign: "center",
  },
  events_container_text: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  events_text: {
    marginTop: 10,
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  events_text_change: {
    color: Colors.RED_CHANGE_PLAYER,
    textAlign: "center",
  },
  goal_player_name_text: {},
  goals_match_container_team1_results: {
    alignItems: "center",
    flexDirection: "row",
  },
  goals_match_container_team2_results: {
    flexDirection: "row",
    alignItems: "center",
  },
  events_text_penalty: {
    color: Colors.RED_CHANGE_PLAYER,

    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
  },
  all_stats_container: {
    flexDirection: "column",
  },
  stats_match_container: {
    flexDirection: "column",
    borderBottomWidth: 10,
    borderBottomColor: Colors.BLUE_BORDER,
    marginBottom: 16,
  },
  progress_bar_container: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  bar_one: {
    height: "100%",
  },
  bar_two: {
    height: "100%",
  },
  value_stat_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.GRAY_LIGHT,
    textAlign: "center",
  },
  progress_bar_name: {
    marginVertical: 14,
  },
  progress_bar_name_text: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
  },
  moreInfo_container: {
    width: "100%",
    height: height * 0.1,
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
    alignItems: "center",
    justifyContent: "center",
  },
  moreInfo_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
  video_title_text: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  goals_match_container: {
    flexDirection: "row",
    borderBottomWidth: 2,

    borderBottomColor: Colors.YELLOW_LIGHT,
    marginBottom: 10,
    paddingBottom: 10,
  },
  team_goal_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    gap: 5,
  },
  team_goal_type: {
    fontSize: 14,
    color: Colors.RED_CHANGE_PLAYER,
    fontWeight: "bold",
  },
  team_goal_sname: {
    fontSize: 14,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  team_goal_time: {
    fontSize: 14,
    color: Colors.YELLOW_LIGHT,
    fontWeight: "bold",
  },
  goals_header_text: {
    fontSize: 20,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  stage_separator: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 10,
  },
  stage_line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BLUE_BORDER,
  },
  stage_text: {
    fontSize: 14,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
});

export default MatchStats;
