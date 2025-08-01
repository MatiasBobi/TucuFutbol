import { SquadData, SquadGroup } from '@/types/team_info';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SquadTable from './squad_table/squad_table';

export default function SquadTeam({ squad }: { squad: SquadData }) {
  const keyStractorFn = useCallback((item: SquadGroup, index: number) => {
    return `${item.name}_${index}`;
  }, []);

  const renderItem = useCallback(({ item }: { item: SquadGroup }) => {
    return <SquadTable squad={item} />;
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Jugadores</Text>
        </View>
        <View>
          <Text>Edad</Text>
        </View>
        <View>
          <Text>Nacimiento</Text>
        </View>
        <View>
          <Text>Altura</Text>
        </View>
      </View>
      <FlatList
        data={squad?.groups}
        keyExtractor={keyStractorFn}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
});
