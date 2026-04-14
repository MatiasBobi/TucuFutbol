import { Colors } from "@/constants/colors/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const FavoriteModal = ({
  visible,
  type,
  teamName,
}: {
  visible: boolean;
  type: "add" | "remove";
  teamName: string;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { opacity }]}>
          <MaterialIcons
            name={type === "add" ? "favorite" : "favorite-border"}
            size={40}
            color={
              type === "add" ? Colors.YELLOW_LIGHT : Colors.RED_CHANGE_PLAYER
            }
          />
          <Text style={styles.team_name}>{teamName}</Text>
          <Text
            style={[
              styles.message,
              {
                color:
                  type === "add"
                    ? Colors.YELLOW_LIGHT
                    : Colors.RED_CHANGE_PLAYER,
              },
            ]}
          >
            {type === "add" ? "Agregado a favoritos" : "Eliminado de favoritos"}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.BLUE_BORDER,
    minWidth: 220,
  },
  team_name: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  message: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FavoriteModal;
