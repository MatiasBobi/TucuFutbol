import { Colors } from '@/constants/colors/colors';
import { GamesData } from '@/types/team_info';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FixtureTable from './fixture_table/fixture_table';

export default function FixtureTeam({ fixture }: { fixture: GamesData }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <Text style={styles.table_name_text}>Proximos Partidos</Text>
        </View>
        <FixtureTable fixture_data={fixture?.next} table_type="next" />
        <View>
          <Text style={styles.table_name_text}>Resultados</Text>
        </View>
        <FixtureTable fixture_data={fixture?.last} table_type="last" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    paddingHorizontal: 0,
    width: '100%',
  },
  table_name_text: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.YELLOW_LIGHT,
  },
});
