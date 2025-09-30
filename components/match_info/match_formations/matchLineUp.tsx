import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import { MissingPlayer, Team, TeamLineup } from "@/types/game_info";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; // Tarjeta amarilla
import { Image } from "expo-image";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type LineupsTeam = {
  lineups: {
    support_visual_lineups: boolean;
    teams: TeamLineup[];
  };
  missing_players?: MissingPlayer[][];
};

const { width, height } = Dimensions.get("window");

const PLAYER_SIZE = 40;
const FIELD_WIDTH = width - 40;
const FIELD_HEIGHT = height * 0.6;
const FIELD_MARGIN = 20;
const MatchLineUp = ({
  lineups,
  team1,
  team2,
}: {
  lineups: LineupsTeam;
  team1: Team;
  team2: Team;
}) => {
  // Estado para las alineaciones
  const [teamLineUp, setTeamLineUp] = useState<"local" | "visitante">("local");

  // Función helper para renderizar eventos con separadores
  const renderPlayerEvents = (player: any): React.ReactNode[] => {
    const events: React.ReactNode[] = [];

    // Tarjeta amarilla
    if (player.events?.cards?.yellow === true) {
      events.push(
        <View key="yellow_card" style={styles.goals_container}>
          <MaterialCommunityIcons
            name="card"
            size={24}
            color={Colors.YELLOW_LIGHT}
          />
        </View>
      );
    }

    // Tarjeta roja
    if (player.events?.cards?.red === true) {
      events.push(
        <View key="red_card" style={styles.goals_container}>
          <MaterialCommunityIcons
            name="card"
            size={24}
            color={Colors.RED_CHANGE_PLAYER}
          />
        </View>
      );
    }

    // Sustitución
    if (player.events?.substitution?.has_substitution === true) {
      events.push(
        <View key="substitution" style={[styles.goals_container]}>
          <Text style={styles.goals_number_text}>
            {player?.events?.substitution?.time}'
          </Text>
          <FontAwesome
            name="exchange"
            size={24}
            color={Colors.RED_CHANGE_PLAYER}
          />
        </View>
      );
    }

    // Goles
    if (player.events?.goals?.goals && player.events.goals.goals > 0) {
      events.push(
        <View key="goals" style={styles.goals_container}>
          <Text style={styles.goals_number_text}>
            {player.events.goals.goals}x
          </Text>
          <FontAwesome
            name="soccer-ball-o"
            size={24}
            color={Colors.WHITE_GRAY}
          />
        </View>
      );
    }

    // Agregar separadores entre eventos
    const eventsWithSeparators: React.ReactNode[] = [];
    events.forEach((event, index) => {
      eventsWithSeparators.push(event);
      if (index < events.length - 1) {
        eventsWithSeparators.push(
          <View key={`separator_${index}`} style={styles.event_separator}>
            <Text style={styles.separator_text}>|</Text>
          </View>
        );
      }
    });

    return eventsWithSeparators;
  };

  // Funcion para calcular la posicion del jugador.
  const calculatePlayerPosition = (xPercent: number, yPercent: number) => {
    const positionWidth = FIELD_WIDTH - FIELD_MARGIN * 2;
    const positionHeight = FIELD_HEIGHT - FIELD_MARGIN * 2;

    const x =
      (xPercent / 100) * positionHeight - PLAYER_SIZE / 2 + FIELD_MARGIN;
    const y = (yPercent / 100) * positionWidth - PLAYER_SIZE / 2 + FIELD_MARGIN;

    return {
      left: Math.max(
        FIELD_MARGIN,
        Math.min(y, FIELD_WIDTH - PLAYER_SIZE - FIELD_MARGIN)
      ),
      top: Math.max(
        FIELD_MARGIN,
        Math.min(x, FIELD_HEIGHT - PLAYER_SIZE - FIELD_MARGIN)
      ),
    };
  };

  return (
    <ScreenContainer>
      {/* Cancha y formación. */}
      {lineups.lineups === undefined ? (
        <View>
          <Text style={styles.formatioNotFound_text}>
            No hay formación disponible todavía.
          </Text>
        </View>
      ) : (
        <View>
          {team1 && (
            <View>
              <View style={styles.formation_container}>
                <View style={styles.name_team_container}>
                  <Image
                    source={{
                      uri: `https://api.promiedos.com.ar/images/team/${team1?.id}/2`,
                    }}
                    style={{ width: 40, height: 40 }}
                    contentFit="contain"
                  />
                  <View>
                    <Text style={styles.team_name_text}>
                      {team1?.name || "Equipo Local"}
                    </Text>
                  </View>
                </View>
                <View style={styles.formation_text_container}>
                  <Text style={styles.initial_lineup_text}>
                    Formación inicial:{" "}
                  </Text>
                  <Text style={styles.formation_text}>
                    {lineups?.lineups?.teams?.[0]?.formation || "x-x-x"}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.lineup_container}>
            {/* Formación */}

            {/* LÍNEAS DEL CAMPO */}
            <View style={styles.midfieldLine} />
            <View style={styles.centerCircle} />
            <View style={styles.centerSpot} />
            <View style={[styles.penaltyArea, styles.penaltyAreaBottom]} />
            <View style={[styles.goalArea, styles.goalAreaBottom]} />
            <View style={[styles.penaltySpotBottom]} />
            <View style={[styles.penaltyArea, styles.penaltyAreaTop]} />
            <View style={[styles.goalArea, styles.goalAreaTop]} />
            <View style={[styles.penaltySpotTop]} />

            {/* Equipo local */}

            <View style={[styles.mitad_team_container]}>
              {lineups?.lineups?.teams?.[0] &&
                lineups?.lineups?.teams?.[0].starting.map((player, index) => {
                  const invertedY = 100 - (player?.pitch_location?.y ?? 0);
                  const position = calculatePlayerPosition(
                    player?.pitch_location?.x ?? 0,
                    invertedY
                  );

                  return (
                    <View
                      style={[
                        styles.player,
                        {
                          left: position.left,
                          top: position.top,
                        },
                      ]}
                      key={index}
                    >
                      <View style={styles.playerContent}>
                        <FontAwesome5
                          name="tshirt"
                          size={24}
                          color={team1?.colors?.color || "red"}
                        />
                        <Text style={styles.playerName}>
                          {player.player_short_name}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>

            {/* Equipo Visitante*/}
            <View style={[styles.mitad_team_container]}>
              {lineups?.lineups?.teams?.[1] &&
                lineups?.lineups?.teams?.[1].starting.map((player, index) => {
                  const invertedX = 100 - (player?.pitch_location?.x ?? 0);
                  const position = calculatePlayerPosition(
                    invertedX,
                    player?.pitch_location?.y ?? 0
                  );
                  return (
                    <View
                      style={[
                        styles.player,
                        {
                          left: position.left,
                          top: position.top,
                        },
                      ]}
                      key={index}
                    >
                      <View style={styles.playerContent}>
                        <FontAwesome5
                          name="tshirt"
                          size={24}
                          color={team2?.colors?.color || "blue"}
                        />
                        <Text style={styles.playerName}>
                          {player.player_short_name}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
          {team2 && (
            <View>
              <View style={[styles.formation_container]}>
                <View style={styles.name_team_container}>
                  <Image
                    source={{
                      uri: `https://api.promiedos.com.ar/images/team/${team2?.id}/2`,
                    }}
                    style={{ width: 40, height: 40 }}
                    contentFit="contain"
                  />
                  <View>
                    <Text style={styles.team_name_text}>
                      {team2?.name || "Equipo Visitante"}
                    </Text>
                  </View>
                </View>
                <View style={styles.formation_text_container}>
                  <Text style={styles.initial_lineup_text}>
                    Formación inicial:{" "}
                  </Text>
                  <Text style={styles.formation_text}>
                    {lineups?.lineups?.teams?.[1]?.formation || "x-x-x"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Alineación de cada equipo */}
      <View>
        <View style={styles.select_lineup_container}>
          <Pressable
            style={[
              styles.button_team_lineup,
              teamLineUp === "local"
                ? {
                    backgroundColor: Colors.SLAT_BLUE,
                    borderWidth: 2,
                    borderColor: Colors.YELLOW_LIGHT,
                  }
                : { backgroundColor: Colors.LIGHT_BLUE_DARK },
            ]}
            onPress={() => setTeamLineUp("local")}
          >
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
          </Pressable>
          <Pressable
            style={[
              styles.button_team_lineup,
              teamLineUp === "visitante"
                ? {
                    backgroundColor: Colors.SLAT_BLUE,
                    borderWidth: 2,
                    borderColor: Colors.YELLOW_LIGHT,
                  }
                : { backgroundColor: Colors.LIGHT_BLUE_DARK },
            ]}
            onPress={() => setTeamLineUp("visitante")}
          >
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
          </Pressable>
        </View>
        <View>
          <View>
            {/* Equipo local */}
            {teamLineUp === "local" ? (
              <View>
                {lineups.lineups === undefined ? null : (
                  <>
                    {/* Titulares */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Titulares</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[0]?.starting?.map(
                          (player, index) => {
                            return (
                              <View
                                key={`local_starting_${player.jersey_num}_${player.name}_${index}`}
                                style={styles.player_container_info}
                              >
                                <View style={styles.table_lineup_container}>
                                  <View style={styles.name_jersey_container}>
                                    <Text style={styles.formation_lineup_text}>
                                      {player?.formation_position?.split(
                                        " "
                                      )[0] || "N/A"}
                                    </Text>
                                    <View style={styles.player_container}>
                                      <Text style={styles.jersey_num_text}>
                                        {player?.jersey_num}
                                      </Text>
                                      <Text
                                        style={styles.player_lineup_name_text}
                                      >
                                        {` ${player?.name}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.ageheight_container}>
                                    <View>
                                      <Text style={styles.height_text}>
                                        {player?.height} m
                                      </Text>
                                      <Text style={styles.age_text}>
                                        {player?.age} años
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.events_container}>
                                  {renderPlayerEvents(player)}
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                    {/* Suplentes */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Suplentes</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[0]?.bench?.map(
                          (player, index) => {
                            return (
                              <View
                                key={`local_bench_${player.jersey_num}_${player.name}_${index}`}
                                style={styles.player_container_info}
                              >
                                <View style={styles.table_lineup_container}>
                                  <View style={styles.name_jersey_container}>
                                    <Text style={styles.formation_lineup_text}>
                                      {player?.formation_position?.split(
                                        " "
                                      )[0] || "N/A"}
                                    </Text>
                                    <View style={styles.player_container}>
                                      <Text style={styles.jersey_num_text}>
                                        {player?.jersey_num}
                                      </Text>
                                      <Text
                                        style={styles.player_lineup_name_text}
                                      >
                                        {` ${player?.name}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.ageheight_container}>
                                    <View>
                                      <Text style={styles.height_text}>
                                        {player?.height} m
                                      </Text>
                                      <Text style={styles.age_text}>
                                        {player?.age} años
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.events_container}>
                                  {renderPlayerEvents(player)}
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                  </>
                )}
                {/* Lesionados */}
                {lineups.missing_players === undefined ? null : (
                  <>
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Lesionados</Text>
                      </View>
                      <View>
                        {lineups?.missing_players?.[0]?.map((player, index) => {
                          return (
                            <View
                              key={`local_missing_${player.jersey_num}_${player.name}_${index}`}
                              style={styles.player_container_info}
                            >
                              <View style={styles.table_lineup_container}>
                                <View style={styles.name_jersey_container}>
                                  <Text style={styles.formation_lineup_text}>
                                    {player?.formation_position?.split(
                                      " "
                                    )[0] || "N/A"}
                                  </Text>
                                  <View style={styles.player_container}>
                                    <Text style={styles.jersey_num_text}>
                                      {player?.jersey_num}
                                    </Text>
                                    <Text
                                      style={styles.player_lineup_name_text}
                                    >
                                      {` ${player?.name}`}
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.ageheight_container}>
                                  <View>
                                    <Text style={styles.height_text}>
                                      {player?.height} m
                                    </Text>
                                    <Text style={styles.age_text}>
                                      {player?.age} años
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </>
                )}
              </View>
            ) : (
              <View>
                {lineups.lineups === undefined ? null : (
                  <>
                    {/* Titulares */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Titulares</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[1]?.starting?.map(
                          (player, index) => {
                            return (
                              <View
                                key={`visitor_starting_${player.jersey_num}_${player.name}_${index}`}
                                style={styles.player_container_info}
                              >
                                <View style={styles.table_lineup_container}>
                                  <View style={styles.name_jersey_container}>
                                    <Text style={styles.formation_lineup_text}>
                                      {player?.formation_position?.split(
                                        " "
                                      )[0] || "N/A"}
                                    </Text>
                                    <View style={styles.player_container}>
                                      <Text style={styles.jersey_num_text}>
                                        {player?.jersey_num}
                                      </Text>
                                      <Text
                                        style={styles.player_lineup_name_text}
                                      >
                                        {` ${player?.name}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.ageheight_container}>
                                    <View>
                                      <Text style={styles.height_text}>
                                        {player?.height} m
                                      </Text>
                                      <Text style={styles.age_text}>
                                        {player?.age} años
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.events_container}>
                                  {renderPlayerEvents(player)}
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                    {/* Suplentes */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Suplentes</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[1]?.bench?.map(
                          (player, index) => {
                            return (
                              <View
                                key={`visitor_bench_${player.jersey_num}_${player.name}_${index}`}
                                style={styles.player_container_info}
                              >
                                <View style={styles.table_lineup_container}>
                                  <View style={styles.name_jersey_container}>
                                    <Text style={styles.formation_lineup_text}>
                                      {player?.formation_position?.split(
                                        " "
                                      )[0] || "N/A"}
                                    </Text>
                                    <View style={styles.player_container}>
                                      <Text style={styles.jersey_num_text}>
                                        {player?.jersey_num}
                                      </Text>
                                      <Text
                                        style={styles.player_lineup_name_text}
                                      >
                                        {` ${player?.name}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.ageheight_container}>
                                    <View>
                                      <Text style={styles.height_text}>
                                        {player?.height} m
                                      </Text>
                                      <Text style={styles.age_text}>
                                        {player?.age} años
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.events_container}>
                                  {renderPlayerEvents(player)}
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                  </>
                )}
                {/* Lesionados */}
                {lineups.missing_players === undefined ? null : (
                  <>
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Lesionados</Text>
                      </View>
                      <View>
                        {lineups?.missing_players?.[1]?.map((player, index) => {
                          return (
                            <View
                              key={`visitor_missing_${player.jersey_num}_${player.name}_${index}`}
                              style={styles.player_container_info}
                            >
                              <View style={styles.table_lineup_container}>
                                <View style={styles.name_jersey_container}>
                                  <Text style={styles.formation_lineup_text}>
                                    {player?.formation_position?.split(
                                      " "
                                    )[0] || "N/A"}
                                  </Text>
                                  <View style={styles.player_container}>
                                    <Text style={styles.jersey_num_text}>
                                      {player?.jersey_num}
                                    </Text>
                                    <Text
                                      style={styles.player_lineup_name_text}
                                      ellipsizeMode="clip"
                                      numberOfLines={1}
                                    >
                                      {` ${player?.name}`}
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.ageheight_container}>
                                  <View>
                                    <Text style={styles.height_text}>
                                      {player?.height} m
                                    </Text>
                                    <Text style={styles.age_text}>
                                      {player?.age} años
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mitad_team_container: {
    height: "50%",
    width: "100%",
    backgroundColor: "#153615",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  lineup_container: {
    height: height * 1.2,
    width: "100%",
  },
  player: {
    position: "absolute",
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  playerContent: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    zIndex: 20,
  },
  playerName: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 4,
    paddingHorizontal: 2,
    zIndex: 20,
  },
  midline: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    backgroundColor: "#fffFFF",
    height: 100,
    opacity: 0.3,
  },

  /* LÍNEAS DEL CAMPO */
  midfieldLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#fff",
    opacity: 0.3,
    zIndex: 1,
  },
  centerCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.3,
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 2,
  },
  centerSpot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    opacity: 0.3,
    transform: [{ translateX: -4 }, { translateY: -4 }],
    zIndex: 2,
  },
  penaltyArea: {
    position: "absolute",
    width: "70%",
    height: 80,
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.3,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  penaltyAreaTop: {
    top: 0,
    left: "15%",
    borderBottomWidth: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  penaltyAreaBottom: {
    bottom: 0,
    left: "15%",
    borderTopWidth: 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  goalArea: {
    position: "absolute",
    width: "40%",
    height: 30,
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.3,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  goalAreaTop: {
    top: 0,
    left: "30%",
    borderBottomWidth: 2,
  },
  goalAreaBottom: {
    bottom: 0,
    left: "30%",
    borderTopWidth: 2,
  },

  penaltySpotTop: {
    top: 70,
    left: "50%",
    transform: [{ translateX: -3 }],
  },
  penaltySpotBottom: {
    bottom: 70,
    left: "50%",
    transform: [{ translateX: -3 }],
  },
  team_name_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  name_team_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  formation_text_container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  initial_lineup_text: {
    color: Colors.YELLOW_LIGHT,
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  formation_text: {
    fontSize: RFValue(16),
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  formation_container: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    minWidth: width * 0.9,
    maxWidth: width * 0.95,
  },
  fieldBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  player_container_info: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
    width: "100%",
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
    borderRadius: 6,
  },
  table_lineup_container: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 4,
    marginBottom: 10,
  },

  name_jersey_container: {
    marginTop: 14,
  },
  jersey_num_text: {
    color: Colors.RED_CHANGE_PLAYER,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  formation_lineup_text: {
    color: Colors.YELLOW_LIGHT,
  },
  player_lineup_name_text: {
    color: Colors.WHITE_GRAY,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  height_text: {
    color: Colors.WHITE_GRAY,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  age_text: {
    color: Colors.WHITE_GRAY,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  player_container: {
    width: width * 0.5,
    flexDirection: "row",
    paddingVertical: 10,
  },
  ageheight_container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  titulares_text: {
    marginVertical: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  select_lineup_container: {
    width: "100%",
    height: height * 0.15,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_team_lineup: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  formatioNotFound_text: {
    fontSize: 24,
    color: Colors.RED_CHANGE_PLAYER,
    textAlign: "center",
    fontWeight: "bold",
  },
  goals_container: {
    marginRight: 10,
    flexDirection: "row",
    gap: 10,
  },
  goals_number_text: {
    marginBottom: 5,
    color: Colors.WHITE_GRAY,
    fontSize: 14,
    fontWeight: "bold",
  },
  events_container: {
    alignItems: "center",
    flexDirection: "row",
  },
  event_separator: {
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  separator_text: {
    color: Colors.WHITE_GRAY,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MatchLineUp;
