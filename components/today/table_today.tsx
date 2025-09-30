import { League } from "@/types/todayMatches";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MatchTodayInfo } from "./match_today_info";
export const LeagueTableToday = React.memo(function LeagueTableToday(props: {
  league: League;
}) {
  const { league } = props;
  return (
    <View style={styles.container_today}>
      <Link
        href={{ pathname: "/league/[league]", params: { league: league.id } }}
        asChild
      >
        <Pressable style={styles.title}>
          <Text style={styles.titleText}> {league.name}</Text>
        </Pressable>
      </Link>
      <View style={styles.matches_container}>
        {league.games.map((match, index) => {
          return <MatchTodayInfo teams={match} key={match.id} />;
        })}
      </View>
      {/* Link para ver la liga completa, espera un ID en string. */}
      <Link
        href={{ pathname: "/league/[league]", params: { league: league.id } }}
        asChild
        style={styles.view_more_info}
      >
        <Text style={styles.view_more_info_text}>Ver liga completa</Text>
      </Link>
    </View>
  );
});

const styles = StyleSheet.create({
  container_today: {
    backgroundColor: "#041026",
    width: "100%",
    paddingBottom: 20,
  },
  title: {
    backgroundColor: "#141c34",
    padding: 10,
  },
  matches_container: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#1b2a57",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  view_more_info: {
    backgroundColor: "#1c284e",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  view_more_info_text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
