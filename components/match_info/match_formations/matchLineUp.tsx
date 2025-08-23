import { Colors } from '@/constants/colors/colors';
import { MissingPlayer, Team, TeamLineup } from '@/types/game_info';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

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
    <View>
      <View>
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
                <Text style={styles.team_name_text}>{team1.name}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.formation_text}>
                {lineups.lineups.teams?.[0].formation}
              </Text>
            </View>
          </View>
        </View>

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
            {lineups.lineups.teams?.[0].starting.map((player, index) => {
              const invertedY = 100 - player?.pitch_location?.y;
              const position = calculatePlayerPosition(
                player?.pitch_location?.x,
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
            {lineups.lineups.teams?.[1].starting.map((player, index) => {
              const invertedX = 100 - player.pitch_location.x;
              const position = calculatePlayerPosition(
                invertedX,
                player.pitch_location.y,
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
                <Text style={styles.team_name_text}>{team2.name}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.formation_text}>
                {lineups.lineups.teams?.[1].formation}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <View></View>
      </View>
    </View>
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
});

export default MatchLineUp;
