import { Colors } from '@/constants/colors/colors';
import { TeamWithImage } from '@/hooks/getImagesTeam/useTeamsWithImages';
import { TableGroup } from '@/types/league_full_info';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LeagueTableData } from './league_table/league_table';

export const LeagueTableInfo = React.memo(function LeagueTableInfo({
  table,
  teamImages,
}: {
  table: TableGroup;
  teamImages: Map<string, TeamWithImage> | undefined;
}) {
  //console.log(table);
  return (
    <View style={styles.container}>
      <Text style={styles.league_name}>{table.name}</Text>
      {table.tables.map((table, index) => (
        <View key={`${table.name?.trim() || 'no-name'}_${index}`}>
          <Text style={styles.subleague_name}>{table.name}</Text>
          <LeagueTableData table={table.table} teamImages={teamImages} />
        </View>
      ))}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  league_name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
    marginBottom: 20,
  },
  subleague_name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.RED_CHANGE_PLAYER,
    textAlign: 'center',
  },
});
