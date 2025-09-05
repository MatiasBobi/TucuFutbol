import { getFixtureLeague } from '@/services/league_fixture/league_fixture';
import { GameData } from '@/types/league_full_info';
import { useQuery } from '@tanstack/react-query';

const useLeagueFixture = (fecha_id: string, league_id: string) => {
  // Hook para obtener la informacion de una liga.
  // Realiza refetching cada 15 segundos para mantener los datos actualizados.
  const { data, isLoading, error, isFetching } = useQuery<GameData>({
    queryKey: ['league_fixture_id', fecha_id, league_id],
    queryFn: () => getFixtureLeague(fecha_id, league_id),
    enabled: fecha_id.trim() !== '' && league_id.trim() !== '',
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true, // refresca si volvés a la pantalla
    refetchOnMount: true, // refresca siempre que montás
    staleTime: 0,         // nunca considera la data fresca
    gcTime: 0,
  });

  return { data, isLoading, error, isFetching };
};

export default useLeagueFixture;
