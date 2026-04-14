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
    alignItems: "center",
    justifyContent: "center",
    width: width < 400 ? width * 0.44 : width * 0.28,
    height: width < 400 ? 160 : 180,
    backgroundColor: "#1f2a44",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,

    // sombra
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  teamLink: {
    color: Colors.WHITE_GRAY,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  teamImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});
