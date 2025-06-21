import getToday from '@/services/today';
import { useQuery } from '@tanstack/react-query';

export default function useToday() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['today'],
    queryFn: () => getToday(),
    refetchInterval: 30000,
  });
  return { data, isLoading, error };
}
