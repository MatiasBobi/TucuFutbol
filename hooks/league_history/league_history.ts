import getLeagueHistory from '@/services/league_history/league_history';
import { useQuery } from '@tanstack/react-query';
import { LeagueFullInfo } from '../../types/league_full_info';

const useLeagueHistory = (league_id: string, season_id: string) => {
  // Hook para obtener la informacion de una liga pasada (historia).
  // No realiza un refetching ya que solo muestra la informacion de una liga.
  const { data, isLoading, isFetching, error } = useQuery<LeagueFullInfo>({
    queryKey: ['league_history', league_id],
    queryFn: () => getLeagueHistory(league_id, season_id),
  });
  return { data, isLoading, isFetching, error };
};

export default useLeagueHistory;
