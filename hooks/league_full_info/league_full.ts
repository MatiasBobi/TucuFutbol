import getLeagueFullInfo from '@/services/league_full_info/league_full';
import { useQuery } from '@tanstack/react-query';
import { LeagueFullInfo } from '../../types/league_full_info';

const useLeagueFullInfo = (league_id: string) => {
  // Hook para obtener la informacion de una liga.
  // No realiza un refetching ya que solo muestra la informacion de una liga.
  const { data, isLoading, error } = useQuery<LeagueFullInfo>({
    queryKey: ['league_full_info', league_id],
    queryFn: () => getLeagueFullInfo(league_id),
  });
  return { data, isLoading, error };
};

export default useLeagueFullInfo;
