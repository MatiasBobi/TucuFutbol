import getToday from '@/services/today_data/today';
import { useQuery } from '@tanstack/react-query';

export default function useToday() {
  // Hook para obtener los datos de hoy.
  // RefetchInterval es para actualizar los datos cada 15 segundos.
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['today'],
    queryFn: () => getToday(),
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
  return { data, isLoading, error, isFetching };
}
