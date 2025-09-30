import { getTeamInfo } from '@/services/team_info/team_info';
import { TeamData } from '@/types/team_info';
import { useQuery } from '@tanstack/react-query';

// Hook para obtener la información de un equipo.
const useTeamInfo = (team_id: string) => {
  const { data, isLoading, error, isFetching } = useQuery<TeamData>({
    queryKey: ['TeamInfo', team_id],
    queryFn: () => getTeamInfo(team_id),
  });
  return { data, isLoading, error, isFetching };
};

export default useTeamInfo;
