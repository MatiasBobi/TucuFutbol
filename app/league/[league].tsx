import LeagueBrackets from '@/components/league_table_info/league_brackets/league_brackets';
import { LeagueTeams } from '@/components/league_table_info/league_teams/league_teams';
import { LeagueTableInfo } from '@/components/league_table_info/leaguefull';
import { Colors } from '@/constants/colors/colors';
import { useTeamsWithImages } from '@/hooks/getImagesTeam/useTeamsWithImages';
import useLeagueFullInfo from '@/hooks/league_full_info/league_full';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function League() {
  const { league } = useLocalSearchParams(); // League proveniente de la ID
  const league_id = league as string; // Asegurarse de que league es una cadena (TS)

  const { data, isLoading, error } = useLeagueFullInfo(league_id); // Query para obtener la info dela liga.
  const teamImages = useTeamsWithImages({
    tables_groups: data?.tables_groups,
    brackets: data?.brackets?.stages,
  });
  // Equipos y estadisticas
  const players_stats = data?.players_statistics; // Estadísticas de jugadores

  // Si hay tablas, mostrar tabla, si no, brackets
  const [activeSection, setActiveSection] = useState<
    'tabla' | 'equipos' | 'estadisticas' | 'fixture' | 'brackets'
  >('tabla');

  // Funcion para renderizar cada item de la tabla
  const renderItemTable = ({ item, index }: { item: any; index: number }) => (
    <LeagueTableInfo key={index} table={item} teamImages={teamImages} />
  );

  // Render de las estadisticas

  const renderStatsSection = useMemo(
    () => <LeagueTeams teamImages={teamImages} />,
    [teamImages],
  );

  // Flashlist para la info de las tablas de posiciones.
  const renderTablaSection = useMemo(
    () => (
      <FlashList
        estimatedItemSize={2}
        data={data?.tables_groups || []}
        renderItem={renderItemTable}
        keyExtractor={(item, index) =>
          `${item.name?.trim() || 'no-name'}_${index}`
        }
        showsVerticalScrollIndicator={false}
      />
    ),
    [data?.tables_groups],
  );
  // Funcion para renderizar la seccion activa
  const renderSection = () => {
    switch (activeSection) {
      case 'tabla':
        return renderTablaSection;

      case 'equipos':
        // Si no hay equipos, muestra un mensaje de carga.
        if (!teamImages || teamImages.size === 0) {
          return (
            <Text style={styles.container_league_section_text}>
              Cargando equipos...
            </Text>
          );
        }
        return renderStatsSection;
      case 'estadisticas':
        return (
          <View>
            <Text style={styles.container_league_section_text}>
              Estadisticas de la Liga
            </Text>
          </View>
        );
      case 'fixture':
        return (
          <View>
            <Text style={styles.container_league_section_text}>
              Fixture de la Liga
            </Text>
          </View>
        );
      case 'brackets':
        return <LeagueBrackets brackets={data?.brackets?.stages || []} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: data?.league?.name || ' ',
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />
      <View style={styles.container_buttons}>
        {
          data?.tables_groups ? (
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection('tabla')}
            >
              <Text style={styles.text_buttons}>Tabla</Text>
            </Pressable>
          ) : null /* Si no hay tablas, no mostrar el botón de tabla */
        }
        {
          data?.brackets?.stages ? (
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection('brackets')}
            >
              <Text style={styles.text_buttons}>Playoffs</Text>
            </Pressable>
          ) : null /* Si no hay brackets, no mostrar el botón de playoffs */
        }
        {/* Botones para cambiar la sección */}
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('equipos')}
        >
          <Text style={styles.text_buttons}>Equipos</Text>
        </Pressable>
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('fixture')}
        >
          <Text style={styles.text_buttons}>Fixture</Text>
        </Pressable>
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('estadisticas')}
        >
          <Text style={styles.text_buttons}>Estadisticas</Text>
        </Pressable>
      </View>

      {/* Se renderiza la sección.*/}
      <View style={styles.container_league_all_tables}>
        <View style={styles.container_league_table}>
          <Text style={styles.league_name}>{data?.league?.name}</Text>
          {isLoading ? (
            <Text style={styles.container_league_section_text}>
              Cargando...
            </Text>
          ) : error ? (
            <Text style={styles.container_league_section_text}>
              Error al cargar la liga
            </Text>
          ) : (
            renderSection()
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
    alignItems: 'center',
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: screenWidth * 0.8,
    height: screenHeight * 0.08,
    marginBottom: 100,
    gap: 10,
  },
  container_league_all_tables: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_buttons: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  button_pressable: {
    width: screenWidth * 0.25,
    height: screenHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  container_league_table: {
    flex: 1,
    width: screenWidth * 0.95,
  },
  league_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  container_league_section_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
});
