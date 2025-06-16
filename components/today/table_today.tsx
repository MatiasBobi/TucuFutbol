import { StyleSheet, Text, View } from 'react-native';
import MatchTodayInfo from './match_today_info';
export default function TableToday() {
  return (
    <View style={styles.container_today}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Liga Argentina</Text>
      </View>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <MatchTodayInfo></MatchTodayInfo>
      <View>
        <Text>Ver info de la liga...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_today: {
    backgroundColor: '#306438',
    width: '100%',
  },
  title: {
    backgroundColor: '#1f851f',
    padding: 10,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
