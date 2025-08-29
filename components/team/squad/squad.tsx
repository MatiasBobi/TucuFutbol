import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Colors } from '@/constants/colors/colors';
import { SquadData, SquadGroup } from '@/types/team_info';
import { useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import SquadTable from './squad_table/squad_table';

const { height } = Dimensions.get('window');

export default function SquadTeam({ squad }: { squad: SquadData }) {
  const keyStractorFn = useCallback((item: SquadGroup, index: number) => {
    return `${item.name}_${index}`;
  }, []);

  const renderItem = useCallback(({ item }: { item: SquadGroup }) => {
    return <SquadTable squad={item} />;
  }, []);
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_item_name}>
            <View>
              <Text style={styles.header_item_text}>Jugadores</Text>
            </View>
          </View>
          <View style={styles.header_items}>
            <View style={styles.header_item}>
              <Text style={styles.header_item_text}>Edad</Text>
            </View>
            <View style={styles.header_item}>
              <Text style={styles.header_item_text}>Altura</Text>
            </View>
          </View>
        </View>
        <View style={styles.table_container}>
          <FlatList
            data={squad?.groups}
            keyExtractor={keyStractorFn}
            renderItem={renderItem}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    padding: 16,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.LIGHT_BLACK,
    height: height * 0.05,
  },
  table_container: {
    flex: 1,
  },
  header_items: {
    width: '40%',
    flexDirection: 'row',
  },
  header_item: {
    flex: 1,
    paddingHorizontal: 4,
  },
  header_item_name: {
    width: '60%',
    paddingHorizontal: 4,
  },
  header_item_text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
});
