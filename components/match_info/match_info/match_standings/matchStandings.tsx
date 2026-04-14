import { Colors } from "@/constants/colors/colors";
import { StandingRow, Standings } from "@/types/game_info";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const STATS = [
  { key: "Pos", getValue: (row: StandingRow) => row?.num },
  { key: "PTS", getValue: (row: StandingRow) => row?.values?.[0]?.value },
  { key: "J", getValue: (row: StandingRow) => row?.values?.[1]?.value },
  { key: "+/-", getValue: (row: StandingRow) => row?.values?.[2]?.value },
];

const MatchStandings = ({
  standings,
}: {
  standings: Standings | undefined;
}) => {
  const rows = standings?.rows?.slice(0, 2) ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posiciones</Text>

      {/* Header de columnas */}
      <View style={styles.row}>
        <View style={styles.team_col} />
        {STATS.map((stat) => (
          <Text key={stat.key} style={styles.col_header}>
            {stat.key}
          </Text>
        ))}
      </View>

      {/* Fila por equipo */}
      {rows.map((row, index) => (
        <View
          key={row?.entity?.object?.id ?? index}
          style={[
            styles.row,
            styles.team_row,
            {
              backgroundColor:
                index % 2 === 0
                  ? Colors.LIGHT_BLUE_DARK
                  : Colors.DARK_BLUE_PLAYOFFS,
            },
          ]}
        >
          {/* Equipo */}
          <View style={styles.team_col}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${row?.entity?.object?.id}/2`,
              }}
              style={{ width: 36, height: 36 }}
              contentFit="contain"
            />
            <Text
              style={styles.team_name}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {row?.entity?.object?.short_name}
            </Text>
          </View>

          {/* Stats */}
          {STATS.map((stat) => (
            <Text key={stat.key} style={styles.stat_value}>
              {stat.getValue(row)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.BLUE_BORDER,
    marginVertical: 10,
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    paddingVertical: 12,
    backgroundColor: Colors.DARK_BLUE,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  team_row: {
    paddingVertical: 12,
    gap: 4,
  },
  team_col: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  team_name: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    flexShrink: 1,
  },
  col_header: {
    width: width * 0.12,
    textAlign: "center",
    fontSize: RFValue(12),
    color: Colors.GRAY_LIGHT,
    fontWeight: "bold",
    paddingVertical: 6,
    backgroundColor: Colors.DARK_BLUE,
  },
  stat_value: {
    width: width * 0.12,
    textAlign: "center",
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
});

export default MatchStandings;
