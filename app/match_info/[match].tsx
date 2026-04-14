import MatchLineUp from "@/components/match_info/match_formations/matchLineUp";
import MatchInfoAndHistory from "@/components/match_info/match_info/matchInfoAndHistory";
import MatchStats from "@/components/match_info/match_stats/match_stats";
import { Colors } from "@/constants/colors/colors";
import useGameInfo from "@/hooks/game_info/useGameInfo";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");
const MatchInfo = () => {
  const { match } = useLocalSearchParams();

  if (!match || match === "not_match_found") {
    return (
      <View>
        <Text>El partido no existe o no esta disponible todavia.</Text>
      </View>
    );
  }

  const { data, isFetching } = useGameInfo(match.toString());
  const matchData = data;

  const team1 = matchData?.game?.teams?.[0] || null;
  const team2 = matchData?.game?.teams?.[1] || null;
  const status = matchData?.game?.status;
  const start_time = matchData?.game?.start_time;
  const penalties = matchData?.game?.penalties;
  const game_time_to_display = matchData?.game?.game_time_to_display;
  const scores = matchData?.game?.scores;
  const game_info = matchData?.game?.game_info;
  const headtohead = matchData?.game?.head_to_head;
  const recent = matchData?.game?.recent_form;
  const standings = matchData?.game?.standings;
  const videoId = matchData?.game?.videos?.[0]?.video_id || "";
  const goals_team1 = matchData?.game?.teams?.[0]?.goals;
  const goals_team2 = matchData?.game?.teams?.[1]?.goals;

  const [activeSection, setActiveSection] = useState<
    "estadisticas" | "lineup" | "informacion"
  >("estadisticas");

  const [firstLoading, setFirstloading] = useState(true);

  useEffect(() => {
    if (!isFetching && firstLoading) {
      setFirstloading(false);
    }
  }, [isFetching, firstLoading]);
  const renderSection = () => {
    switch (activeSection) {
      case "estadisticas":
        if (!matchData?.game?.events && !matchData?.game?.statistics) {
          return (
            <View style={styles.notfound_container}>
              <Text style={styles.notfound_text}>
                No hay estadisticas disponible todavia.
              </Text>
            </View>
          );
        }
        return (
          <MatchStats
            events={matchData?.game?.events}
            statistics={matchData?.game?.statistics}
            goals_team_1={goals_team1 ?? []}
            goals_team_2={goals_team2 ?? []}
            team1_name={team1?.short_name || "Equipo 1"}
            team2_name={team2?.short_name || "Equipo 2"}
            video_id={videoId ?? ""}
          />
        );

      case "lineup":
        if (!matchData?.game?.players) {
          return (
            <View style={styles.notfound_container}>
              <Text style={styles.notfound_text}>
                Las formaciones no estan disponibles todavia.
              </Text>
            </View>
          );
        }
        if (!team1 || !team2) {
          return (
            <View style={styles.notfound_container}>
              <Text style={styles.notfound_text}>
                No estan todos los equipos disponibles.
              </Text>
            </View>
          );
        }
        return (
          <MatchLineUp
            lineups={matchData?.game?.players}
            team1={team1}
            team2={team2}
          />
        );

      case "informacion":
        if (!game_info && !recent && !headtohead && !standings) {
          return (
            <View style={styles.notfound_container}>
              <Text style={styles.notfound_text}>
                No hay información disponible todavia.
              </Text>
            </View>
          );
        }
        return (
          <View>
            <MatchInfoAndHistory
              game_info={game_info}
              headtohead={headtohead}
              recent={recent}
              standings={standings}
              team1Info={{ name: team1?.name || "Equipo 1", id: team1?.id }}
              team2Info={{ name: team2?.name || "Equipo 2", id: team2?.id }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle:
              `${matchData?.game?.teams?.[0]?.name} vs ${matchData?.game?.teams?.[1]?.name}` ||
              "Cargando...",
            headerStyle: {
              backgroundColor: Colors.DARK_BLUE,
            },
            headerTintColor: Colors.WHITE_GRAY,
          }}
        />

        <View style={styles.container_buttons}>
          {/* Botones para cambiar la sección */}
          <Pressable
            style={[
              styles.button_pressable,
              activeSection === "estadisticas" && {
                backgroundColor: Colors.ACTIVATE_BUTTON_NOTI,
              },
            ]}
            onPress={() => setActiveSection("estadisticas")}
          >
            <Text style={styles.text_buttons}>Estadisticas</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button_pressable,
              activeSection === "lineup" && {
                backgroundColor: Colors.ACTIVATE_BUTTON_NOTI,
              },
            ]}
            onPress={() => setActiveSection("lineup")}
          >
            <Text style={styles.text_buttons}>Formación</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button_pressable,
              activeSection === "informacion" && {
                backgroundColor: Colors.ACTIVATE_BUTTON_NOTI,
              },
            ]}
            onPress={() => setActiveSection("informacion")}
          >
            <Text style={styles.text_buttons}>Información</Text>
          </Pressable>
        </View>
        {isFetching && firstLoading ? (
          <View>
            <Text style={styles.loading_images_text}>Cargando horario...</Text>
          </View>
        ) : (
          <View style={styles.team_match}>
            {/* Equipo 1 */}
            <Link
              href={{
                pathname: "/team/[team]",
                params: { team: team1?.id ?? "" },
              }}
              asChild
            >
              <Pressable style={styles.team_match_info}>
                <Image
                  source={{
                    uri: `https://api.promiedos.com.ar/images/team/${team1?.id}/2`,
                  }}
                  style={{ width: 70, height: 70 }}
                  contentFit="contain"
                />
                <Text style={styles.team_match_text} numberOfLines={2}>
                  {team1?.short_name || "Sin equipo"}
                </Text>
                {status?.enum !== 1 && (
                  <Text
                    style={[
                      styles.team_match_score_text,
                      scores &&
                        scores?.[0] > scores?.[1] &&
                        styles.score_winner,
                    ]}
                  >
                    {penalties && (
                      <Text style={styles.events_text_penalty}>
                        ({penalties?.[0]}){" "}
                      </Text>
                    )}
                    {scores?.[0].toString()}
                  </Text>
                )}
              </Pressable>
            </Link>

            {/* Centro */}
            <View style={styles.team_match_score}>
              {/* ✅ Badge de estado */}
              <View
                style={[
                  styles.status_badge,
                  status?.enum === 3 && styles.status_badge_finished,
                  status?.enum === 2 && styles.status_badge_live,
                  status?.enum === 1 && styles.status_badge_pre,
                ]}
              >
                <Text style={styles.status_badge_text}>
                  {status?.enum === 3
                    ? status?.short_name === "Final"
                      ? "Final"
                      : status?.symbol_name + " (Final)"
                    : status?.short_name === "ET"
                      ? "ET"
                      : status?.enum === 1
                        ? start_time?.split(" ")[1]
                        : game_time_to_display === "-1"
                          ? "ERROR"
                          : game_time_to_display}
                </Text>
              </View>

              {/* ✅ Separador VS o guión cuando no empezó */}
              {status?.enum !== 1 && <Text style={styles.vs_text}>VS</Text>}
            </View>

            {/* Equipo 2 */}
            <Link
              href={{
                pathname: "/team/[team]",
                params: { team: team2?.id ?? "" },
              }}
              asChild
            >
              <Pressable style={styles.team_match_info}>
                <Image
                  source={{
                    uri: `https://api.promiedos.com.ar/images/team/${team2?.id}/2`,
                  }}
                  style={{ width: 70, height: 70 }}
                  contentFit="contain"
                />
                <Text style={styles.team_match_text} numberOfLines={2}>
                  {team2?.short_name || "Sin equipo"}
                </Text>
                {status?.enum !== 1 && (
                  <Text
                    style={[
                      styles.team_match_score_text,
                      scores && scores[1] > scores[0] && styles.score_winner,
                    ]}
                  >
                    {scores?.[1].toString()}
                    {penalties && (
                      <Text style={styles.events_text_penalty}>
                        {" "}
                        ({penalties?.[1]})
                      </Text>
                    )}
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
        )}
        {renderSection()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
  },

  container_league_all_tables: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container_buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",

    justifyContent: "center",
    width: width * 0.9,
    minWidth: width * 0.9,
    maxWidth: Math.min(width * 0.95, 600),
    marginBottom: 40,
    gap: 10,
    alignSelf: "center",
  },
  text_buttons: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  button_pressable: {
    minWidth: width * 0.25,
    maxWidth: width * 0.4,
    minHeight: height * 0.08,
    maxHeight: height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  table_name_text: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    paddingVertical: 10,
  },

  team_match_info_subcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  goals_match_container_team1_results: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 5,
  },
  goals_match_container_team2_results: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 5,
  },

  results_container: {
    flexDirection: "row",
  },

  separator_text: {
    fontSize: 24,
    marginHorizontal: 10,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  time_match_text: {
    fontSize: RFValue(16),
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  notfound_container: {
    flex: 1,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  notfound_text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.RED_CHANGE_PLAYER,
  },
  loading_images_text: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
    marginVertical: 20,
  },
  team_match: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.BLUE_BORDER,
  },
  team_match_info: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  team_match_text: {
    fontSize: RFValue(13),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    fontWeight: "bold",
    maxWidth: width * 0.28,
  },
  team_match_score: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 8,
  },
  team_match_score_text: {
    fontSize: RFValue(28),
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  score_winner: {
    color: Colors.YELLOW_LIGHT, // ✅ ganador en amarillo
  },
  vs_text: {
    fontSize: RFValue(14),
    color: Colors.GRAY_LIGHT,
    fontWeight: "bold",
  },

  // ✅ Badge de estado
  status_badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: Colors.DARK_BLUE,
  },
  status_badge_finished: {
    backgroundColor: "#2a2a2a",
  },
  status_badge_live: {
    backgroundColor: "#8b0000", // rojo oscuro
  },
  status_badge_pre: {
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
  },
  status_badge_text: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
  },
  events_text_penalty: {
    fontSize: RFValue(16),
    color: Colors.RED_CHANGE_PLAYER,
    fontWeight: "bold",
  },
});
export default MatchInfo;
