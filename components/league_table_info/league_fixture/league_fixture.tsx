import { Colors } from '@/constants/colors/colors';
import useLeagueFixture from '@/hooks/league_fixture/league_fixture';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Game, GameFilter } from '../../../types/league_full_info';
const { height } = Dimensions.get('window');

export default function LeagueFixture({
  league_fixture,
  league_id,
}: {
  league_fixture: GameFilter[];
  league_id: string;
}) {
  const insets = useSafeAreaInsets(); // Arreglos de margenes

  /* Extraer la fecha a mostrar por default (La que se esta jugando ahora mismo), se consulta por selected === true. */
  const fixtureIdNow = league_fixture.find(
    (idFixture) => idFixture.selected === true,
  );

  const [fixturekey, setFixtureKey] = useState(' ');

  const { data, isLoading, error } = useLeagueFixture(fixturekey, league_id); // Extraer la fecha consultada.

  const keyStractorFixtureTable = useCallback((item: Game) => `${item.id}`, []); // Extraer key para el flatlist

  /* Renderizado unico de cada enfretamiento,  */
  const renderItem = useCallback(({ item }: { item: Game }) => {
    const matchid = item.id;
    return (
      <Link
        href={{
          pathname: '/match_info/[match]',
          params: { match: matchid },
        }}
        asChild
      >
        <Pressable style={styles.item_container}>
          <View style={styles.result_container}>
            <Text style={styles.time_match_text}>
              {item?.status?.enum === 3
                ? item?.status?.short_name === 'Final'
                  ? 'Final'
                  : item?.status?.symbol_name + ' (Final)'
                : item?.status?.short_name === 'ET'
                ? 'ET'
                : item?.status?.enum === 1
                ? `${item?.start_time?.split(' ')[0].split('-')[0]}/${
                    item?.start_time?.split(' ')[0].split('-')[1]
                  } ${item?.start_time?.split(' ')[1]}`
                : item?.game_time_status_to_display === '-1'
                ? 'ERROR'
                : item?.game_time_status_to_display}
            </Text>
          </View>
          <View style={styles.infoGame_container}>
            <View style={styles.team_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${item?.teams?.[0]?.id}/4`}
                style={[styles.teamImage, { marginLeft: 8 }]}
                contentFit="contain"
              />
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {item?.teams?.[0]?.short_name}
              </Text>
            </View>
            <View style={styles.score_container}>
              {item?.penalties ? (
                <Text style={styles.scoreText}>
                  {'('}
                  {item?.penalties?.[0]}
                  {') '}
                  {item?.scores?.[0]} - {item?.scores?.[1]}
                  {' ('}
                  {item?.penalties?.[1]}
                  {')'}
                </Text>
              ) : (
                <Text style={styles.scoreText}>
                  {item?.scores?.[0]} - {item?.scores?.[1]}
                </Text>
              )}
            </View>
            <View style={styles.team_container}>
              <Image
                source={`https://api.promiedos.com.ar/images/team/${item?.teams?.[1]?.id}/4`}
                style={[styles.teamImage, { marginRight: 8 }]}
                contentFit="contain"
              />
              <Text
                style={styles.teamText}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {item?.teams?.[1]?.short_name}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.picker_container}>
        <Picker
          selectedValue={fixturekey}
          onValueChange={(itemValue, itemIndex) => setFixtureKey(itemValue)}
          dropdownIconColor={Colors.WHITE_GRAY}
          dropdownIconRippleColor={Colors.DARK_BLUE}
        >
          <Picker.Item
            style={styles.picker_item}
            label={`Fecha disputándose: ${
              fixtureIdNow?.name ? fixtureIdNow?.name : 'Seleccionar fecha'
            }`}
            value={fixtureIdNow?.key}
          />
          {league_fixture.map((fixture) => {
            return (
              <Picker.Item
                key={fixture.key}
                label={`${fixture.name}`}
                value={`${fixture.key}`}
                style={styles.picker_item}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.table_container}>
        {error ? (
          <View style={styles.DataNotFound_container}>
            <Text style={styles.DataNotFound_text}>
              ERROR: No se pudo realizar el fetching.
            </Text>
          </View>
        ) : isLoading ? (
          <View style={styles.DataNotFound_container}>
            <Text style={styles.DataNotFound_text}>Cargando fecha...</Text>
          </View>
        ) : (data?.games.length === 0 && fixtureIdNow === undefined) ||
          (fixtureIdNow === undefined && data === undefined) ? (
          <View style={styles.DataNotFound_container}>
            <Text style={styles.DataNotFound_text}>
              No hay data, seleccione otra fecha.
            </Text>
          </View>
        ) : (
          <FlatList
            data={
              (fixturekey === ' '
                ? (fixtureIdNow?.games as Game[] | undefined)
                : (data?.games as Game[] | undefined)) ?? []
            }
            renderItem={renderItem}
            keyExtractor={keyStractorFixtureTable}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_BLUE_DARK,
  },
  picker_container: {
    width: '100%',
    backgroundColor: Colors.SLAT_BLUE,
    color: Colors.YELLOW_LIGHT,
  },
  picker_item: {
    color: Colors.YELLOW_LIGHT,
    backgroundColor: Colors.SLAT_BLUE,
  },
  table_container: {
    flexDirection: 'row',
    width: '95%',
    marginBottom: 100,
  },
  item_container: {
    marginVertical: 8,
    minHeight: height * 0.12,
    borderRadius: 8,
    backgroundColor: Colors.DARK_BLUE_HIDDEN_ROWS,
    padding: 8,
  },
  result_container: {
    alignItems: 'center',
    flex: 0.3,
  },
  infoGame_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 4,
  },
  team_container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  teamImage: {
    width: 30,
    height: 30,
  },
  teamText: {
    fontSize: 16,
    color: Colors.WHITE_GRAY,
    textAlign: 'center',
  },

  score_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.YELLOW_LIGHT,
  },

  time_match_text: {
    color: Colors.YELLOW_LIGHT,
    fontSize: 18,
  },
  DataNotFound_container: {
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    marginTop: 10,
  },
  DataNotFound_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.YELLOW_LIGHT,
    textAlign: 'center',
  },
});
