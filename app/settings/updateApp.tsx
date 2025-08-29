import { Colors } from '@/constants/colors/colors';
import useCheckUpdates from '@/hooks/checkUpdates/useCheckUpdates';
import * as Application from 'expo-application';
import { Stack } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
const { width, height } = Dimensions.get('window');
const UpdateApp = () => {
  const { status, error, check, download, apply } = useCheckUpdates();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Actualizaciones',
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />
      <View>
        <Text style={styles.title_text}>Comprobar si hay actualizaciones.</Text>
      </View>
      <View>
        <Text style={styles.currentVersion_text}>
          Versión actual: {Application.nativeApplicationVersion}
        </Text>
      </View>
      <View style={styles.check_button_container}>
        <Pressable onPress={() => check()}>
          <Text style={styles.check_text_button}>Comprobar</Text>
        </Pressable>
      </View>
      {status === 'available' && (
        <View style={styles.status_container}>
          <View>
            <Text style={styles.update_available_text}>
              Se encontró una nueva actualización. ¿Descargar ahora?
            </Text>
          </View>
          <View style={styles.check_button_container}>
            <Pressable onPress={() => download()}>
              <Text style={styles.check_text_button}>Descargar</Text>
            </Pressable>
          </View>
        </View>
      )}
      {status === 'downloading' && (
        <View style={styles.status_container}>
          <Text style={styles.noupdate_text}>Descargando actualización...</Text>
        </View>
      )}
      {status === 'ready' && (
        <View style={styles.status_container}>
          <View>
            <Text style={styles.update_available_text}>
              Se descargó la nueva actualización. ¿Aplicar ahora?
            </Text>
          </View>
          <View style={styles.check_button_container}>
            <Pressable onPress={() => apply()}>
              <Text style={styles.check_text_button}>Aplicar</Text>
            </Pressable>
          </View>
        </View>
      )}
      {status === 'noUpdate' && (
        <View style={styles.status_container}>
          <Text style={styles.noupdate_text}>
            No hay actualizaciones disponibles.
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.status_container}>
          <Text style={styles.error_text}>
            Error al intentar consultar nuevas actualizaciones
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    alignItems: 'center',
  },
  menu_container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
    marginTop: 16,
  },
  menu_text_item: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
  },
  title_text: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.YELLOW_LIGHT,
  },
  check_button_container: {
    marginTop: 24,
    width: width * 0.4,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  check_text_button: {
    fontSize: 20,
    color: Colors.YELLOW_LIGHT,
    fontWeight: 'bold',
  },
  currentVersion_text: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
  status_container: {
    alignItems: 'center',
    width: width * 0.9,
    marginTop: 16,
  },
  update_available_text: {
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noupdate_text: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
  },
  error_text: {
    fontSize: 18,
    color: Colors.RED_CHANGE_PLAYER,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateApp;
