import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import {
  BracketGroup,
  BracketParticipant,
  BracketStage,
} from "@/types/league_full_info";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window"); // Dimensiones del dispositivo.
const SLIDER_WIDTH = SCREEN_WIDTH - 100; // Ancho del slider

const LeagueBrackets = ({ brackets = [] }: { brackets: BracketStage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado actual para mostrar que stage mostrar.
  const translateX = useSharedValue(0);

  // Calcula el ancho de cada paso del slider
  const stepWidth =
    brackets.length > 1 ? SLIDER_WIDTH / (brackets.length - 1) : 0;

  // Mueve al bracket anterior
  const moveLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      translateX.value = withTiming(newIndex * stepWidth, { duration: 300 });
    }
  };

  // Mueve al bracket siguiente
  const moveRight = () => {
    if (currentIndex < brackets.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      translateX.value = withTiming(newIndex * stepWidth, { duration: 300 });
    }
  };

  // Funcion para obtener el stage anterior al cual se esta mostrando, el proposito de esto es para poder obtener que equipos que estaban en el stage anterior.
  // Con esto se consigue mostrar cual puede ser el proximo enfrentamiento en la stage que se esta mostrando actualmente
  // Por ejemplo:
  // (32 avos)
  // Juego 1 : San Lorenzo vs Deportivo Riestra
  // Juego 2 : River Plate vs Union
  // Avanzamos a 16vos
  // El juego numero 1 corresponde a los ganadores del juego 1 vs juego 2 de la etapa anterior
  // Si usamos esta funcion obtendriamos
  // (16 avos)
  // Juego 1: Ganador (San Lorenzo vs Deportivo riestra) vs (River Plate vs Union).
  const prevGames = () => {
    const previousStage = brackets[currentIndex - 1]; // Del currentindex retrocedemos una posicion en el arreglo para obtener lo anterior.
    if (!previousStage || !previousStage?.groups) return null;
    const allPreviousGames = previousStage?.groups.flatMap(
      (group) =>
        group?.participants?.map((participant) => participant?.name) || []
    ); // Usamos flatmap para dejar todo en un mismo array.
    const groupedParticipants = [];
    for (let i = 0; i < allPreviousGames?.length; i += 4) {
      const prevParticipants = allPreviousGames?.slice(i, i + 4);
      groupedParticipants?.push(prevParticipants);
    } // Se utiliza para poder agrupoar en un arreglo de arreglos, donde los arreglos de adentro tienen 4 elementos.
    // Ejemplo: [[San lorenzo, Deportivo Riestra, River Plate, Union], [Atlético Tucumán, Boca Juniors, Argentinos Juniors, Instituto.] ... etc]
    return groupedParticipants;
  };

  // Render del texto que se utilizara o bien para poder mostrar el nombre del equipo o el ganador de la etapa anterior.
  const renderTeamName = ({
    teams,
    teamIndex,
    TeamPrevA,
    TeamPrevB,
  }: {
    teams: BracketParticipant[];
    teamIndex: 0 | 1;
    TeamPrevA: string | undefined;
    TeamPrevB: string | undefined;
  }) => {
    return teams?.[teamIndex]?.id === -1
      ? `Ganador ${TeamPrevA === undefined ? "Sin equipo" : TeamPrevA} vs ${
          TeamPrevB === undefined ? "Sin equipo" : TeamPrevB
        }`
      : teams?.[teamIndex]?.name;
  };

  // Render individuales de cada juego.
  const renderBracketGame = ({
    game,
    index,
    allPreviousGames,
    isFinal_length,
  }: {
    game: BracketGroup;
    index: number;
    allPreviousGames: string[][] | null;
    isFinal_length: number; // Obtenemos para saber si nos encontramos en la ultima parte del bracket.
  }) => {
    let isGlobal = ""; // Variable para determinar el texto si es global o no.
    if (game?.games?.length === 2) {
      isGlobal = "Global"; // Si hay 2 juegos, queire decir que hay ida y vuelta, entonces se muestra el global.
    }
    let date = "";
    let time = "";
    let noDate = 0;
    if (game?.games?.[0].status?.enum === 3) {
      [date, time] = game?.games?.[1]?.start_time?.split(" ") || []; // Si el primer partido ya esta finalizado, entonces muestra la fecha del segundo partido.
    }
    if (!game?.games?.[0]) {
      noDate = 1;
    }
    [date, time] = game?.games?.[0]?.start_time?.split(" ") || []; // Obtener fecha de juego y hora de comienzo (primer partido).
    const [day, month, year] = date?.split("-") || []; // Separar la fecha en tres partes.
    const formattedDate = day && month ? `${day}/${month}` : null; // Formato a mostrar.

    // Titulo de cada juego a mostrar
    let gameTitle = `Juego ${index + 1}`; // Titulo normalmente

    if (isFinal_length === 1) gameTitle = "Final"; // Si el bracket stage actual solo tiene un elemento del arreglo, quiere decir que es Final
    // Esto es asi ya que la API al devolver informacion sobre una final que no cuenta con equipos
    // Utiliza el third_place pero muestra el mensaje de final igual.

    if (isFinal_length === 2 && game.is_third_place)
      // Aca chequeamos si tiene 2 elementos, entonces quiere decir que tiene Final y Tercer Puesto.
      // Ahora si cada partido tiene bien su is_third_place y is_final, entonces solo chequeamos para ponerle el nombre correspondiente.
      gameTitle = "Tercer Puesto";
    if (isFinal_length === 2 && game?.is_final) gameTitle = "Final";

    return (
      <View style={styles.container_brackets_game}>
        <Text style={styles.game_title}>{gameTitle}</Text>
        <View style={styles.game_info_container}>
          <View style={styles.game_info_name_team_container}>
            <View style={styles.game_info_team_items}>
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${game?.participants?.[0]?.id?.toString()}/4`,
                }}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.game_teams_text,
                  {
                    color:
                      game.winner === 1
                        ? Colors.YELLOW_LIGHT
                        : Colors.WHITE_GRAY,
                  },
                ]}
              >
                {renderTeamName({
                  teams: game?.participants,
                  teamIndex: 0,
                  TeamPrevA: allPreviousGames?.[index]?.[0],
                  TeamPrevB: allPreviousGames?.[index]?.[1],
                })}
              </Text>
            </View>
            <View style={styles.game_info_team_items}>
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${game?.participants?.[1]?.id?.toString()}/4`,
                }}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.game_teams_text,
                  {
                    color:
                      game.winner === 2
                        ? Colors.YELLOW_LIGHT
                        : Colors.WHITE_GRAY,
                  },
                ]}
              >
                {renderTeamName({
                  teams: game?.participants,
                  teamIndex: 1,
                  TeamPrevA: allPreviousGames?.[index]?.[2],
                  TeamPrevB: allPreviousGames?.[index]?.[3],
                })}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.game_scores_container,
              game.score
                ? isGlobal === ""
                  ? { flex: 0.1 }
                  : { flex: 0.4 }
                : { flex: 0.2 },
            ]}
          >
            {game.score ? (
              <View
                style={
                  isGlobal === ""
                    ? styles.notglobal_container
                    : styles.global_container
                }
              >
                {isGlobal === "" ? null : (
                  <View style={styles.isGlobal_container}>
                    <Text style={styles.isGlobal_text}>{isGlobal}</Text>
                  </View>
                )}
                <View style={styles.game_scores}>
                  <Text
                    style={[
                      styles.game_scores_text,
                      {
                        color:
                          game.winner === 1
                            ? Colors.YELLOW_LIGHT
                            : Colors.WHITE_GRAY,
                      },
                    ]}
                  >
                    {game?.score?.[0]}
                  </Text>
                  <Text
                    style={[
                      styles.game_scores_text,
                      {
                        color:
                          game.winner === 2
                            ? Colors.YELLOW_LIGHT
                            : Colors.WHITE_GRAY,
                      },
                    ]}
                  >
                    {game?.score?.[1]}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.formatedText_container}>
                <Text style={styles.game_scores_text}>
                  {noDate === 0 ? `${formattedDate} ${time}` : `Sin fecha`}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const keyStractorLeagueTable = useCallback(
    (item: any, index: number) =>
      `game-${index}-${item?.games?.[0]?.start_time ?? ""}-${
        item?.games?.[0]?.start_time ?? ""
      }`,
    []
  );

  // Renderiza el stage actual
  const renderCurrentBracket = () => {
    const currentBracket = brackets[currentIndex];
    const allPreviousGames = prevGames(); // Obtenemos el stage anterior
    if (!currentBracket) return null;

    const isFinal_lenght = currentBracket?.groups?.length; // Aca obtenemos el tamaño del currentBracket para saber si es la final o no.
    const allGames = (currentBracket?.groups || []).flatMap(
      (group) => group || []
    );

    return (
      <View style={styles.container_brackets_index}>
        <FlatList
          data={allGames}
          renderItem={({ item, index }) =>
            renderBracketGame({
              game: item,
              index,
              allPreviousGames,
              isFinal_length: isFinal_lenght,
            })
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={keyStractorLeagueTable}
          style={styles.container_brackets_game_fix}
        />
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container_brackets}>
        {/* Contenedor principal del slider */}
        <View style={styles.brackets_move_arrows_container}>
          {/* Flecha izquierda */}
          <Pressable onPress={moveLeft} style={styles.arrowButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View>
            <Text style={styles.title_bracket_text}>
              {brackets[currentIndex]?.name}
            </Text>
          </View>
          {/* Flecha derecha */}
          <Pressable onPress={moveRight} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          </Pressable>
        </View>

        {/* Brackets */}
        <View>{renderCurrentBracket()}</View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container_brackets: {
    width: "100%",
    padding: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  brackets_move_arrows_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: Colors.BLUE_BORDER,
  },
  arrowButton: {
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: Colors.WHITE_GRAY,
  },
  title_bracket_text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
  global_container: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  isGlobal_container: {
    justifyContent: "center",
  },
  isGlobal_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
  },
  formatedText_container: {
    flex: 1,
    justifyContent: "center",
  },
  container_brackets_index: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.6,
    borderRadius: 10,
    padding: 10,

    backgroundColor: Colors.BLUE_BORDER,
  },
  container_brackets_game: {
    alignItems: "center",
    paddingVertical: 20,
  },
  game_title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.WHITE_GRAY,
  },
  game_info_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 100,
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
    marginBottom: 40,
  },
  game_scores: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  notglobal_container: {
    flex: 1,
  },
  game_info_name_team_container: {
    justifyContent: "space-around",
    flex: 0.9,
  },
  game_scores_container: {
    height: "100%",
  },
  game_teams_text: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  game_scores_text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
  },
  game_info_team_items: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
    textAlign: "center",
  },
  container_brackets_game_fix: {
    paddingBottom: 30,
  },
});
export default LeagueBrackets;
