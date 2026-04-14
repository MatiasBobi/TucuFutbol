import { Colors } from "@/constants/colors/colors";
import { SquadGroup } from "@/types/team_info";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const SquadTable = ({ squad }: { squad: SquadGroup }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section_header}>
        <Text style={styles.section_header_text}>{squad.name}</Text>
      </View>

      {squad.rows.map((player, index) => (
        <View
          key={`${player.entity.object.name}_${player.entity.object.birthdate}`}
          style={[
            styles.player_row,
            {
              backgroundColor:
                index % 2 === 0
                  ? Colors.LIGHT_BLUE_DARK
                  : Colors.DARK_BLUE_PLAYOFFS,
            },
          ]}
        >
          {/* Número */}
          <View style={styles.num_container}>
            <Text style={styles.num_text}>
              {player?.entity?.object?.num ?? "-"}
            </Text>
          </View>

          {/* Nombre */}
          <View style={styles.name_container}>
            <Text
              style={styles.name_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {player?.entity?.object?.name}
            </Text>
          </View>

          {/* Edad */}
          <View style={styles.stat_container}>
            <Text style={styles.stat_text}>
              {player?.entity?.object?.age ?? "-"}
            </Text>
          </View>

          {/* Altura */}
          <View style={styles.stat_container}>
            <Text style={styles.stat_text}>
              {player?.entity?.object?.height ?? "-"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: "100%",
  },

  section_header: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.DARK_BLUE,
    borderLeftWidth: 4,
    borderLeftColor: Colors.YELLOW_LIGHT,
    marginVertical: 4,
  },
  section_header_text: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    letterSpacing: 1,
  },

  player_row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.DARK_BLUE,
  },
  num_container: {
    width: width * 0.1,
    alignItems: "center",
  },
  num_text: {
    fontSize: RFValue(13),
    color: Colors.GRAY_LIGHT,
    fontWeight: "bold",
  },
  name_container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 4,
  },
  name_text: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
  },
  stat_container: {
    width: width * 0.15,
    alignItems: "center",
  },
  stat_text: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
});

export default SquadTable;
