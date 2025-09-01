import { Colors } from "@/constants/colors/colors";
import { Image } from "expo-image";
import { Link } from "expo-router";

import { Dimensions, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");

export const TeamLink = ({
  id,
  team_name,
}: {
  id: string;
  team_name: string;
}) => {
  return (
    <Link
      href={{
        pathname: "/team/[team]",
        params: { team: id }, // Mandamos la id del equipo para consultar a la API.
      }}
      style={styles.teamLink_container}
    >
      <View style={styles.teamView_link_container}>
        <Image
          source={`https://api.promiedos.com.ar/images/team/${id}/4`}
          style={styles.teamImage}
          contentFit="contain"
        />
        <Text style={styles.teamLink}>{team_name}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  teamLink_container: {},
  teamView_link_container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.4,
    height: 250,
    maxHeight: 350,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  teamLink: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  teamImage: {
    width: 50,
    height: 50,
  },
});
