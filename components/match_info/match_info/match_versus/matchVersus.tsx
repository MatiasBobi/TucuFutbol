import { Colors } from "@/constants/colors/colors";
import { head_to_head } from "@/types/game_info";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type teamInfo = {
  name: string;
  id: string | undefined;
};

const { width, height } = Dimensions.get("window");
const MatchVersus = ({
  headtohead,
  team1Info,
  team2Info,
}: {
  headtohead: head_to_head;
  team1Info: teamInfo;
  team2Info: teamInfo;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.historial_text}>Ultimos enfrentamientos</Text>
      </View>
      <View>
        <View style={styles.teams_historial_container}>
          <View style={styles.team_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1Info.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <View style={styles.name_team_container}>
              <Text style={styles.team_name_text}>{team1Info.name}</Text>
            </View>

            <View style={styles.versus_container}>
              <Text style={styles.wins_text_number}>
                {headtohead.home_wins}{" "}
              </Text>

              <Text style={styles.wins_text}>Victorias</Text>
            </View>
          </View>
          <View style={styles.draw_container}>
            <View style={styles.draw_versus_container}>
              <Text style={styles.draw_text_number}>{headtohead.draws} </Text>
              <Text style={styles.wins_text}>Empates</Text>
            </View>
          </View>
          <View style={styles.team_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2Info.id}/2`,
              }}
              style={{ width: 40, height: 40 }}
              contentFit="contain"
            />
            <View style={styles.name_team_container}>
              <Text style={styles.team_name_text}>{team2Info.name}</Text>
            </View>

            <View style={styles.versus_container}>
              <Text style={styles.wins_text_number}>
                {headtohead.away_wins}{" "}
              </Text>
              <Text style={styles.wins_text}>Victorias</Text>
            </View>
          </View>
        </View>
        <View style={styles.historial_container_matches}>
          {headtohead?.games?.map((match, index) => {
            return (
              <View key={match?.id} style={styles.match_container}>
                <View style={styles.team_container_matchs}>
                  <Text style={styles.team_name}>
                    {match?.teams?.[0]?.short_name}
                  </Text>
                </View>
                <View style={styles.match_info_container}>
                  <Text style={styles.text_info_text}>
                    {match?.league?.name}
                  </Text>
                  <Text style={styles.text_info_text}>
                    {match?.scores?.[0]} - {match?.scores?.[1]}
                  </Text>
                  <Text style={styles.text_info_text}>
                    {match?.start_time?.split(" ")?.[0]}
                  </Text>
                </View>
                <View style={styles.team_container_matchs}>
                  <Text style={styles.team_name}>
                    {match?.teams?.[1]?.short_name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width * 0.95,
    maxWidth: width * 0.99,
    alignItems: "center",
    justifyContent: "center",
  },
  teams_historial_container: {
    flexDirection: "row",

    minHeight: height * 0.15,
    maxHeight: height * 0.3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  team_container: {
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  draw_container: {
    width: "20%",
  },
  versus_container: {
    flexDirection: "row",
  },
  name_team_container: {
    width: "70%",
  },
  draw_versus_container: {
    flexDirection: "column",
    alignItems: "center",
    minWidth: "100%",
  },
  team_name_text: {
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
  wins_text_number: {
    color: Colors.GREEN_WIN,
  },
  wins_text: {
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  draw_text_number: {
    color: Colors.YELLOW_LIGHT,
  },
  historial_text: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    fontWeight: "bold",
  },
  historial_container_matches: {
    width: width * 0.95,
  },
  match_container: {
    flexDirection: "row",
    minHeight: height * 0.1,
    maxHeight: height * 0.3,
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    marginBottom: 10,
  },
  team_container_matchs: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  match_info_container: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  team_name: {
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  text_info_text: {
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
});

export default MatchVersus;
