import SquadTeam from '@/components/team/squad/squad';
import { Colors } from '@/constants/colors/colors';
import useTeamInfo from '@/hooks/team_info/team_info';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const Team = () => {
  const { team } = useLocalSearchParams(); // Team proveniente de la ID

  /* Nos aseguramos de que team sea un string antes de pasarlo al hook */
  const teamId = Array.isArray(team) ? team[0] : team;

  const { data, isLoading, error } = useTeamInfo(teamId);
  const [ActiveSection, setActiveSection] = useState<
    'plantel' | 'partidos' | 'info'
  >('plantel');

  const renderSection = () => {
    switch (ActiveSection) {
      case 'plantel':
        if (!data?.squad) {
          return (
            <Text style={{ color: Colors.WHITE_GRAY }}>
              No hay datos de plantel disponibles.
            </Text>
          );
        }
        return <SquadTeam squad={data.squad} />;
      case 'partidos':
        return <></>; // Aquí iría el componente de Partidos
      case 'info':
        return <></>; // Aquí iría el componente de Info
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: data?.competitor?.name || ' ',
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />
      <View style={styles.container_buttons}>
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('plantel')}
        >
          <Text style={styles.text_buttons}>Plantel</Text>
        </Pressable>
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('partidos')}
        >
          <Text style={styles.text_buttons}>Partidos</Text>
        </Pressable>
        <Pressable
          style={styles.button_pressable}
          onPress={() => setActiveSection('info')}
        >
          <Text style={styles.text_buttons}>Info</Text>
        </Pressable>
      </View>
      <View style={styles.container_team_image}>
        <Image
          source={`https://api.promiedos.com.ar/images/team/${team}/4`}
          style={styles.teamImage}
          contentFit="contain"
        />
        <Text style={styles.text_name_team}>{data?.competitor?.name}</Text>
      </View>
      {isLoading ? (
        <Text style={{ color: Colors.WHITE_GRAY }}>Cargando...</Text>
      ) : error ? (
        <Text style={{ color: Colors.RED_CHANGE_PLAYER }}>
          Error al cargar el equipo
        </Text>
      ) : (
        renderSection()
      )}
    </View>
  );
};

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
    width: width * 0.9,

    marginBottom: 40,
    gap: 10,
  },
  text_buttons: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  button_pressable: {
    width: width * 0.25,
    height: height * 0.08,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  teamImage: {
    width: 100,
    height: 100,
  },
  text_name_team: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    paddingVertical: 10,
  },
  container_team_image: {
    width: width * 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
export default Team;
