import { getFixtureLeague } from '@/services/league_fixture/league_fixture';
import { GameData } from '@/types/league_full_info';
import { useQuery } from '@tanstack/react-query';

const useLeagueFixture = (fecha_id: string, league_id: string) => {
  // Hook para obtener la informacion de una liga.
  // No realiza un refetching ya que solo muestra la informacion de una liga.
  const { data, isLoading, error } = useQuery<GameData>({
    queryKey: ['league_fixture_id', fecha_id],
    queryFn: () => getFixtureLeague(fecha_id, league_id),
    enabled: fecha_id.trim() !== '',
  });
  return { data, isLoading, error };
};

export default useLeagueFixture;
