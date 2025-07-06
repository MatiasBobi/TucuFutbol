import { Colors } from '@/constants/colors/colors';
import { Link } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
const { width } = Dimensions.get('window');

export const TeamLink = ({
  id,
  team_name,
  image_url,
}: {
  id: string;
  team_name: string;
  image_url?: string; // Opcional, en caso de que el equipo no tenga imagen (VALIDACION SOLO PARA TS).
}) => {
  return (
    <Link
      href={{
        pathname: '/team/[team]',
        params: { team: id },
      }}
      style={styles.teamLink_container}
    >
      <View style={styles.teamView_link_container}>
        <Image
          source={{ uri: image_url }}
          style={styles.teamImage}
          resizeMode="center"
        />
        <Text style={styles.teamLink}>{team_name}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  teamLink_container: {},
  teamView_link_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.4,
    height: 100,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  teamLink: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  teamImage: {
    width: 50,
    height: 50,
  },
});
