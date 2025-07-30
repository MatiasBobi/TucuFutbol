import { BracketStage, TableGroup } from '@/types/league_full_info';

export const useGetTeams = (
  table_groups?: TableGroup[],
  brackets?: BracketStage[],
  typeInfo?: 'table' | 'brackets',
) => {
  interface teams_types {
    id: string;
    name: string;
    short_name: string;
    url_name: string | undefined;
  }
  let allTeams: teams_types[] = [];
  if (typeInfo === 'table') {
    allTeams =
      table_groups?.[0]?.tables?.flatMap((rows) =>
        rows.table.rows.map((team) => ({
          id: team.entity.object.id,
          name: team.entity.object.name,
          short_name: team.entity.object.short_name,
          url_name: team.entity.object.url_name,
        })),
      ) ?? [];
    return allTeams;
  } else {
    allTeams =
      brackets?.[0].groups?.flatMap((teams) =>
        teams.participants.map((team) => ({
          id: team.id.toString(),
          name: team.name,
          short_name: team.short_name,
          url_name: team.url_name,
        })),
      ) ?? [];

    return allTeams;
  }
};
