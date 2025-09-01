import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import useLeagueChampions from "@/hooks/league_champions/LeagueChampions";
import { HistoryRow, RankingRow } from "@/types/champions_table";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  Dimensions,
  Pressable,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Section {
  title: string;
  data: HistoryRow[] | RankingRow[];
}

//Render de la tabla de los campeones.
const RenderChampions = React.memo(
  ({
    item,
    index,
    league_id_search,
    OnPressFn,
  }: {
    item: HistoryRow;
    index: number;
    league_id_search: string;
    OnPressFn: (trigger: number, id: string, league_id: string) => void;
  }) => {
    const valueSplit = React.useMemo(
      () => item.values?.[0].value.split(" ")[0] || item.values?.[0].value,
      [item.values]
    ); // Mostrar la fecha nada mas.

    const indexColor =
      index % 2 === 0 ? Colors.LIGHT_BLUE_DARK : Colors.DARK_BLUE_HIDDEN_ROWS; // Colores intercalados

    let idTrigger =
      item.trigger_type === 1
        ? item?.game?.id
        : item?.trigger_type === 2
        ? item?.season_id
        : "";

    return (
      <View
        style={[styles.champions_container, { backgroundColor: indexColor }]}
      >
        <View style={[styles.restValue_container, { flex: 0.3 }]}>
          <Text style={styles.render_item_champion_text}>{valueSplit}</Text>
        </View>
        <View style={[styles.team_container, { flex: 0.5 }]}>
          <Image
            source={{
              uri: `https://api.promiedos.com.ar/images/team/${item.entity?.object.id}/4`,
            }}
            contentFit="contain"
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <Text style={styles.render_item_champion_text}>
            {item.entity?.object.name}
          </Text>
        </View>
        <View style={[styles.restValue_container, { flex: 0.2 }]}>
          <Pressable
            onPress={() =>
              OnPressFn(
                item.trigger_type || 0,
                idTrigger || "",
                league_id_search
              )
            }
          >
            <Text style={styles.render_item_champion_text}>
              {item.trigger_type === 2
                ? "Ver"
                : item.trigger_type === 1
                ? "Final"
                : null}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
);

RenderChampions.displayName = "RenderChampions";

const RenderRankings = React.memo(
  ({ item, index }: { item: RankingRow; index: number }) => {
    const indexColor =
      index % 2 === 0 ? Colors.LIGHT_BLUE_DARK : Colors.DARK_BLUE_HIDDEN_ROWS;
    return (
      <View
        style={[styles.champions_container, { backgroundColor: indexColor }]}
      >
        <View style={[styles.team_container, { flex: 0.8 }]}>
          <Image
            source={{
              uri: `https://api.promiedos.com.ar/images/team/${item.entity?.object.id}/4`,
            }}
            contentFit="contain"
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <Text style={styles.render_item_champion_text}>
            {item.entity?.object.name}
          </Text>
        </View>
        <View style={[styles.restValue_container, { flex: 0.2 }]}>
          <Text style={[styles.render_item_champion_text, { fontSize: 20 }]}>
            {item.values?.[0].value}
          </Text>
        </View>
      </View>
    );
  }
);

RenderRankings.displayName = "RenderRankings";

const LeagueChampions = ({ league_id }: { league_id: string }) => {
  const { data, isLoading, error, isFetching } = useLeagueChampions(league_id);

  const router = useRouter();
  // Funcion para manejar que tipo de informacion se va a mostrar cuando se pulse el boton. (Funcion que se pasa por parametro)
  const handleTriggerSeason = useCallback(
    (trigger: number, id: string, league_id: string) => {
      if (trigger === 1) {
        router.push({
          pathname: "/match_info/[match]",
          params: {
            match: id,
          },
        });
      } else if (trigger === 2) {
        router.push({
          pathname: "/modal_table/[season_id]",
          params: {
            league_id: league_id,
            season_id: id,
          },
        });
      }
    },
    []
  );

  // El sectiondata memorizado para no hacer render innecesarios
  const sectionData: Section[] = React.useMemo(
    () => [
      {
        title: "Campeones",
        data: data?.history?.rows || [],
      },
      {
        title: "Ranking",
        data: data?.ranking_tables?.[0]?.rows || [],
      },
    ],
    [data?.history?.rows, data?.ranking_tables]
  );

  // Este es el render del item, aca se discrimina a que tabla ira cada uno.
  const RenderItem = React.useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: HistoryRow | RankingRow;
      index: number;
      section: Section;
    }) => {
      if (section.title === "Campeones") {
        return (
          <RenderChampions
            item={item as HistoryRow}
            index={index}
            league_id_search={league_id}
            OnPressFn={handleTriggerSeason}
          />
        );
      } else {
        return <RenderRankings item={item as RankingRow} index={index} />;
      }
    },
    []
  );

  // Render del header con su titulo y columnas correspondientes.
  const RenderHeader = React.useCallback(
    ({ section }: { section: SectionListData<HistoryRow, Section> }) => {
      if (section.title === "Campeones") {
        return (
          <View style={styles.sectionHeader_container}>
            <View style={styles.header_title_container}>
              <Text style={styles.header_text}>{section.title}</Text>
            </View>
            <View style={styles.header_column_container}>
              <View
                style={[styles.header_column_text_container, { flex: 0.3 }]}
              >
                <Text style={styles.header_column_text}>Año</Text>
              </View>
              <View
                style={[styles.header_column_text_container, { flex: 0.5 }]}
              >
                <Text style={styles.header_column_text}>Equipo</Text>
              </View>
              <View
                style={[styles.header_column_text_container, { flex: 0.2 }]}
              >
                <Text style={styles.header_column_text}>Ver</Text>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.sectionHeader_container}>
            <View style={styles.header_title_container}>
              <Text style={styles.header_text}>{section.title}</Text>
            </View>
            <View style={styles.header_column_container}>
              <View
                style={[styles.header_column_text_container, { flex: 0.8 }]}
              >
                <Text style={styles.header_column_text}>Equipo</Text>
              </View>
              <View
                style={[styles.header_column_text_container, { flex: 0.2 }]}
              >
                <Text style={styles.header_column_text}>Titulos</Text>
              </View>
            </View>
          </View>
        );
      }
    },
    []
  );

  // Funcion para extraer el key.
  const keyExtractor = React.useCallback(
    (item: HistoryRow, index: number) => `${item.entity?.object?.id}_${index}`,
    []
  );

  if (isLoading || isFetching) {
    return (
      <View style={styles.nodata_container}>
        <Text style={styles.text_nodata}>Cargando campeones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.nodata_container}>
        <Text style={styles.text_nodata}>Error al cargar los campeones</Text>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <SectionList
          sections={sectionData}
          keyExtractor={keyExtractor}
          renderItem={RenderItem}
          renderSectionHeader={RenderHeader}
          style={styles.sectionList}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
          updateCellsBatchingPeriod={50}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  sectionHeader_container: {
    width: "100%",
  },
  sectionList: {
    width: width * 0.95,
  },
  header_text: {
    fontSize: 20,
    color: Colors.WHITE_GRAY,
    textAlign: "center",
  },
  header_title_container: {
    width: width * 1,
    paddingVertical: 15,
  },
  header_column_container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.YELLOW_LIGHT,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  header_column_text_container: {
    paddingVertical: 10,
  },
  header_column_text: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
    fontWeight: "bold",
  },
  champions_container: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.98,
    borderBottomWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
  },
  team_container: {
    minHeight: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  restValue_container: {
    height: height * 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  render_item_champion_text: {
    fontSize: 14,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal_table_containe: {
    position: "absolute",
    width: width * 0.8,
    height: height * 0.9,
  },
  nodata_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text_nodata: {
    fontSize: 24,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default LeagueChampions;
