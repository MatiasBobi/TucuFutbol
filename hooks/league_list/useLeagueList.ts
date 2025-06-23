import { getLeagueList } from '@/services/league_list/league_list';
import { Category } from '@/types/league_list';
import { useQuery } from '@tanstack/react-query';
export const useLeagueList = () => {
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ['leagueList'],
    queryFn: getLeagueList,
  });
  return { data, isLoading, error };
};
