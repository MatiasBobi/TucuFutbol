import getGameInfo from '@/services/game_info/game';
import { GameInfo } from '@/types/game_info';
import { useQuery } from '@tanstack/react-query';

export default function useGameInfo(
  id: string,
  isExpanded: boolean,
  matchStatus: 'pre' | 'live' | 'finished',
) {
  /* 
  Hook para obtener la informacion de un partido.
  Primero chequea la id que se le manda, si es null, no hace un fetching.
  Segundo controla en que estado esta el partido, si es 'pre' no hace un fetching.
  Tercero controla si el partido esta en vivo, si es true, hace un refetch cada 60 segundos.
  Cuarto controla si el partido esta en vivo, si es true, hace un refetch cuando se vuelve a expandir el partido.
  Quinto controla el tiempo de cache, si el partido esta finalizado, no hace un refetch.

  en caso de que el partido este finaliado, solo hace la consulta una sola vez.
  */
  const { data, isLoading, error, isFetching } = useQuery<GameInfo>({
    queryKey: ['game_info', id],
    queryFn: () => getGameInfo(id),
    staleTime: matchStatus === 'finished' ? Infinity : 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: isExpanded && matchStatus === 'live' ? 60000 : undefined,
    enabled: isExpanded && matchStatus !== 'pre',
    refetchOnWindowFocus: isExpanded && matchStatus === 'live',
  });
  return { data, isLoading, error, isFetching };
}
