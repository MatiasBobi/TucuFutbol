import { Colors } from "@/constants/colors/colors";
import { Standings } from "@/types/game_info";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");
const MatchStandings = ({
  standings,
}: {
  standings: Standings | undefined;
}) => {
  return (
    <View style={styles.standing_container}>
      <View>
        <Text style={styles.standing_title_text}>Posiciones</Text>
      </View>
      <View>
        <View style={styles.teams_stats_container}>
          <View style={styles.team_name_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${standings?.rows?.[0]?.entity?.object?.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <Text style={styles.team_name_text}>
              {standings?.rows?.[0]?.entity?.object?.short_name}
            </Text>
          </View>
          <View style={styles.stats_container}>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>Pos</Text>
              <Text style={styles.stat_value}>{standings?.rows?.[0]?.num}</Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>PTS</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[0].values?.[0]?.value}
              </Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>J</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[0].values?.[1]?.value}
              </Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>+/-</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[0].values?.[2]?.value}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.team_container}>
          <View style={styles.team_name_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${standings?.rows?.[1]?.entity?.object?.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <Text style={styles.team_name_text}>
              {standings?.rows?.[1]?.entity?.object?.short_name}
            </Text>
          </View>
          <View style={styles.stats_container}>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>Pos</Text>
              <Text style={styles.stat_value}>{standings?.rows?.[1]?.num}</Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>PTS</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[1].values?.[0]?.value}
              </Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>J</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[1].values?.[1]?.value}
              </Text>
            </View>
            <View style={styles.stat_container}>
              <Text style={styles.stat_header}>+/-</Text>
              <Text style={styles.stat_value}>
                {standings?.rows?.[1].values?.[2]?.value}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  standing_container: {
    width: width * 0.9,
    maxWidth: width * 0.95,
    marginTop: 8,
  },
  standing_title_text: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  teams_stats_container: {
    flexDirection: "row",
  },
  team_container: {
    flexDirection: "row",
  },
  team_name_container: {
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
    minHeight: height * 0.1,
    maxHeight: height * 0.2,
  },
  stats_container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1.5,
  },
  team_name_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
  stat_container: {
    justifyContent: "space-evenly",

    flex: 1,
    alignItems: "center",
  },
  stat_header: {
    fontSize: 20,
    color: Colors.WHITE_GRAY,
  },
  stat_value: {
    fontSize: 16,
    color: Colors.YELLOW_LIGHT,
  },
});

export default MatchStandings;
