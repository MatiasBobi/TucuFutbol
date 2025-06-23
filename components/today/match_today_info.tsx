import { Colors } from '@/constants/colors/colors';
import useGameInfo from '@/hooks/game_info/useGameInfo';
import { Game } from '@/types/todayMatches';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MatchTodayInfo(props: { teams: Game }) {
  const { teams } = props;
  const team1 = teams?.teams?.[0];
  const team2 = teams?.teams?.[1];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const matchStatus =
    teams?.status?.enum === 3
      ? 'finished'
      : teams?.status?.enum === 1
      ? 'pre'
      : 'live';

  const { data, isFetching } = useGameInfo(teams?.id, isExpanded, matchStatus);
  const events = data?.game?.events || null;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isExpanded, fadeAnim]);

  useEffect(() => {
    if (!isFetching && isInitialLoad && isExpanded) {
      setIsInitialLoad(false);
    }
  }, [isFetching, isInitialLoad, isExpanded]);

  return (
    <View>
      <Pressable
        style={styles.info_match_container}
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <View style={styles.team_match}>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team1?.id}/2`,
              }}
              style={{ width: 51, height: 60 }}
              resizeMode="center"
            />
            <Text
              style={styles.team_match_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team1?.short_name}
            </Text>
          </View>
          <View style={styles.team_match_score}>
            <Text style={styles.team_match_score_text}>
              {teams?.status?.enum === 1 ? ' ' : teams?.scores?.[0].toString()}
            </Text>
            <View>
              <Text style={styles.time_match_text}>
                {teams?.status?.enum === 3
                  ? teams?.status?.short_name
                  : teams?.status?.short_name === 'ET'
                  ? 'ET'
                  : teams?.status?.enum === 1
                  ? teams?.start_time?.split(' ')[1]
                  : teams?.game_time_to_display === '-1'
                  ? 'ERROR'
                  : teams?.game_time_to_display}
              </Text>
            </View>
            <Text style={styles.team_match_score_text}>
              {teams?.status?.enum === 1 ? ' ' : teams?.scores?.[1].toString()}
            </Text>
          </View>
          <View style={styles.team_match_info}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${team2?.id}/2`,
              }}
              style={{ width: 60, height: 60 }}
              resizeMode="center"
            />
            <Text
              style={styles.team_match_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team2.short_name}
            </Text>
          </View>
        </View>

        {isExpanded ? (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="#F5F5F5" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#F5F5F5" />
        )}

        {isExpanded ? (
          <Animated.View
            style={[styles.expandedContent, { opacity: fadeAnim }]}
          >
            {isFetching && isInitialLoad ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando eventos...</Text>
              </View>
            ) : events ? (
              events.map((event, index) => (
                <View key={index} style={styles.events_container}>
                  {event.rows.map((row, index) => (
                    <View key={index} style={styles.events_row_container}>
                      <Text style={styles.events_time}>{row.time}</Text>
                      {row.events.map((event, index) => (
                        <View key={index} style={styles.events_row}>
                          <View
                            style={
                              event.team === 1
                                ? styles.events_team1
                                : styles.events_team2
                            }
                          >
                            {event.team === 1 && (
                              <View>
                                <Image
                                  source={{
                                    uri: `https://api.promiedos.com.ar/images/games/event/${event.type}`,
                                  }}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode="center"
                                />
                              </View>
                            )}
                            <View style={styles.events_container_text}>
                              <Text style={styles.events_text}>
                                {event.texts?.[0].split(' ').slice(-1)}
                              </Text>
                              {event.texts?.[1] && (
                                <Text
                                  style={
                                    event.type === 1
                                      ? styles.events_text_goal
                                      : styles.events_text_change
                                  }
                                >
                                  {event.texts?.[1].split(' ').slice(-1)}
                                </Text>
                              )}
                            </View>
                            {event.team === 2 && (
                              <View>
                                <Image
                                  source={{
                                    uri: `https://api.promiedos.com.ar/images/games/event/${event.type}`,
                                  }}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode="center"
                                />
                              </View>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                  <Text style={styles.events_name}>{event.name}</Text>
                </View>
              ))
            ) : (
              <View>
                <Text style={styles.noEventsText}>
                  No hay eventos disponibles
                </Text>
              </View>
            )}
          </Animated.View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  info_match_container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.DARK_BLUE,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  team_match: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  team_match_info: {
    width: 140,
    alignItems: 'center',
  },
  team_match_text: {
    fontSize: 17,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
    width: 140,
    textAlign: 'center',
  },
  team_match_score: {
    width: 80,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  expandedContent: {
    width: '100%',
    overflow: 'hidden',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.WHITE_GRAY,
    fontSize: 16,
  },
  noEventsText: {
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
  },
  team_match_score_text: {
    fontSize: 24,
    color: Colors.GRAY_LIGHT,
    fontWeight: 'bold',
    width: 10,
    textAlign: 'center',
  },
  time_match_text: {
    fontSize: 16,
    color: Colors.YELLOW_LIGHT,
    fontWeight: 'bold',
  },
  goals_match_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  goals_match_container_team1: {
    width: 150,
    gap: 10,
    alignItems: 'flex-start',
  },
  goals_match_container_team2: {
    width: 150,
    gap: 10,
    alignItems: 'flex-end',
  },
  goal_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
  time_text: {
    fontSize: 16,
    color: Colors.YELLOW_LIGHT,
    fontWeight: 'bold',
  },
  events_row_container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
    paddingVertical: 10,
    position: 'relative',
  },
  events_name: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLUE_BORDER,
  },
  events_time: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }],
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 2,
    zIndex: 1,
  },
  events_row: {
    paddingTop: 10,
    justifyContent: 'space-between',
    gap: 10,
    height: 60,
  },
  events_container: {
    width: 360,
  },
  events_team1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  events_team2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  events_text_goal: {
    color: Colors.YELLOW_GOAL,
    textAlign: 'center',
  },
  events_container_text: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  events_text: {
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  events_text_change: {
    color: Colors.RED_CHANGE_PLAYER,
    textAlign: 'center',
  },
  goal_player_name_text: {},
});
