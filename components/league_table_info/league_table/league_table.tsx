import { Colors } from '@/constants/colors/colors';
import { TeamWithImage } from '@/hooks/getImagesTeam/useTeamsWithImages';
import { LeagueTable, TableRow } from '@/types/league_full_info';
import { FlashList } from '@shopify/flash-list';
import React, { useMemo } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export const LeagueTableData = React.memo(function LeagueTableData({
  table,
  teamImages,
}: {
  table: LeagueTable;
  teamImages?: Map<string, TeamWithImage>;
}) {
  // Colores de las columnas
  const valueColors = [
    '#FFD700',
    '#FFFFFF',
    '#00CED1',
    '#87CEFA',
    '#32CD32',
    '#FFA500',
    '#FF4C4C',
    '#FFA500',
    '#FF4C4C',
    '#FFA500',
    '#FF4C4C',
  ];

  // Filtrar y ordenar las columnas (excluyendo "Últimas")
  const filteredColumns = useMemo(
    () => table.columns.filter((column) => column.title !== 'Últimas'),
    [table.columns],
  );
  const orderedColumnKeys = useMemo(
    () => filteredColumns.map((col) => col.key),
    [filteredColumns],
  );

  // Preprocesar las filas: cada una tendrá un array "orderedValues" en el orden de columns
  const processedRows = useMemo(() => {
    return table.rows.map((row) => {
      // Crear un diccionario para acceso rápido
      const valuesMap: Record<string, string> = {};
      row.values.forEach((v) => {
        valuesMap[v.key] = v.value;
      });
      // Armar el array ordenado
      const orderedValues = orderedColumnKeys.map(
        (key) => valuesMap[key] ?? '-',
      );
      return { ...row, orderedValues };
    });
  }, [table.rows, orderedColumnKeys]);

  // Renderizar cada fila
  const renderRow = ({
    item: row,
    index,
  }: {
    item: TableRow & { orderedValues: string[] };
    index: number;
  }) => {
    const backgroundColorStyle =
      index % 2 === 0
        ? styles.short_name_container_bg1
        : styles.short_name_container_bg2;

    return (
      <View key={row.entity.object.id} style={styles.table_body_rows_container}>
        <View style={styles.table_body_rows_container_left}>
          <View style={styles.pos_container}>
            <Text style={styles.pos_text}>{row.num}</Text>
          </View>
          <View style={[styles.short_name_container, backgroundColorStyle]}>
            <Image
              source={{
                uri: teamImages?.get(row.entity.object.id)?.imageUrl,
              }}
              style={{ width: 20, height: 20, marginRight: 5 }}
              resizeMode="center"
            />
            <Text
              style={styles.short_name_text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {row.entity.object.short_name}
            </Text>
          </View>
        </View>
        <View style={styles.table_body_rows_container_right}>
          {row.orderedValues.map((value, valueIndex) => (
            <Text
              key={valueIndex}
              style={[
                styles.table_body_rows_text_right,
                { color: valueColors[valueIndex] },
              ]}
            >
              {value}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  // Render del componente
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.table_header_columns}>
            <View style={styles.table_header_columns_left}>
              <View style={styles.pos_container_header}>
                <Text style={styles.table_header_columns_text}>Pos</Text>
              </View>
              <View style={styles.short_name_container_header}>
                <Text style={[styles.table_header_columns_text]}>Equipos</Text>
              </View>
            </View>
            <View style={styles.table_header_columns_right}>
              {filteredColumns.map((column, index) => (
                <Text
                  style={[
                    styles.table_header_columns_text,
                    { color: valueColors[index] },
                  ]}
                  key={column.key}
                >
                  {column.title}
                </Text>
              ))}
            </View>
          </View>
          <View>
            {/* Filas */}
            <FlashList
              data={processedRows}
              keyExtractor={(row) => row.entity.object.id}
              renderItem={renderRow}
              estimatedItemSize={1}
              ListEmptyComponent={() => (
                <Text style={{ color: Colors.WHITE_GRAY, textAlign: 'center' }}>
                  No hay datos disponibles
                </Text>
              )}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: screenWidth * 0.9,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    borderRadius: 10,
  },
  table_header_columns: {
    flexDirection: 'row',
  },
  table_header_columns_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  table_header_columns_left: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  table_header_columns_right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table_body_rows_container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table_body_rows_container_left: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  table_body_rows_container_right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table_body_rows_text_right: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
  },
  pos_container_header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  short_name_container_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pos_container: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pos_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  short_name_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  short_name_container_bg1: {
    backgroundColor: Colors.BLUE_BORDER,
  },
  short_name_container_bg2: {
    backgroundColor: Colors.DARK_BLUE,
  },
  short_name_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE_GRAY,
    textAlign: 'left',
    width: 120,
  },
});
