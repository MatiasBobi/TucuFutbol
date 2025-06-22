import { League } from '@/types/todayMatches';
import { StyleSheet, Text, View } from 'react-native';
import MatchTodayInfo from './match_today_info';

export default function LeagueTableToday(props: { league: League }) {
  const { league } = props;
  return (
    <View style={styles.container_today}>
      <View style={styles.title}>
        <Text style={styles.titleText}> {league.name}</Text>
      </View>
      <View style={styles.matches_container}>
        {league.games.map((match, index) => {
          return <MatchTodayInfo teams={match} key={index} />;
        })}
      </View>

      <View style={styles.view_more_info}>
        <Text style={styles.view_more_info_text}>Ver liga completa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_today: {
    backgroundColor: '#041026',
    width: '100%',
  },
  title: {
    backgroundColor: '#141c34',
    padding: 10,
  },
  matches_container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#1b2a57',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  view_more_info: {
    backgroundColor: '#141c34',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_more_info_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
