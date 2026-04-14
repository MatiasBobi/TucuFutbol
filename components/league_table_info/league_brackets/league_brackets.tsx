import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import {
  BracketGroup,
  BracketParticipant,
  BracketStage,
} from "@/types/league_full_info";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_WIDTH = SCREEN_WIDTH - 100;

const LeagueBrackets = ({ brackets = [] }: { brackets: BracketStage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const stepWidth =
    brackets.length > 1 ? SLIDER_WIDTH / (brackets.length - 1) : 0;

  const moveLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      translateX.value = withTiming(newIndex * stepWidth, { duration: 300 });
    }
  };

  const moveRight = () => {
    if (currentIndex < brackets.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      translateX.value = withTiming(newIndex * stepWidth, { duration: 300 });
    }
  };

  const prevGames = () => {
    const previousStage = brackets[currentIndex - 1];
    if (!previousStage || !previousStage?.groups) return null;
    const allPreviousGames = previousStage?.groups.flatMap(
      (group) =>
        group?.participants?.map((participant) => participant?.name) || [],
    );
    const groupedParticipants = [];
    for (let i = 0; i < allPreviousGames?.length; i += 4) {
      const prevParticipants = allPreviousGames?.slice(i, i + 4);
      groupedParticipants?.push(prevParticipants);
    }
    return groupedParticipants;
  };

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
    if (teams?.[teamIndex]?.id === -1) {
      if (TeamPrevA === undefined && TeamPrevB === undefined) {
        return "A confirmar";
      }
      return `Gan. ${TeamPrevA ?? "?"} vs ${TeamPrevB ?? "?"}`;
    }
    return teams?.[teamIndex]?.name;
  };

  const renderBracketGame = ({
    game,
    index,
    allPreviousGames,
    isFinal_length,
  }: {
    game: BracketGroup;
    index: number;
    allPreviousGames: string[][] | null;
    isFinal_length: number;
  }) => {
    let isGlobal = "";
    if (game?.games?.length === 2) {
      isGlobal = "Global";
    }

    let date = "";
    let time = "";
    let noDate = 0;
    if (game?.games?.[0]?.status?.enum === 3) {
      [date, time] = game?.games?.[1]?.start_time?.split(" ") || [];
    }
    if (!game?.games?.[0]) {
      noDate = 1;
    }
    [date, time] = game?.games?.[0]?.start_time?.split(" ") || [];
    const [day, month] = date?.split("-") || [];
    const formattedDate = day && month ? `${day}/${month}` : null;

    let gameTitle = `Juego ${index + 1}`;
    if (isFinal_length === 1) gameTitle = "Final";
    if (isFinal_length === 2 && game.is_third_place)
      gameTitle = "Tercer Puesto";
    if (isFinal_length === 2 && game?.is_final) gameTitle = "Final";

    let idLinkmatch = "";
    if (game?.games?.length && game.games.length > 0) {
      idLinkmatch = game?.games?.[game.games.length - 1]?.id;
    }

    const team1Name = renderTeamName({
      teams: game?.participants,
      teamIndex: 0,
      TeamPrevA: allPreviousGames?.[index]?.[0],
      TeamPrevB: allPreviousGames?.[index]?.[1],
    });

    const team2Name = renderTeamName({
      teams: game?.participants,
      teamIndex: 1,
      TeamPrevA: allPreviousGames?.[index]?.[2],
      TeamPrevB: allPreviousGames?.[index]?.[3],
    });

    const gameContent = (
      <View style={styles.container_brackets_game}>
        <View style={styles.game_header}>
          <Text style={styles.game_title}>{gameTitle}</Text>
          {!game.score && (
            <View style={styles.date_badge}>
              <MaterialIcons
                name="calendar-today"
                size={12}
                color={Colors.YELLOW_LIGHT}
              />
              <Text style={styles.date_badge_text}>
                {noDate === 0 ? `${formattedDate} ${time}` : "Sin fecha"}
              </Text>
            </View>
          )}

          {isGlobal !== "" && (
            <View style={styles.global_badge}>
              <Text style={styles.global_badge_text}>Ida y vuelta</Text>
            </View>
          )}
        </View>

        <View style={styles.game_info_container}>
          {/* Equipo 1 */}
          <View style={styles.game_info_team_row}>
            <View style={styles.team_left}>
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${game?.participants?.[0]?.id?.toString()}/4`,
                }}
                style={{ width: 28, height: 28 }}
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
                numberOfLines={2}
              >
                {team1Name}
              </Text>

              {game.winner === 1 && (
                <MaterialIcons
                  name="emoji-events"
                  size={16}
                  color={Colors.YELLOW_LIGHT}
                />
              )}
            </View>
            <Text
              style={[
                styles.score_text,
                {
                  color:
                    game.winner === 1 ? Colors.YELLOW_LIGHT : Colors.WHITE_GRAY,
                },
              ]}
            >
              {game?.score?.[0] ?? "-"}
            </Text>
          </View>

          {/* Separador */}
          <View style={styles.teams_separator} />

          {/* Equipo 2 */}
          <View style={styles.game_info_team_row}>
            <View style={styles.team_left}>
              <Image
                source={{
                  uri: `https://api.promiedos.com.ar/images/team/${game?.participants?.[1]?.id?.toString()}/4`,
                }}
                style={{ width: 28, height: 28 }}
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
                numberOfLines={2}
              >
                {team2Name}
              </Text>

              {game.winner === 2 && (
                <MaterialIcons
                  name="emoji-events"
                  size={16}
                  color={Colors.YELLOW_LIGHT}
                />
              )}
            </View>
            <Text
              style={[
                styles.score_text,
                {
                  color:
                    game.winner === 2 ? Colors.YELLOW_LIGHT : Colors.WHITE_GRAY,
                },
              ]}
            >
              {game?.score?.[1] ?? "-"}
            </Text>
          </View>
        </View>
      </View>
    );

    if (idLinkmatch) {
      return (
        <Link
          href={{
            pathname: "/match_info/[match]",
            params: { match: idLinkmatch },
          }}
        >
          {gameContent}
        </Link>
      );
    }
    return gameContent;
  };

  const renderCurrentBracket = () => {
    const currentBracket = brackets[currentIndex];
    const allPreviousGames = prevGames();
    if (!currentBracket) return null;

    const isFinal_lenght = currentBracket?.groups?.length;
    const allGames = (currentBracket?.groups || []).flatMap(
      (group) => group || [],
    );

    return (
      <View style={styles.container_brackets_index}>
        {allGames.map((item, index) => (
          <View key={`game-${index}-${item?.games?.[0]?.start_time ?? ""}`}>
            {renderBracketGame({
              game: item,
              index,
              allPreviousGames,
              isFinal_length: isFinal_lenght,
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container_brackets}>
        <View style={styles.brackets_move_arrows_container}>
          <Pressable
            onPress={moveLeft}
            style={[
              styles.arrowButton,
              currentIndex === 0 && styles.arrowButton_disabled,
            ]}
            disabled={currentIndex === 0}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={
                currentIndex === 0 ? Colors.GRAY_LIGHT : Colors.YELLOW_LIGHT
              }
            />
          </Pressable>

          <View style={styles.title_container}>
            <Text style={styles.title_bracket_text}>
              {brackets[currentIndex]?.name}
            </Text>

            <View style={styles.dots_container}>
              {brackets.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === currentIndex && styles.dot_active]}
                />
              ))}
            </View>
            <Text style={styles.phase_counter_text}>
              {currentIndex + 1} / {brackets.length}
            </Text>
          </View>

          <Pressable
            onPress={moveRight}
            style={[
              styles.arrowButton,
              currentIndex === brackets.length - 1 &&
                styles.arrowButton_disabled,
            ]}
            disabled={currentIndex === brackets.length - 1}
          >
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={
                currentIndex === brackets.length - 1
                  ? Colors.GRAY_LIGHT
                  : Colors.YELLOW_LIGHT
              }
            />
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
    borderRadius: 12,
    marginBottom: 12,
    padding: 8,
    backgroundColor: Colors.BLUE_BORDER,
  },
  arrowButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  arrowButton_disabled: {
    borderColor: Colors.GRAY_LIGHT,
    opacity: 0.4,
  },
  title_container: {
    alignItems: "center",
    gap: 6,
  },
  title_bracket_text: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
  phase_counter_text: {
    fontSize: RFValue(12),
    color: Colors.GRAY_LIGHT,
  },

  dots_container: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  dot_active: {
    backgroundColor: Colors.YELLOW_LIGHT,
    width: 14,
  },

  container_brackets_index: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.BLUE_BORDER,
    gap: 12,
  },
  container_brackets_game: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },

  game_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    backgroundColor: Colors.DARK_BLUE,
  },
  game_title: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
  },
  date_badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  date_badge_text: {
    fontSize: RFValue(11),
    color: Colors.YELLOW_LIGHT,
  },
  global_badge: {
    backgroundColor: Colors.SLAT_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
  },
  global_badge_text: {
    fontSize: RFValue(11),
    color: Colors.YELLOW_LIGHT,
    fontWeight: "bold",
  },

  game_info_container: {
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
    borderLeftWidth: 4,
    borderLeftColor: Colors.YELLOW_LIGHT,
  },
  game_info_team_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  team_left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  teams_separator: {
    height: 1,
    backgroundColor: Colors.BLUE_BORDER,
    marginHorizontal: 12,
  },
  game_teams_text: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
  },
  score_text: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },

  // no usados pero los dejo por si acaso
  global_container: { flexDirection: "row", justifyContent: "center", flex: 1 },
  isGlobal_container: { justifyContent: "center" },
  isGlobal_text: {
    fontSize: RFValue(16),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  formatedText_container: { flex: 1, justifyContent: "center" },
  game_scores: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  notglobal_container: { flex: 1 },
  game_info_name_team_container: { justifyContent: "space-around", flex: 0.9 },
  game_scores_container: { height: "100%" },
  game_scores_text: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
  },
  game_info_team_items: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingVertical: 8,
  },
  container_brackets_game_fix: { paddingBottom: 30 },
});

export default LeagueBrackets;
