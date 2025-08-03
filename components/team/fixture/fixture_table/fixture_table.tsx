import { Colors } from '@/constants/colors/colors';
import { GameTable } from '@/types/team_info';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const FixtureTable = ({
  fixture_data,
  table_type,
}: {
  fixture_data: GameTable;
  table_type: 'next' | 'last';
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_teams}>
          <Text style={styles.header_text}>Equipo</Text>
        </View>
        <View style={styles.header_info}>
          <Text style={styles.header_text}>Dia</Text>
          <Text style={styles.header_text}>L/V</Text>
          <Text style={styles.header_text}>
            {table_type === 'next' ? 'Hora' : 'Fin'}
          </Text>
        </View>
      </View>
      <View>
        {(table_type === 'last'
          ? fixture_data?.rows?.slice().reverse()
          : fixture_data?.rows
        )?.map((team, index) => {
          const colorVariant = index % 2;
          return (
            <View
              style={[
                styles.team_container,
                colorVariant === 0
                  ? { backgroundColor: Colors.LIGHT_BLUE_DARK }
                  : { backgroundColor: Colors.DARK_BLUE_PLAYOFFS },
              ]}
              key={`${team.entity.object.id}_${index}`}
            >
              <View style={styles.team_name_container}>
                <Image
                  source={`https://api.promiedos.com.ar/images/team/${team?.entity?.object?.id}/4`}
                  style={styles.teamImage}
                  contentFit="contain"
                />
                <Text style={styles.team_item_text}>
                  {team?.entity?.object?.short_name}
                </Text>
              </View>
              <View style={styles.team_values_container}>
                <Text
                  style={[styles.team_item_text, { color: Colors.GRAY_LIGHT }]}
                >
                  {team?.values?.[0].value}
                </Text>
                <Text
                  style={[styles.team_item_text, { color: Colors.GRAY_LIGHT }]}
                >
                  {team?.values?.[1].value}
                </Text>
                <Text
                  style={[
                    styles.team_item_text,
                    table_type === 'last'
                      ? team?.result_status === 1
                        ? { color: Colors.GREEN_WIN }
                        : team?.result_status === 2
                        ? { color: Colors.RED_CHANGE_PLAYER }
                        : team?.result_status === 3
                        ? { color: Colors.YELLOW_GOAL }
                        : { color: Colors.GRAY_LIGHT }
                      : { color: Colors.GRAY_LIGHT },
                  ]}
                >
                  {team?.values?.[2].value}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginBottom: 10,
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  header: {
    flexDirection: 'row',
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLUE_BORDER,
  },
  header_info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header_teams: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
  },
  team_container: {
    flexDirection: 'row',
    height: height * 0.08,
  },
  team_name_container: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  team_values_container: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  teamImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  team_item_text: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    fontWeight: 'bold',
  },
});

export default FixtureTable;
