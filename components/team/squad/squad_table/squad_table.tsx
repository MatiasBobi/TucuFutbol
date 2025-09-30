import { Colors } from "@/constants/colors/colors";
import { SquadGroup } from "@/types/team_info";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

const SquadTable = ({ squad }: { squad: SquadGroup }) => {
  return (
    <View>
      <View style={styles.squad_table_header}>
        <Text style={styles.squad_table_header_text}>{squad.name}</Text>
      </View>
      <View style={styles.squad_table_body}>
        <View>
          {squad.rows.map((player, index) => {
            return (
              <View
                key={`${player.entity.object.name}_${player.entity.object.birthdate}`}
                style={styles.player_container}
              >
                <View style={styles.player_row}>
                  <View style={styles.player_row_name}>
                    <View style={styles.name_container}>
                      <Text style={styles.num_player_text}>
                        {player?.entity?.object?.num}
                      </Text>
                      <Text style={styles.player_row_name_text}>
                        {player?.entity?.object?.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.player_row_info}>
                    <View style={styles.player_row_info_item}>
                      <Text style={styles.player_row_info_text}>
                        {player?.entity?.object?.age}
                      </Text>
                    </View>
                    <View style={styles.player_row_info_item}>
                      <Text style={styles.player_row_info_text}>
                        {player?.entity?.object?.height}
                      </Text>
                    </View>
                  </View>
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
  player_row: {
    flexDirection: "row",
    minHeight: height * 0.1,
    maxHeight: height * 0.2,
    alignItems: "center",
    backgroundColor: Colors.DARK_BLUE_PLAYOFFS,
  },
  name_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  num_player_text: {
    width: "20%",
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  player_row_name: {
    width: "60%",
    paddingRight: 8,
  },
  player_row_info: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  player_row_info_item: {
    flex: 1,
    height: height * 0.05,
    justifyContent: "center",
  },
  player_row_name_text: {
    fontSize: 16,
    width: "80%",
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  player_row_info_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  squad_table_header: {
    marginVertical: 8,
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  squad_table_body: {
    flex: 1,
  },
  squad_table_header_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
  player_container: {
    minHeight: 50,
    maxHeight: 100,
  },
});

export default SquadTable;
