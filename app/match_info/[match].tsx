import MatchLineUp from "@/components/match_info/match_formations/matchLineUp";
import MatchInfoAndHistory from "@/components/match_info/match_info/matchInfoAndHistory";
import MatchStats from "@/components/match_info/match_stats/match_stats";
import { Colors } from "@/constants/colors/colors";
import useGameInfo from "@/hooks/game_info/useGameInfo";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const MatchInfo = () => {
  const { match } = useLocalSearchParams();

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
  const videoId = matchData?.game?.videos?.[0].video_id || "";

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
            video_id={videoId}
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
      <ScrollView>
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
            style={styles.button_pressable}
            onPress={() => setActiveSection("estadisticas")}
          >
            <Text style={styles.text_buttons}>Estadisticas</Text>
          </Pressable>
          <Pressable
            style={styles.button_pressable}
            onPress={() => setActiveSection("lineup")}
          >
            <Text style={styles.text_buttons}>Formación</Text>
          </Pressable>
          <Pressable
            style={styles.button_pressable}
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
            <View style={styles.team_match_info}>
              {/* Imagen del equipo 1, no puede exceder los 100px de ancho y alto. */}
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${team1?.id}/2`,
                }}
                style={{ width: 51, height: 60 }}
                contentFit="contain"
              />
              {/* Nombre del equipo 1, elipsesize en tail, para no romper el contenido. */}
              <Text
                style={styles.team_match_text}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {team1?.short_name || "Sin equipo"}
              </Text>
            </View>
            <View style={styles.team_match_score}>
              <View>
                {/* Contenedor para el resultado o el horaro de comienzo
              si el estado es 3, el partido finalizo entonces muestra el resultado final.
              si short_name es 'ET' entonces quiere decir que esta en entretiempo, entonces muestra 'ET' en el resultado
              de resto, es el resultado del partido.
              */}
                <Text style={styles.time_match_text}>
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
              <View style={styles.results_container}>
                <View style={styles.goals_match_container_team1_results}>
                  {penalties && (
                    <Text style={styles.events_text_penalty}>
                      {"("}
                      {penalties?.[0].toString()}
                      {")"}
                    </Text>
                  )}
                  <Text style={styles.team_match_score_text}>
                    {status?.enum === 1 ? " " : scores?.[0].toString()}
                  </Text>
                </View>
                <Text style={styles.separator_text}>-</Text>
                <View style={styles.goals_match_container_team2_results}>
                  <Text style={styles.team_match_score_text}>
                    {status?.enum === 1 ? " " : scores?.[1].toString()}
                  </Text>
                  {penalties && (
                    <Text style={styles.events_text_penalty}>
                      {"("}
                      {penalties?.[1].toString()}
                      {")"}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.team_match_info}>
              {/* Imagen del equipo 2, no puede exceder los 100px de ancho y alto. */}
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${team2?.id}/2`,
                }}
                style={{ width: 60, height: 60 }}
                contentFit="contain"
              />
              {/* Nombre del equipo 2, elipsesize en tail, para no romper el contenido. */}
              <Text
                style={styles.team_match_text}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {team2?.short_name || "Sin equipo"}
              </Text>
            </View>
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
    alignItems: "center",
  },
  container_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    width: width * 0.9,

    marginBottom: 40,
    gap: 10,
  },
  container_league_all_tables: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_buttons: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  button_pressable: {
    width: width * 0.25,
    height: height * 0.08,
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
  team_match: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: height * 0.12,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  team_match_text: {
    fontSize: 16,
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  team_match_score: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  team_match_info: {
    flex: 1,
    alignItems: "center",
  },
  goals_match_container_team1_results: {
    flexDirection: "row",
  },
  goals_match_container_team2_results: {
    flexDirection: "row",
  },
  team_match_score_text: {
    fontSize: 24,
    color: Colors.YELLOW_LIGHT,
    fontWeight: "bold",
  },
  results_container: {
    flexDirection: "row",
  },
  events_text_penalty: {
    fontSize: 24,
    color: Colors.RED_CHANGE_PLAYER,
    fontWeight: "bold",
  },
  separator_text: {
    fontSize: 24,
    marginHorizontal: 10,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  time_match_text: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
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
    color: Colors.YELLOW_LIGHT,
  },
});
export default MatchInfo;
