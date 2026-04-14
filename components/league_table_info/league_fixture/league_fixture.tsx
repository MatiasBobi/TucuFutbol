import { Colors } from "@/constants/colors/colors";
import useLeagueFixture from "@/hooks/league_fixture/league_fixture";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Game, GameFilter } from "../../../types/league_full_info";
const { height } = Dimensions.get("window");

export default function LeagueFixture({
  league_fixture,
  league_id,
}: {
  league_fixture: GameFilter[];
  league_id: string;
}) {
  /* Extraer la fecha a mostrar por default (La que se esta jugando ahora mismo), se consulta por selected === true. */
  const fixtureIdNow = league_fixture.find(
    (idFixture) => idFixture.selected === true,
  );

  const [fixturekey, setFixtureKey] = useState(fixtureIdNow?.key || " ");

  const { data, isLoading, error, isFetching } = useLeagueFixture(
    fixturekey,
    league_id,
  ); // Extraer la fecha consultada.

  const SkeletonView = () => {
    const opacity = useState(new Animated.Value(0.3))[0];

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
          height: height * 0.12,
          borderRadius: 10,

          marginBottom: 10,
          backgroundColor: "#1b2a57",
          padding: 10,
          opacity,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {/* equipo 1 */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#2f3e6a",
                marginBottom: 5,
              }}
            />
            <View
              style={{
                width: 60,
                height: 10,
                backgroundColor: "#2f3e6a",
                borderRadius: 5,
              }}
            />
          </View>

          {/* score */}
          <View style={{ flex: 0.8, alignItems: "center" }}>
            <View
              style={{
                width: 40,
                height: 12,
                backgroundColor: "#2f3e6a",
                borderRadius: 5,
              }}
            />
          </View>

          {/* equipo 2 */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#2f3e6a",
                marginBottom: 5,
              }}
            />
            <View
              style={{
                width: 60,
                height: 10,
                backgroundColor: "#2f3e6a",
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  };
  /* Renderizado unico de cada enfretamiento,  */
  const renderItem = ({ item }: { item: Game }) => {
    const matchid = item.id;
    return (
      <Link
        href={{
          pathname: "/match_info/[match]",
          params: { match: matchid },
        }}
        asChild
      >
        <Pressable style={styles.item_container}>
          <View style={styles.result_container}>
            <Text style={styles.time_match_text}>
              {item?.status?.enum === 3
                ? item?.status?.short_name === "Final"
                  ? "Final"
                  : item?.status?.symbol_name + " (Final)"
                : item?.status?.short_name === "ET"
                  ? "ET"
                  : item?.status?.enum === 1
                    ? `${item?.start_time?.split(" ")[0].split("-")[0]}/${
                        item?.start_time?.split(" ")[0].split("-")[1]
                      } ${item?.start_time?.split(" ")[1]}`
                    : item?.game_time_status_to_display === "-1"
                      ? "ERROR"
                      : item?.game_time_status_to_display}
            </Text>
          </View>
          <View style={styles.infoGame_container}>
            <View style={styles.team_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${item?.teams?.[0]?.id}/4`}
                style={[styles.teamImage, { marginLeft: 8 }]}
                contentFit="contain"
              />
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {item?.teams?.[0]?.short_name}
              </Text>
            </View>
            <View style={styles.score_container}>
              {item?.penalties ? (
                <Text style={styles.scoreText}>
                  {"("}
                  {item?.penalties?.[0]}
                  {") "}
                  {item?.scores?.[0]} - {item?.scores?.[1]}
                  {" ("}
                  {item?.penalties?.[1]}
                  {")"}
                </Text>
              ) : (
                <Text style={styles.scoreText}>
                  {item?.scores?.[0]} - {item?.scores?.[1]}
                </Text>
              )}
            </View>
            <View style={styles.team_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${item?.teams?.[1]?.id}/4`}
                style={[styles.teamImage, { marginRight: 8 }]}
                contentFit="contain"
              />
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {item?.teams?.[1]?.short_name}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker_container}>
        <Picker
          selectedValue={fixturekey}
          onValueChange={(itemValue, itemIndex) => setFixtureKey(itemValue)}
          dropdownIconColor={Colors.YELLOW_LIGHT}
          dropdownIconRippleColor={Colors.DARK_BLUE}
          mode="dialog"
          style={styles.picker}
        >
          <Picker.Item
            style={styles.picker_item}
            label={`Fecha disputándose: ${
              fixtureIdNow?.name ? fixtureIdNow?.name : "Seleccionar fecha"
            }`}
            value={fixtureIdNow?.key}
          />
          {league_fixture.map((fixture) => {
            return (
              <Picker.Item
                key={fixture.key}
                label={`${fixture.name}`}
                value={`${fixture.key}`}
                style={styles.picker_item}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.table_container}>
        {error ? (
          <View style={styles.error_container}>
            <Text style={styles.error_icon}>⚠️</Text>

            <Text style={styles.error_title}>No se pudo cargar la fecha</Text>

            <Text style={styles.error_description}>
              Verificá tu conexión o intentá nuevamente.
            </Text>

            <Pressable
              style={styles.retry_button}
              onPress={() => {
                setFixtureKey("");
                setTimeout(() => {
                  setFixtureKey(fixtureIdNow?.key || " ");
                }, 0);
              }}
            >
              <Text style={styles.retry_text}>Reintentar</Text>
            </Pressable>
          </View>
        ) : isLoading ? (
          <View style={styles.mapteam_container}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonView key={index} />
            ))}
          </View>
        ) : (data?.games.length === 0 && fixtureIdNow === undefined) ||
          (fixtureIdNow === undefined && data === undefined) ? (
          <View style={styles.empty_container}>
            <Text style={styles.empty_icon}>📅</Text>

            <Text style={styles.empty_title}>No hay partidos disponibles</Text>

            <Text style={styles.empty_description}>
              Probá seleccionando otra fecha del calendario.
            </Text>
          </View>
        ) : (
          <View style={styles.mapteam_container}>
            {data?.games?.map((game: Game) => {
              return <View key={game.id}>{renderItem({ item: game })}</View>;
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  mapteam_container: {
    width: "100%",
  },
  picker_container: {
    width: "95%",
    backgroundColor: Colors.DARK_BLUE,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
  },
  picker: {
    flex: 1,
    color: Colors.YELLOW_LIGHT,
  },
  picker_item: {
    color: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.DARK_BLUE,
  },
  table_container: {
    marginTop: 20,
    flexDirection: "row",
    width: "95%",
    marginBottom: 100,
  },
  item_container: {
    marginVertical: 8,
    minHeight: height * 0.12,
    borderRadius: 8,
    backgroundColor: Colors.DARK_BLUE_HIDDEN_ROWS,
    padding: 8,
  },
  result_container: {
    alignItems: "center",
    marginBottom: 4,
  },
  infoGame_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },
  team_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  teamImage: {
    width: 30,
    height: 30,
  },
  teamText: {
    fontSize: RFValue(14),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    marginTop: 4,
  },

  score_container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: RFValue(20),
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
  },

  time_match_text: {
    color: Colors.YELLOW_LIGHT,
    fontSize: RFValue(18),
  },
  DataNotFound_container: {
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    marginTop: 10,
  },
  DataNotFound_text: {
    fontSize: RFValue(24),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  error_container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 12,
    backgroundColor: Colors.DARK_BLUE_HIDDEN_ROWS,
    marginTop: 10,
  },

  error_icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  error_title: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    marginBottom: 5,
  },

  error_description: {
    fontSize: RFValue(14),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    marginBottom: 15,
  },

  retry_button: {
    backgroundColor: Colors.YELLOW_LIGHT,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  retry_text: {
    color: Colors.DARK_BLUE,
    fontWeight: "bold",
  },
  empty_container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 12,
    backgroundColor: Colors.DARK_BLUE_HIDDEN_ROWS,
    marginTop: 10,
  },

  empty_icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  empty_title: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    marginBottom: 5,
  },

  empty_description: {
    fontSize: RFValue(14),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
});
