import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export const useAndroidNotificationPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  // Caso Android < 13 (no necesita permiso para notificaciones)
  if (typeof Platform.Version === "number" && Platform.Version < 33) {
    return {
      hasPermission: true,
      check: async () => true,
      request: async () => true,
    };
  }

  const checkPermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      setHasPermission(granted);
      return granted;
    } catch {
      return false;
    }
  };

  const requestPermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      const granted = result === PermissionsAndroid.RESULTS.GRANTED;
      setHasPermission(granted);
      return granted;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { hasPermission, check: checkPermission, request: requestPermission };
};
