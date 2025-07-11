import { Colors } from '@/constants/colors/colors';
import { PlayerStatistic } from '@/types/league_full_info';
import { useMappingHelper } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function StatsTable({
  rows_table,
  table_name,
}: {
  rows_table: PlayerStatistic[]; // Tabla ligas
  table_name: string;
}) {
  const { getMappingKey } = useMappingHelper();
  return (
    <View style={styles.container}>
      <View style={styles.table_name_container}>
        <Text style={styles.table_name_text}>{table_name}</Text>
      </View>
      {rows_table.map((row, index) => (
        <View
          key={getMappingKey(
            row?.entity?.object?.name || `player_${index}`,
            index,
          )}
          style={[
            styles.item_player_container,
            index % 2 === 0 ? styles.rowPar : styles.rowImpar,
          ]}
        >
          <View style={styles.player_name_container}>
            <Image
              source={{
                uri: `https://api.promiedos.com.ar/images/team/${row?.entity?.object?.team_id}/4`,
              }}
              style={{ width: 25, height: 25 }}
              contentFit="contain"
            />
            <Text style={styles.player_name_text}>
              {row?.entity?.object?.name}
            </Text>
          </View>
          <View style={styles.player_value_container}>
            <Text style={styles.player_value_text}>
              {row?.values?.[0].value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  table_name_container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: Colors.LIGHT_BLACK,
    paddingVertical: 10,
  },
  rowPar: {
    backgroundColor: Colors.BLUE_BORDER,
  },
  rowImpar: {
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  player_name_container: {
    flex: 0.9,
    minWidth: width * 0.4,
    minHeight: height * 0.05,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    gap: 20,
  },
  player_value_container: {
    flex: 0.1,
    minWidth: width * 0.05,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.YELLOW_LIGHT,
  },
  table_name_text: {
    fontSize: 24,
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
  item_player_container: {
    flexDirection: 'row',
    width: '100%',
  },
  player_name_text: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.YELLOW_LIGHT,
  },
  player_value_text: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.WHITE_GRAY,
  },
});
