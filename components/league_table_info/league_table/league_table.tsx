import { Colors } from '@/constants/colors/colors';
import { LeagueTable } from '@/types/league_full_info';
import { useMappingHelper } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window').width;

export default function LeagueTableData({ table }: { table: LeagueTable }) {
  const { getMappingKey } = useMappingHelper();
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

  // Render del componente
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View style={styles.table_info_pos_container}>
          <Text>#</Text>
          <Text>Club</Text>
        </View>
        <View style={styles.table_info_stats_container}>
          <Text>PTS</Text>
          <Text>J</Text>
          <Text>G</Text>
          <Text>+/-</Text>
          <Text>Gol</Text>
          <Text>E</Text>
          <Text>P</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: Colors.YELLOW_LIGHT,
    borderRadius: 10,
  },
  header_container: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  table_info_pos_container: {
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    flex: 1,
  },
  table_info_stats_container: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    flex: 1,
  },
});
