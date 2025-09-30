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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const { width, height } = Dimensions.get("window");

// Tipo para las secciones del FlatList principal
type SectionItem = {
  type: "header" | "section_content";
  sectionType?:
    | "tabla"
    | "equipos"
    | "estadisticas"
    | "fixture"
    | "brackets"
    | "champions";
};

export default function League() {
  const { league } = useLocalSearchParams();
  const league_id = league as string;

  const { data, isLoading, error } = useLeagueFullInfo(league_id);

  const leagueExists = useMemo(() => {
    if (isLoading) return undefined;
    if (!data) return false;
    const keys = Object.keys(data);
    return keys.length > 1 || (keys.length === 1 && keys[0] !== "TTL");
  }, [data, isLoading]);

  const [activeSection, setActiveSection] = useState<
    "tabla" | "equipos" | "estadisticas" | "fixture" | "brackets" | "champions"
  >("tabla");

  useEffect(() => {
    if (!isLoading && data) {
      if (!data?.tables_groups && data?.brackets?.stages) {
        setActiveSection("brackets");
      } else {
        setActiveSection("tabla");
      }
    }
  }, [data, isLoading]);

  // Datos para el FlatList principal
  const flatListData = useMemo((): SectionItem[] => {
    return [
      { type: "header" },
      { type: "section_content", sectionType: activeSection },
    ];
  }, [activeSection]);

  // Esta parte renderiza cada item del FlatList principal
  const renderFlatListItem = useCallback(
    ({ item }: { item: SectionItem }) => {
      switch (item.type) {
        case "header":
          return (
            <HeaderButtons
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              data={data}
              isLoading={isLoading}
            />
          );

        case "section_content":
          return (
            <SectionContent
              sectionType={item.sectionType}
              data={data}
              league_id={league_id}
            />
          );

        default:
          return null;
      }
    },
    [activeSection, data, league_id]
  );

  // Key extractor
  const keyExtractor = useCallback((item: SectionItem, index: number) => {
    return `${item.type}_${item.sectionType || ""}_${index}`;
  }, []);

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

      {isLoading ? (
        <View style={styles.loading_container}>
          <Text style={styles.loading_text}>
            Cargando información de la liga...
          </Text>
        </View>
      ) : leagueExists === false ? (
        <View style={styles.league_notfound}>
          <Text style={styles.league_notfound_text}>
            La liga solicitada no existe o no está disponible
          </Text>
        </View>
      ) : (
        <FlatList
          data={flatListData}
          renderItem={renderFlatListItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

// Componente para los botones del header (ahora es parte del FlatList)
const HeaderButtons = React.memo(
  ({
    activeSection,
    setActiveSection,
    data,
    isLoading,
  }: {
    activeSection: string;
    setActiveSection: (section: any) => void;
    data: any;
    isLoading: boolean;
  }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.league_name}>{data?.league?.name}</Text>

        {!isLoading && (
          <View style={styles.container_buttons}>
            {data?.tables_groups ? (
              <Pressable
                style={[
                  styles.button_pressable,
                  activeSection === "tabla" && styles.button_active,
                ]}
                onPress={() => setActiveSection("tabla")}
              >
                <Text style={styles.text_buttons}>Tabla</Text>
              </Pressable>
            ) : null}

            {data?.brackets?.stages ? (
              <Pressable
                style={[
                  styles.button_pressable,
                  activeSection === "brackets" && styles.button_active,
                ]}
                onPress={() => setActiveSection("brackets")}
              >
                <Text style={styles.text_buttons}>Playoffs</Text>
              </Pressable>
            ) : null}

            <Pressable
              style={[
                styles.button_pressable,
                activeSection === "equipos" && styles.button_active,
              ]}
              onPress={() => setActiveSection("equipos")}
            >
              <Text style={styles.text_buttons}>Equipos</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button_pressable,
                activeSection === "fixture" && styles.button_active,
              ]}
              onPress={() => setActiveSection("fixture")}
            >
              <Text style={styles.text_buttons}>Fixture</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button_pressable,
                activeSection === "estadisticas" && styles.button_active,
              ]}
              onPress={() => setActiveSection("estadisticas")}
            >
              <Text style={styles.text_buttons}>Estadisticas</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button_pressable,
                activeSection === "champions" && styles.button_active,
              ]}
              onPress={() => setActiveSection("champions")}
            >
              <Text style={styles.text_buttons}>Campeones</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }
);

// Componente para el contenido de cada seccion
const SectionContent = React.memo(
  ({
    sectionType,
    data,
    league_id,
  }: {
    sectionType?: string;
    data: any;
    league_id: string;
  }) => {
    switch (sectionType) {
      case "tabla":
        return <TableSection tables_groups={data?.tables_groups} />;

      case "equipos":
        return <TeamsSection data={data} />;

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
  }
);

// Componente para la seccion de tabla
const TableSection = React.memo(
  ({ tables_groups }: { tables_groups: TableGroup[] }) => {
    if (!tables_groups?.length) return null;

    return (
      <View style={styles.sectionContainer}>
        {tables_groups.map((item, index) => (
          <View key={`${item.name}_${index}`}>
            {item?.tables?.length > 0 && (
              <>
                <Text style={styles.table_name_text}>{item.name}</Text>
                {item.tables.map((table, tableIndex) => (
                  <LeagueTableData
                    key={`${item.name}_${tableIndex}`}
                    table={table.table}
                    table_name={table.name}
                  />
                ))}
              </>
            )}
          </View>
        ))}
      </View>
    );
  }
);

// Componente para la sección de equipos
const TeamsSection = React.memo(({ data }: { data: any }) => {
  if (data?.tables_groups) {
    return <LeagueTeams teams={data.tables_groups} typeInfo="table" />;
  }
  if (data?.brackets?.stages) {
    return <LeagueTeams teams={data.brackets.stages} typeInfo="brackets" />;
  }
  return null;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARK_BLUE,
  },
  headerContainer: {
    backgroundColor: Colors.DARK_BLUE,
    padding: 10,
    alignItems: "center",
  },
  sectionContainer: {
    padding: 10,
  },
  container_buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    marginBottom: 20,
    gap: 10,
  },
  text_buttons: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  button_pressable: {
    minWidth: width * 0.25,
    maxWidth: width * 0.4,
    minHeight: height * 0.08,
    maxHeight: height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  button_active: {
    backgroundColor: Colors.SLAT_BLUE,
  },
  table_name_text: {
    fontSize: RFValue(24),
    color: Colors.WHITE_GRAY,
    textAlign: "center",
    paddingVertical: 10,
  },
  league_name: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    marginBottom: 10,
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DARK_BLUE,
  },
  loading_text: {
    fontSize: RFValue(18),
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    fontWeight: "bold",
  },
  error_text: {
    fontSize: RFValue(16),
    color: "red",
    textAlign: "center",
  },
  league_notfound: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  league_notfound_text: {
    fontSize: RFValue(26),
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
    fontWeight: "bold",
  },
});
