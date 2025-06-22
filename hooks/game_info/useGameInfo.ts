import getGameInfo from '@/services/game_info/game';
import { GameInfo } from '@/types/game_info';
import { useQuery } from '@tanstack/react-query';

export default function useGameInfo(
  id: string,
  isExpanded: boolean,
  matchStatus: 'pre' | 'live' | 'finished',
) {
  const { data, isLoading, error, isFetching, refetch } = useQuery<GameInfo>({
    queryKey: ['game_info', id],
    queryFn: () => getGameInfo(id),
    staleTime: matchStatus === 'finished' ? Infinity : 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: isExpanded && matchStatus === 'live' ? 60000 : undefined,
    enabled: isExpanded && matchStatus !== 'pre',
    refetchOnWindowFocus: isExpanded && matchStatus === 'live',
  });
  return { data, isLoading, error, isFetching, refetch };
}
