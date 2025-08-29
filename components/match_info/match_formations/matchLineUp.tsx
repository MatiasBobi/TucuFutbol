import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Colors } from '@/constants/colors/colors';
import { MissingPlayer, Team, TeamLineup } from '@/types/game_info';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

type LineupsTeam = {
  lineups: {
    support_visual_lineups: boolean;
    teams: TeamLineup[];
  };
  missing_players?: MissingPlayer[][];
};

const { width, height } = Dimensions.get('window');
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
  const [teamLineUp, setTeamLineUp] = useState<'local' | 'visitante'>('local');

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
        Math.min(y, FIELD_WIDTH - PLAYER_SIZE - FIELD_MARGIN),
      ),
      top: Math.max(
        FIELD_MARGIN,
        Math.min(x, FIELD_HEIGHT - PLAYER_SIZE - FIELD_MARGIN),
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
                      {team1?.name || 'Equipo Local'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.formation_text}>
                    {lineups?.lineups?.teams?.[0]?.formation || 'x-x-x'}
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
                    invertedY,
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
                          color={team1?.colors?.color || 'red'}
                        />
                        {player.events?.substitution.has_substitution}
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
                    player?.pitch_location?.y ?? 0,
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
                          color={team2?.colors?.color || 'blue'}
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
                      {team2?.name || 'Equipo Visitante'}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.formation_text}>
                    {lineups?.lineups?.teams?.[1]?.formation || 'x-x-x'}
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
              teamLineUp === 'local'
                ? {
                    backgroundColor: Colors.SLAT_BLUE,
                    borderWidth: 2,
                    borderColor: Colors.YELLOW_LIGHT,
                  }
                : { backgroundColor: Colors.LIGHT_BLUE_DARK },
            ]}
            onPress={() => setTeamLineUp('local')}
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
              teamLineUp === 'visitante'
                ? {
                    backgroundColor: Colors.SLAT_BLUE,
                    borderWidth: 2,
                    borderColor: Colors.YELLOW_LIGHT,
                  }
                : { backgroundColor: Colors.LIGHT_BLUE_DARK },
            ]}
            onPress={() => setTeamLineUp('visitante')}
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
            {teamLineUp === 'local' ? (
              <View>
                {lineups.lineups === undefined ? null : (
                  <>
                    {/* Titulares */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Titulares</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[0]?.starting?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                    {/* Suplentes */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Suplentes</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[0]?.bench?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
                              </View>
                            </View>
                          );
                        })}
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
                        {lineups?.missing_players?.[0]?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
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
                        {lineups.lineups.teams?.[1]?.starting?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                    {/* Suplentes */}
                    <View>
                      <View>
                        <Text style={styles.titulares_text}>Suplentes</Text>
                      </View>
                      <View>
                        {lineups.lineups.teams?.[1]?.bench?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
                              </View>
                            </View>
                          );
                        })}
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
                        {lineups?.missing_players?.[1]?.map((player) => {
                          return (
                            <View
                              key={`${player.jersey_num}_${player.name}`}
                              style={styles.table_lineup_container}
                            >
                              <View style={styles.name_jersey_container}>
                                <Text style={styles.formation_lineup_text}>
                                  {player?.formation_position.split(' ')[0]}
                                </Text>
                                <View style={styles.player_container}>
                                  <Text style={styles.jersey_num_text}>
                                    {player?.jersey_num}
                                  </Text>
                                  <Text style={styles.player_lineup_name_text}>
                                    {' '}
                                    {player?.name}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.ageheight_container}>
                                <Text style={styles.height_text}>
                                  {player?.height} m
                                </Text>
                                <Text style={styles.age_text}>
                                  {player?.age} años
                                </Text>
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
    height: '50%',
    width: '100%',
    backgroundColor: '#153615',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  lineup_container: {
    height: height * 1.2,
    width: '100%',
  },
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    zIndex: 20,
  },
  playerName: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 2,
    zIndex: 20,
  },
  midline: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    backgroundColor: '#fffFFF',
    height: 100,
    opacity: 0.3,
  },

  /* LÍNEAS DEL CAMPO */
  midfieldLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#fff',
    opacity: 0.3,
    zIndex: 1,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    opacity: 0.3,
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 2,
  },
  centerSpot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    opacity: 0.3,
    transform: [{ translateX: -4 }, { translateY: -4 }],
    zIndex: 2,
  },
  penaltyArea: {
    position: 'absolute',
    width: '70%',
    height: 80,
    borderWidth: 2,
    borderColor: '#fff',
    opacity: 0.3,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  penaltyAreaTop: {
    top: 0,
    left: '15%',
    borderBottomWidth: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  penaltyAreaBottom: {
    bottom: 0,
    left: '15%',
    borderTopWidth: 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  goalArea: {
    position: 'absolute',
    width: '40%',
    height: 30,
    borderWidth: 2,
    borderColor: '#fff',
    opacity: 0.3,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  goalAreaTop: {
    top: 0,
    left: '30%',
    borderBottomWidth: 2,
  },
  goalAreaBottom: {
    bottom: 0,
    left: '30%',
    borderTopWidth: 2,
  },

  penaltySpotTop: {
    top: 70,
    left: '50%',
    transform: [{ translateX: -3 }],
  },
  penaltySpotBottom: {
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -3 }],
  },
  team_name_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
  name_team_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  formation_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
  formation_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  fieldBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  table_lineup_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LIGHT_BLUE_DARK,
    marginBottom: 10,
  },
  name_jersey_container: {
    marginTop: 14,
  },
  jersey_num_text: {
    color: Colors.GREEN_TEAM_STATS_TWO,
    fontSize: 16,
  },
  formation_lineup_text: {
    color: Colors.YELLOW_LIGHT,
  },
  player_lineup_name_text: {
    color: Colors.WHITE_GRAY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  height_text: {
    color: Colors.WHITE_GRAY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  age_text: {
    color: Colors.WHITE_GRAY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  player_container: {
    flexDirection: 'row',
  },
  ageheight_container: {
    justifyContent: 'center',
  },
  titulares_text: {
    marginVertical: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
  },
  select_lineup_container: {
    width: '100%',
    height: height * 0.15,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MatchLineUp;
