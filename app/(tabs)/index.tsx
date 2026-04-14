import { LeagueTableToday } from "@/components/today/table_today";
import { Colors } from "@/constants/colors/colors";
import useToday from "@/hooks/today_data/useTodayData";
import { League, TodayMatches } from "@/types/todayMatches";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const SkeletonMatch = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        height: 80,
        backgroundColor: "#1b2a57",
        borderRadius: 10,
        marginBottom: 10,
        opacity,
      }}
    />
  );
};

const SkeletonLeague = () => (
  <View style={{ padding: 10, marginBottom: 20 }}>
    <View
      style={{
        height: 50,
        backgroundColor: "#141c34",
        borderRadius: 8,
        marginBottom: 10,
      }}
    />
    <SkeletonMatch />
    <SkeletonMatch />
    <SkeletonMatch />
  </View>
);

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState<
    "yesterday" | "today" | "tomorrow"
  >("today");

  const days = [
    { key: "yesterday", label: "Ayer" },
    { key: "today", label: "Hoy" },
    { key: "tomorrow", label: "Mañana" },
  ];

  const { data, isLoading, error, isFetching, refetch } = useToday(selectedDay);
  const [lastData, setLastData] = useState<TodayMatches | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Actualiza el estado con la data vieja.
  useEffect(() => {
    if (data?.leagues) {
      setLastData(data);
      setShowSkeleton(false);
    }
  }, [data]);

  const renderMatches = useCallback(
    ({ item }: { item: League }) => <LeagueTableToday league={item} />,
    [],
  );

  const handleDayChange = (day: "yesterday" | "today" | "tomorrow") => {
    //setLastData(null);
    setShowSkeleton(true);
    setSelectedDay(day);
  };

  const oneTimeLoading = (isLoading && !lastData) || showSkeleton;

  /* Verifica si se esta cargando por primera vez, una vez cargado ya no muestra el mensaje de cargando sino data vieja.*/
  if (oneTimeLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.leagueDataDays_Container}>
          {days.map((day) => (
            <Pressable
              key={day.key}
              onPress={() =>
                handleDayChange(day.key as "yesterday" | "today" | "tomorrow")
              }
              style={[
                styles.matchesDay_container,
                {
                  backgroundColor:
                    selectedDay === day.key ? Colors.YELLOW_GOAL : "#1b2a57",
                },
              ]}
            >
              <Text
                style={{
                  color:
                    selectedDay === day.key
                      ? Colors.WHITE_GRAY
                      : Colors.WHITE_GRAY,
                  fontWeight: "bold",
                  fontSize: RFValue(14),
                }}
              >
                {day.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <SkeletonLeague />
        <SkeletonLeague />
        <SkeletonLeague />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leagueDataDays_Container}>
        {days.map((day) => (
          <Pressable
            key={day.key}
            onPress={() =>
              handleDayChange(day.key as "yesterday" | "today" | "tomorrow")
            }
            style={[
              styles.matchesDay_container,
              {
                backgroundColor:
                  selectedDay === day.key ? Colors.YELLOW_GOAL : "#1b2a57",
              },
            ]}
          >
            <Text
              style={{
                color:
                  selectedDay === day.key
                    ? Colors.WHITE_GRAY
                    : Colors.WHITE_GRAY,
                fontWeight: "bold",
                fontSize: RFValue(14),
              }}
            >
              {day.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && !lastData && (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
            Error: No se pudieron consultar los partidos de hoy.
          </Text>
        </View>
      )}
      {lastData && (
        <FlatList
          data={data?.leagues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatches}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetch()}
              colors={[Colors.YELLOW_GOAL]} // Android
              tintColor={Colors.YELLOW_GOAL} // iOS
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DARK_BLUE,
  },
  loadingText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
  },
  errorText: {
    fontSize: RFValue(36),
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  matchesDay_container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  leagueDataDays_Container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    minHeight: 40,
    marginBottom: 20,
  },
});
