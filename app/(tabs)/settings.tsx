import { Colors } from "@/constants/colors/colors";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Screen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.menu_container}>
        <Link
          asChild
          href={{
            pathname: "/settings/updateApp",
          }}
        >
          <Pressable style={styles.item_menu_container}>
            <View style={styles.left_content}>
              <MaterialIcons
                name="security-update"
                size={24}
                color={Colors.WHITE_GRAY}
              />
              <Text style={styles.menu_text_item}>Actualizaciones</Text>
              <Entypo name="chevron-right" size={20} color="#aaa" />
            </View>
          </Pressable>
        </Link>
        <Link
          asChild
          href={{
            pathname: "/settings/infoApp",
          }}
        >
          <Pressable style={styles.item_menu_container}>
            <View style={styles.left_content}>
              <Entypo
                name="info-with-circle"
                size={24}
                color={Colors.WHITE_GRAY}
              />
              <Text style={styles.menu_text_item}>Informacion de la APP</Text>
              <Entypo name="chevron-right" size={20} color="#aaa" />
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  menu_container: {
    flex: 1,
    flexDirection: "column",

    marginTop: 16,
  },
  menu_text_item: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
  },
  item_menu_container: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#1f2a44",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,

    // sombra
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  left_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
});
export default Screen;
