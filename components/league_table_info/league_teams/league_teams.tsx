import { TeamWithImage } from '@/hooks/getImagesTeam/useTeamsWithImages';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TeamLink } from './team/team_link';

const { width, height } = Dimensions.get('window'); // Dimensiones del dispositivo.

export const LeagueTeams = ({
  teamImages,
}: {
  teamImages: Map<string, TeamWithImage>; // Se utiliza un mapeo que contiene [string, teamWithImage], esto viene del Hook que trae los equipos mapeados.
}) => {
  const equipos: TeamWithImage[] = Array.from(teamImages.values());

  // Render de cada equipo.
  const renderItem = ({ item }: { item: TeamWithImage }) => (
    <View style={styles.team_info}>
      <TeamLink id={item.id} team_name={item.name} image_url={item.imageUrl} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={equipos}
        keyExtractor={(equipo) => equipo.id}
        numColumns={2}
        estimatedItemSize={height * 0.15}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  team_info: {
    width: width * 0.5,
    height: height * 0.15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LeagueTeams;
