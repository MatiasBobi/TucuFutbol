import { getLeagueChampions } from '@/services/league_champions_data/LeagueChampionsData';
import { LeagueChampionsData } from '@/types/champions_table';
import { useQuery } from '@tanstack/react-query';

const useLeagueChampions = (league_id: string) => {
  // Hook para obtener la informacion de los campeones de una liga/copa
  // No realiza un refetching ya que solo muestra la informacion de los campeones.
  const { data, isLoading, error, isFetching } = useQuery<LeagueChampionsData>({
    queryKey: ['league_champions_data', league_id],
    queryFn: () => getLeagueChampions(league_id),
    
  });
  return { data, isLoading, error, isFetching};
};

export default useLeagueChampions;
