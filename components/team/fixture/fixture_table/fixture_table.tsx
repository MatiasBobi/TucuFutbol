import { Colors } from "@/constants/colors/colors";
import { GameTable } from "@/types/team_info";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const FixtureTable = ({
  fixture_data,
  table_type,
}: {
  fixture_data: GameTable;
  table_type: "next" | "last";
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.header_teams}>
          <Text style={styles.header_text}>Equipo</Text>
        </View>
        <View style={styles.header_info}>
          <Text style={styles.header_text}>Día</Text>
          <Text style={styles.header_text}>L/V</Text>
          <Text style={styles.header_text}>
            {table_type === "next" ? "Hora" : "Result."}
          </Text>
        </View>
      </View>

      {/* Filas */}
      {(table_type === "last"
        ? fixture_data?.rows?.slice().reverse()
        : fixture_data?.rows
      )?.map((team, index) => {
        const matchId = team?.game?.id;
        const resultColor =
          table_type === "last"
            ? team?.result_status === 1
              ? Colors.GREEN_WIN
              : team?.result_status === 2
                ? Colors.RED_CHANGE_PLAYER
                : team?.result_status === 3
                  ? Colors.YELLOW_GOAL
                  : Colors.GRAY_LIGHT
            : Colors.GRAY_LIGHT;

        return (
          <Pressable
            key={`${team.entity.object.id}_${index}`}
            style={[
              styles.team_container,
              {
                backgroundColor:
                  index % 2 === 0
                    ? Colors.LIGHT_BLUE_DARK
                    : Colors.DARK_BLUE_PLAYOFFS,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/match_info/[match]",
                params: { match: matchId },
              })
            }
          >
            {table_type === "last" && (
              <View
                style={[styles.result_bar, { backgroundColor: resultColor }]}
              />
            )}

            {/* Equipo */}
            <View style={styles.team_name_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${team?.entity?.object?.id}/4`}
                style={styles.teamImage}
                contentFit="contain"
              />
              <Text
                style={styles.team_name_text}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {team?.entity?.object?.short_name}
              </Text>
            </View>

            <View style={styles.team_values_container}>
              <Text style={styles.value_text}>{team?.values?.[0].value}</Text>
              <Text style={styles.value_text}>{team?.values?.[1].value}</Text>
              <Text style={[styles.value_text, { color: resultColor }]}>
                {team?.values?.[2].value}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.BLUE_BORDER,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  header: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    backgroundColor: Colors.LIGHT_BLACK,
    borderBottomWidth: 2,
    borderBottomColor: Colors.YELLOW_LIGHT,
    paddingHorizontal: 12,
  },
  header_teams: {
    flex: 1,
  },
  header_info: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header_text: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
  team_container: {
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.DARK_BLUE,
  },
  result_bar: {
    width: 4,
    height: "100%",
  },
  team_name_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    gap: 8,
    paddingRight: 4,
  },
  team_values_container: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingRight: 8,
  },
  teamImage: {
    width: 28,
    height: 28,
  },
  team_name_text: {
    fontSize: RFValue(13),
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    flex: 1,
  },
  value_text: {
    fontSize: RFValue(13),
    color: Colors.GRAY_LIGHT,
    textAlign: "center",
    minWidth: width * 0.1,
  },
});

export default FixtureTable;
