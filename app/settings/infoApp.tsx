import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import * as Application from "expo-application";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const InfoApp = () => {
  const { width } = useWindowDimensions();

  return (
    <ScreenContainer style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Información de la APP",
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: width < 400 ? 10 : 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.changes_container}>
          <View style={styles.versionHeader}>
            <Text style={styles.currentVersion_text}>
              Versión actual: {Application.nativeApplicationVersion}
            </Text>
          </View>
          <View style={styles.versionHeader}>
            <Text style={styles.currentVersion_text}>
              Mail de contacto: tuculive.contact@gmail.com
            </Text>
          </View>
          <View style={styles.versionHeader}>
            <Text style={styles.currentVersion_text}>
              Proyecto de estudio. En el caso de contacto por trabajo, enviar un
              Correo al email indicado arriba
            </Text>
          </View>
          {/* Version 1.0.0 */}
          <View style={styles.versions_changes}>
            <View style={styles.versionSection}>
              <Text style={styles.versionTitle}>Version 1.0.0</Text>
              <View style={styles.texts_changes_container}>
                <Text style={styles.check_text}>✓ </Text>
                <Text style={styles.text_info_change}>
                  Lanzamiento de la aplicación.
                </Text>
              </View>
            </View>
            {/* Version 1.0.1 */}
            <View style={styles.versionSection}>
              <Text style={styles.versionTitle}>Version 1.0.1</Text>
              <View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Se arreglaron los anchos en las estadísticas del partido.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Fixeado el height de los playoffs.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Se reducen los tamaños de la fuente en los botones en ligas,
                    partidos y equipos.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Ahora se puede ver el resumen del partido en las
                    estadísticas del partido seleccionado.
                  </Text>
                </View>
              </View>
            </View>
            {/* Version 1.0.2 */}
            <View style={styles.versionSection}>
              <Text style={styles.versionTitle}>Version 1.0.2</Text>
              <View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Se agrego los videos resumenes de los partidos.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Cambio y ajustes en los logos generales de la aplicación
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>Version estable.</Text>
                </View>
              </View>
            </View>
            {/* Version 1.0.3 */}
            <View style={styles.versionSection}>
              <Text style={styles.versionTitle}>Version 1.0.3</Text>
              <View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Se corrigieron todos los anchos y altos de varios
                    contenedores.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Ahora no muestra el texto de cómo agregar un equipo a
                    favoritos una vez agregado.
                  </Text>
                </View>

                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Agregada la funcionalidad de notificaciones.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Mejoras de rendimiento.
                  </Text>
                </View>
              </View>
            </View>
            {/* Version 1.0.3 */}
            <View style={styles.versionSection}>
              <Text style={styles.versionTitle}>Version 1.0.4</Text>
              <View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Últimos arreglos visuales pre-Play Store.
                  </Text>
                </View>
                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Se agregaron más información en las formaciones del partido.
                  </Text>
                </View>

                <View style={styles.texts_changes_container}>
                  <Text style={styles.check_text}>✓ </Text>
                  <Text style={styles.text_info_change}>
                    Lanzamiento en la Google Play Store.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DARK_BLUE,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  versionHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  currentVersion_text: {
    fontSize: 18,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
  },
  changes_container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  versions_changes: {
    gap: 20,
    width: "100%",
    maxWidth: 500, // Limita el ancho máximo en tablets
  },
  versionSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  versionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
    marginBottom: 10,
  },
  texts_changes_container: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
    flex: 1,
  },
  text_info_change: {
    fontSize: 14,
    color: Colors.YELLOW_LIGHT,
    flex: 1,
    flexWrap: "wrap",
  },
  check_text: {
    fontSize: 14,
    color: Colors.GREEN_WIN,
    marginRight: 5,
  },
});

export default InfoApp;
