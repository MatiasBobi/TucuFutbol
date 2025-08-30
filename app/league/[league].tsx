import LeagueBrackets from "@/components/league_table_info/league_brackets/league_brackets";
import LeagueChampions from "@/components/league_table_info/league_champions/league_champions";
import LeagueFixture from "@/components/league_table_info/league_fixture/league_fixture";
import LeaguePlayerStats from "@/components/league_table_info/league_playerstats/league_playerStats";
import LeagueTableData from "@/components/league_table_info/league_table/league_table";
import { LeagueTeams } from "@/components/league_table_info/league_teams/league_teams";
import { Colors } from "@/constants/colors/colors";
import useLeagueFullInfo from "@/hooks/league_full_info/league_full";
import { TableGroup } from "@/types/league_full_info";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function League() {
  const { league } = useLocalSearchParams(); // League proveniente de la ID
  const league_id = league as string; // Asegurarse de que league es una cadena (TS)
  //const { getMappingKey } = useMappingHelper();

  const { data, isLoading, error } = useLeagueFullInfo(league_id); // Query para obtener la info dela liga.

  const leagueExists = useMemo(() => {
    // Si está cargando, no podemos determinar si existe o no
    if (isLoading) return undefined;
    if (!data) return false;
    // Si el objeto solo tiene TTL, la liga no existe
    const keys = Object.keys(data);
    return keys.length > 1 || (keys.length === 1 && keys[0] !== "TTL");
  }, [data, isLoading]);

  // Si hay tablas, mostrar tabla, si no, brackets
  const [activeSection, setActiveSection] = useState<
    "tabla" | "equipos" | "estadisticas" | "fixture" | "brackets" | "champions"
  >("tabla");

  //

  //////////////// TABLA DE POSICIONES /////////////////////////////
  const keyStractorLeagueTable = useCallback(
    (item: TableGroup, index: number) => `${item.name}_${index}`,
    []
  );

  // Funcion para renderizar cada item de la tabla
  const RenderItemTable = React.memo(function RenderItemTable({
    item,
  }: {
    item: TableGroup;
  }) {
    if (item?.tables?.length === 0) return null;

    return (
      <View>
        <Text style={styles.table_name_text}>{item.name}</Text>
        {item?.tables?.map((table, index) => (
          <LeagueTableData
            key={keyStractorLeagueTable(item, index)}
            table={table.table}
            table_name={table.name}
          />
        ))}
      </View>
    );
  });

  const renderItemTableFn = useCallback(
    ({ item }: { item: TableGroup }) => <RenderItemTable item={item} />,
    []
  );

  // Render de estadisticas de los jugadores

  const keyExtractorTable = useCallback(
    (item: TableGroup, index: number) => `${item.name}_${index}`,
    []
  );
  // FlatList para la info de las tablas de posiciones.
  const renderTablaSection = useMemo(
    () => (
      <FlatList
        data={data?.tables_groups || []}
        renderItem={renderItemTableFn}
        keyExtractor={keyExtractorTable}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    ),
    [data?.tables_groups]
  );

  //////////////// FIN TABLA DE POSICIONES /////////////////////////////

  //////////////// TABLA DE EQUIPOS /////////////////////////////

  const renderTeamSection = () => {
    if (data?.tables_groups) {
      return (
        <LeagueTeams teams={data?.tables_groups} typeInfo="table"></LeagueTeams>
      );
    }
    if (data?.brackets?.stages) {
      return (
        <LeagueTeams
          teams={data?.brackets?.stages}
          typeInfo="brackets"
        ></LeagueTeams>
      );
    }
  };

  //////////////// FIN TABLA DE EQUIPOS /////////////////////////////

  // Funcion para renderizar la seccion activa
  const renderSection = () => {
    switch (activeSection) {
      case "tabla":
        return renderTablaSection;

      case "equipos":
        return renderTeamSection();
      case "estadisticas":
        return (
          <LeaguePlayerStats league_stats={data?.players_statistics?.tables} />
        );
      case "fixture":
        return (
          <View>
            <LeagueFixture
              league_fixture={data?.games?.filters || []}
              league_id={data?.league?.id || ""}
            />
          </View>
        );
      case "brackets":
        return <LeagueBrackets brackets={data?.brackets?.stages || []} />;
      case "champions":
        return <LeagueChampions league_id={data?.league?.id ?? ""} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: data?.league?.name || " ",
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTintColor: Colors.WHITE_GRAY,
        }}
      />

      {leagueExists === false ? (
        <View style={styles.league_notfound}>
          <Text style={styles.league_notfound_text}>
            La liga solicitada no existe o no está disponible
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.container_buttons}>
            {
              data?.tables_groups ? (
                <Pressable
                  style={styles.button_pressable}
                  onPress={() => setActiveSection("tabla")}
                >
                  <Text style={styles.text_buttons}>Tabla</Text>
                </Pressable>
              ) : null /* Si no hay tablas, no mostrar el botón de tabla */
            }
            {
              data?.brackets?.stages ? (
                <Pressable
                  style={styles.button_pressable}
                  onPress={() => setActiveSection("brackets")}
                >
                  <Text style={styles.text_buttons}>Playoffs</Text>
                </Pressable>
              ) : null /* Si no hay brackets, no mostrar el botón de playoffs */
            }
            {/* Botones para cambiar la sección */}
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection("equipos")}
            >
              <Text style={styles.text_buttons}>Equipos</Text>
            </Pressable>
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection("fixture")}
            >
              <Text style={styles.text_buttons}>Fixture</Text>
            </Pressable>
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection("estadisticas")}
            >
              <Text style={styles.text_buttons}>Estadisticas</Text>
            </Pressable>
            <Pressable
              style={styles.button_pressable}
              onPress={() => setActiveSection("champions")}
            >
              <Text style={styles.text_buttons}>Campeones</Text>
            </Pressable>
          </View>

          {/* Se renderiza la sección.*/}

          <View style={styles.container_league_table}>
            <Text style={styles.league_name}>{data?.league?.name}</Text>
            {isLoading ? (
              <Text style={styles.container_league_section_text}>
                Cargando...
              </Text>
            ) : error ? (
              <Text style={styles.container_league_section_text}>
                Error al cargar la liga
              </Text>
            ) : (
              renderSection()
            )}
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
    alignItems: "center",
  },
  container_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    width: screenWidth * 0.9,

    marginBottom: 40,
    gap: 10,
  },
  container_league_all_tables: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text_buttons: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  button_pressable: {
    width: screenWidth * 0.25,
    height: screenHeight * 0.08,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  table_name_text: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    paddingVertical: 10,
  },
  container_league_table: {
    flex: 1,
    width: screenWidth * 0.95,
  },
  league_name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  container_league_section_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  league_notfound: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  league_notfound_text: {
    fontSize: 26,
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    fontWeight: "bold",
  },
});
