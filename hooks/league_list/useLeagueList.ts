import { getLeagueList } from '@/services/league_list/league_list';
import { Category } from '@/types/league_list';
import { useQuery } from '@tanstack/react-query';
export const useLeagueList = () => {
  // Hook para obtener la lista de ligas.
  // No realiza un refetching ya que solo muestra la lista de las ligas.
  const { data, isLoading, error, isFetching } = useQuery<Category[]>({
    queryKey: ['leagueList'],
    queryFn: getLeagueList,
  });
  return { data, isLoading, error, isFetching };
};
