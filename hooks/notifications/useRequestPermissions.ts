import { PermissionsAndroid, Platform } from 'react-native';

const useRequestNotificationPermission = async () => {
  
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (!hasPermission && Platform.Version >= 33) {
      
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: '🔔 Permiso de Notificaciones',
          message: 'Queremos enviarte alertas de goles y resultados en tiempo real',
          buttonPositive: 'Activar',
          buttonNegative: 'Cancelar',
          buttonNeutral: 'Después'
        }
      );
      


    }
  } catch (error) {
    // Error con permisos
    return false;
  }
};

export default useRequestNotificationPermission;