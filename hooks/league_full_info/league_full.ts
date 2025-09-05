import getLeagueFullInfo from '@/services/league_full_info/league_full';
import { useQuery } from '@tanstack/react-query';
import { LeagueFullInfo } from '../../types/league_full_info';

const useLeagueFullInfo = (league_id: string) => {
  // Hook para obtener la informacion de una liga.
  // Realiza refetching cada 15 segundos para mantener los datos actualizados.
  const { data, isLoading, error, isFetching } = useQuery<LeagueFullInfo>({
    queryKey: ['league_full_info', league_id],
    queryFn: () => getLeagueFullInfo(league_id),
    enabled: league_id.trim() !== '',
    refetchInterval: 15000,
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    staleTime: 0, 
    gcTime: 0, 
  });
  return { data, isLoading, error, isFetching };
};

export default useLeagueFullInfo;
