import { Colors } from '@/constants/colors/colors';
import { GameInfoItem } from '@/types/game_info';
import { StyleSheet, Text, View } from 'react-native';

const MatchGameInfo = ({ game_info }: { game_info: GameInfoItem[] }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info_header_text}>Información</Text>
      </View>
      <View>
        {game_info.map((info, index) => (
          <View key={index} style={styles.info_container}>
            <Text style={styles.info_name_text}>{info.name}: </Text>
            <Text style={styles.info_value_text}>{info.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
  },
  info_header_text: {
    fontSize: 22,
    marginBottom: 10,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  info_container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  info_name_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
  info_value_text: {
    fontSize: 14,
    color: Colors.YELLOW_LIGHT,
    fontWeight: 'bold',
  },
});

export default MatchGameInfo;
