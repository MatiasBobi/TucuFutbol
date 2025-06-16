import { Image, StyleSheet, Text, View } from 'react-native';

export default function MatchTodayInfo() {
  return (
    <View style={styles.container_match}>
      <View style={styles.time_match}>
        <Text style={styles.time_match_text}>{"50'"}</Text>
      </View>
      <View style={styles.team_match}>
        <View style={styles.team_match_info}>
          <Image
            source={{ uri: 'https://api.promiedos.com.ar/images/team/igi/1' }}
            style={{ width: 31, height: 40 }}
          />
          <Text
            style={styles.team_match_text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            River Plate
          </Text>
        </View>
        <View style={styles.team_match_score}>
          <Text style={styles.team_match_score_text}>1</Text>
          <Text style={styles.team_match_vs}>-</Text>
          <Text style={styles.team_match_score_text}>2</Text>
        </View>
        <View style={styles.team_match_info}>
          <Image
            source={{ uri: 'https://api.promiedos.com.ar/images/team/igg/1' }}
            style={{ width: 31, height: 40 }}
          />
          <Text
            style={styles.team_match_text}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Boca Jrs.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_match: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: 'white',
  },
  time_match: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time_match_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  team_match: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  team_match_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    maxWidth: 100, // Ancho máximo antes de truncar
    flexShrink: 1,
  },
  team_match_info: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  team_match_score: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  team_match_score_text: {
    fontSize: 24,
    color: '#e71c4a',
    fontWeight: 'bold',
  },
  team_match_vs: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});
