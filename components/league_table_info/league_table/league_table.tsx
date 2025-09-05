import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Colors } from "@/constants/colors/colors";
import { LeagueTable, TableRow } from "@/types/league_full_info";
import { Image } from "expo-image";
import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function LeagueTableData({
  table,
  table_name,
}: {
  table: LeagueTable;
  table_name?: string;
}) {
  ///////////////////////// RENDER INDIVIDUAL X CADA EQUIPO /////////////////////////////
  const RenderItemTable = React.memo(function RenderItemTable({
    item,
    columns,
  }: {
    item: TableRow;
    columns: typeof table.columns;
  }) {
    const [expand, setExpand] = useState(false);
    const expandHandler = useCallback(() => setExpand(!expand), [expand]); // Controlar el expandible de las estadisticas restantes.
    const visibleRows = item?.values?.slice(0, 4); // Las 4 principales estadisticas.
    const hiddenRows = item?.values?.slice(4); // Las estadisticas ocultas.

    return (
      <Pressable onPress={expandHandler}>
        <View
          style={[
            styles.table_item_container,
            item.num % 2 === 0
              ? { backgroundColor: Colors.LIGHT_BLUE_DARK }
              : { backgroundColor: Colors.DARK_BLUE_PLAYOFFS },
          ]}
        >
          <View style={styles.table_item_left_container}>
            <View
              style={[
                styles.position_row_team_container,
                item.destination_color
                  ? { backgroundColor: item?.destination_color }
                  : null,
              ]}
            >
              <Text style={styles.position_text}>{item.num}</Text>
            </View>
            <View style={styles.image_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${item?.entity?.object?.id}/4`}
                contentFit="contain"
                style={{ width: 20, height: 20 }}
                transition={1000}
              />
              <View style={styles.name_team_container_row}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.name_team_text}
                >
                  {item.entity.object.short_name}
                </Text>
              </View>
            </View>
          </View>
          {/* Se renderiza las primeras 4 estadisticas del equipo, el resto estan en el expandible. */}
          <View style={styles.table_item_right_container}>
            {columns?.slice(0, 4).map((column) => {
              const team = visibleRows.find(
                (value) => value.key === column.key
              ); // Acomodamos para que la key de visiblerows coincida con las de las columnas que vienen desordenadas.
              const value = team?.value ?? "-";
              if (column?.key === "GamesWon" && column?.title !== "G")
                return null;

              return (
                <View
                  key={column?.key}
                  style={[
                    styles.right_item,
                    column?.key === "Pct" ? { flex: 1.25 } : { flex: 1 },
                  ]}
                >
                  {column?.key === "Goals" && value !== "-" ? (
                    <View style={styles.goalsContainer}>
                      <Text
                        style={[
                          styles.right_text_stats,
                          styles.goalsText,
                          { color: "green" },
                        ]}
                      >
                        {/* Goles a favor */}
                        {typeof value === "string" ? value.split(":")[0] : "-"}
                      </Text>
                      <Text
                        style={[
                          styles.right_text_stats,
                          styles.goalsText,
                          { color: "red" },
                        ]}
                      >
                        {/* Goles en contra */}
                        {typeof value === "string" ? value.split(":")[1] : "-"}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.right_text_stats}>{value}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        {expand && (
          <View style={styles.hidden_container}>
            <View style={styles.hidden_columns_container}>
              {columns.slice(4, columns.length).map((column, index) => {
                // {trend} representa los ultimos 5 partidos jugados.
                if (column.key === "{trend}") {
                  return (
                    <View
                      key={`${column.key}_${index}`}
                      style={styles.hidden_info_text_trend_container}
                    >
                      <Text
                        style={[
                          styles.itemValueText,
                          { color: Colors.YELLOW_LIGHT },
                        ]}
                      >
                        {column.title}
                      </Text>
                    </View>
                  );
                }
                return (
                  <View
                    key={`${column.key}_${index}`}
                    style={styles.hidden_info_text_container}
                  >
                    <Text
                      style={[
                        styles.itemValueText,
                        { color: Colors.YELLOW_LIGHT },
                      ]}
                    >
                      {column.title}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.hidden_rows_container}>
              {hiddenRows.map((itemRow, index) => {
                // Nos fijamos si existe {trend} en la columnas y rows que recibimos. Mapeamos los values para poner 'CONDICION;COLOR_CONDICION'
                if (
                  itemRow?.key === "{trend}" &&
                  Array.isArray(itemRow.value)
                ) {
                  const gameValues = itemRow?.value?.map((value, index) => {
                    return value === 0
                      ? "P;#831616"
                      : value === 1
                      ? "V;#16831b"
                      : "E;#373847";
                  });

                  return (
                    <View
                      key={`${itemRow.key}_${index}`}
                      style={styles.hidden_trend_container}
                    >
                      <View
                        style={[
                          styles.lastGameInfo_container,
                          {
                            backgroundColor: `${
                              gameValues?.[0]?.split(";")?.[1]
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.itemValueText}>
                          {gameValues?.[0]?.split(";")?.[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.lastGameInfo_container,
                          {
                            backgroundColor: `${
                              gameValues?.[1]?.split(";")?.[1]
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.itemValueText}>
                          {gameValues?.[1]?.split(";")?.[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.lastGameInfo_container,
                          {
                            backgroundColor: `${
                              gameValues?.[2]?.split(";")?.[1]
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.itemValueText}>
                          {gameValues?.[2]?.split(";")?.[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.lastGameInfo_container,
                          {
                            backgroundColor: `${
                              gameValues?.[3]?.split(";")?.[1]
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.itemValueText}>
                          {gameValues?.[3]?.split(";")?.[0]}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.lastGameInfo_container,
                          {
                            backgroundColor: `${
                              gameValues?.[4]?.split(";")?.[1]
                            }`,
                          },
                        ]}
                      >
                        <Text style={styles.itemValueText}>
                          {gameValues?.[4]?.split(";")?.[0]}
                        </Text>
                      </View>
                    </View>
                  );
                }
                return (
                  <View
                    key={`${itemRow.key}_${index}`}
                    style={styles.hidden_info_text_container}
                  >
                    <Text style={styles.itemValueText}>{itemRow?.value}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </Pressable>
    );
  });

  ///////////////////////// FIN RENDER ITEM DE LA TABLA /////////////////////////////

  // Render del componente principal
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.title_table_container}>
        <Text style={styles.title_table_text}>{table_name}</Text>
      </View>
      <View>
        <View style={styles.header_container}>
          <View style={styles.table_info_pos_container}>
            <View style={styles.position_team_container}>
              <Text style={styles.text_pos}>#</Text>
            </View>
            <View style={styles.name_team_container}>
              <Text style={styles.text_pos}>Club</Text>
            </View>
          </View>
          <View style={styles.table_info_stats_container}>
            {table?.columns?.slice(0, 4)?.map((column, index) => {
              if (column?.key === "GamesWon" && column?.title !== "G")
                return null;
              return (
                <Text
                  key={`${column.key}_${index}`}
                  style={styles.text_header_stats}
                >
                  {column?.title}
                </Text>
              );
            })}
          </View>
        </View>
        <View>
          {table?.rows?.map((item, index) => (
            <View key={`${item.entity.object.id}_${index}`}>
              <RenderItemTable item={item} columns={table.columns} />
            </View>
          ))}
          <View>
            {table?.destinations && (
              <>
                {table.destinations?.map((destination) => {
                  return (
                    <View
                      key={destination?.name}
                      style={styles.destination_container}
                    >
                      <View
                        style={[
                          styles.destination_circle,
                          { backgroundColor: destination?.color },
                        ]}
                      ></View>
                      <Text style={styles.destination_text}>
                        {destination?.name}
                      </Text>
                    </View>
                  );
                })}
              </>
            )}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: width * 0.95,
    maxWidth: width * 1,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    borderRadius: 10,
    marginBottom: 20,
  },
  destination_container: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
  },
  destination_circle: {
    width: 16,
    height: 16,
    borderRadius: 50,
  },
  destination_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: "bold",
  },
  title_table_container: {
    minHeight: height * 0.1,
    maxHeight: height * 0.15,
    alignItems: "center",
  },
  title_table_text: {
    textAlign: "center",
    fontSize: 24,
    color: Colors.YELLOW_GOAL,
  },
  header_container: {
    flexDirection: "row",
    height: height * 0.05,
    alignItems: "center",
    backgroundColor: Colors.LIGHT_BLACK,
  },
  position_team_container: {
    width: width * 0.08,
  },
  name_team_container: {
    flex: 1,
  },
  table_info_pos_container: {
    flexDirection: "row",
    width: "55%",
  },
  table_info_stats_container: {
    flexDirection: "row",
    width: "45%",
  },
  text_header_stats: {
    flex: 1,
    fontSize: 13,
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
  },
  text_pos: {
    fontSize: 18,
    color: Colors.YELLOW_LIGHT,
    textAlign: "center",
  },
  table_item_container: {
    flexDirection: "row",
  },
  table_item_left_container: {
    flexDirection: "row",
    width: "55%",
  },
  table_item_right_container: {
    flexDirection: "row",
    width: "45%",
  },
  right_item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right_text_stats: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.YELLOW_LIGHT,
  },
  goalsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  goalsText: {
    fontSize: 14,
    lineHeight: 18,
  },
  image_container: {
    flex: 1,
    minHeight: height * 0.08,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    gap: 8,
  },
  position_row_team_container: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.08,
  },
  position_text: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.WHITE_GRAY,
  },
  name_team_text: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.WHITE_GRAY,
  },
  name_team_container_row: {
    width: "100%",
  },

  hidden_container: {
    flexDirection: "column",
    backgroundColor: Colors.DARK_BLUE_HIDDEN_ROWS,
  },
  hidden_rows_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.05,
  },
  hidden_columns_container: {
    flexDirection: "row",
    justifyContent: "center",

    alignItems: "center",

    height: height * 0.05,
    flex: 1,
  },
  hidden_trend_container: {
    flexDirection: "row",
    flex: 1.5,
  },
  hidden_info_text_trend_container: {
    flex: 1.5,
  },
  hidden_info_text_container: {
    flex: 1,
  },
  lastGameInfo_container: {
    width: width * 0.05,
    justifyContent: "center",
    marginRight: 1,
    alignItems: "center",
  },
  itemValueText: {
    textAlign: "center",
    color: "#fff",
  },
});
