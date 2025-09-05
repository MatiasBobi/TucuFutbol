import { Colors } from "@/constants/colors/colors";
import useAppUpdate from "@/hooks/checkUpdates/useAppUpdate";
import { useAndroidNotificationPermission } from "@/hooks/notifications/useNotificationsPermissions";
import { Ionicons } from "@expo/vector-icons";
import messaging from "@react-native-firebase/messaging";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { hasPermission, request } = useAndroidNotificationPermission();

  const [showModal, setShowModal] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // Función para configurar FCM
  const setupFirebaseMessaging = async () => {
    try {
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }

      // Obtener token FCM
      const token = await messaging().getToken();
      setFcmToken(token);

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {});

      messaging().onNotificationOpenedApp((remoteMessage) => {});

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        // Notificación inicial pendiente
      }

      return unsubscribe;
    } catch (error) {
      console.log("Error configurando FCM:", error);
    }
  };

  useEffect(() => {
    // Mostrar modal solo si no tiene permisos y no esta bloqueado
    if (hasPermission === false) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [hasPermission]);

  useEffect(() => {
    setupFirebaseMessaging();
  }, []);

  const handleActivateNotifications = async () => {
    const granted = await request();
    if (granted) {
      setShowModal(false);
    }
  };

  const handleLater = () => {
    setShowModal(false);
  };

  const handleOverlayPress = () => {
    setShowModal(false);
  };

  useAppUpdate();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {/* Pantalla principal */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        {/* Modal de notificaciones */}
        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={handleLater}
        >
          <View style={styles.modalOverlay}>
            {/* Overlay pressable para cerrar al tocar afuera */}
            <Pressable
              style={styles.overlayPressable}
              onPress={handleOverlayPress}
            />

            {/* Contenido del modal */}
            <View style={styles.modalContent}>
              <View style={styles.modalContainer}>
                {/* Icono */}
                <View style={styles.iconContainer}>
                  <Ionicons name="notifications" size={40} color="#007AFF" />
                </View>

                {/* Título */}
                <Text style={styles.title}>🔔 Notificaciones</Text>

                {/* Mensaje */}
                <Text style={styles.message}>
                  Nuestra aplicación utiliza notificaciones para mantenerte
                  informado.
                </Text>

                {/* Botones */}
                {/* Botones */}
                <View style={styles.buttonsContainer}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.laterButton,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={handleLater}
                  >
                    <Text style={styles.laterButtonText}>Ahora no</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.activateButton,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={handleActivateNotifications}
                  >
                    <Text style={styles.activateButtonText}>Activar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayPressable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.WHITE_GRAY,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: Colors.SLAT_BLUE,
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: Colors.LIGHT_BLACK,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.LIGHT_BLACK,
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    transitionDuration: "200ms",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  laterButton: {
    backgroundColor: Colors.LATER_BUTTON,
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
  },
  laterButtonText: {
    color: Colors.LIGHT_BLACK,
    fontWeight: "600",
    fontSize: 16,
  },
  activateButton: {
    backgroundColor: Colors.ACTIVATE_BUTTON_NOTI,
  },
  activateButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  settingsButton: {
    backgroundColor: Colors.SETTINGS_BUTTON,
  },
  settingsButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
