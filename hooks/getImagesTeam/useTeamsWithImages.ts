import {
  BracketStage,
  Game,
  TableGroup,
  TeamBasicInfo,
} from '@/types/league_full_info';
import { useMemo } from 'react';

export interface TeamWithImage extends TeamBasicInfo {
  imageUrl: string;
}

// Extrae equipos desde tables_groups para el Map global
function extractTeamsFromTableGroups(
  tables_groups: TableGroup[],
): TeamBasicInfo[] {
  const equiposMap = new Map<string, TeamBasicInfo>();
  tables_groups.forEach((group) => {
    group.tables.forEach((tableObj) => {
      tableObj.table.rows.forEach((row) => {
        const equipo = row.entity.object;
        if (!equiposMap.has(equipo.id)) {
          equiposMap.set(equipo.id, equipo);
        }
      });
    });
  });
  return Array.from(equiposMap.values());
}

// Extrae equipos desde brackets para el Map global (solo si no hay tables_groups)
function extractTeamsFromBrackets(brackets: BracketStage[]): TeamBasicInfo[] {
  const equiposMap = new Map<string, TeamBasicInfo>();
  brackets.forEach((stage) => {
    stage.groups.forEach((group) => {
      // Participantes directos
      group.participants?.forEach((equipo) => {
        const idString =
          typeof equipo.id === 'number' ? equipo.id.toString() : equipo.id;
        if (!equiposMap.has(idString)) {
          equiposMap.set(idString, {
            name: equipo.name,
            short_name: equipo.short_name ?? equipo.name,
            id: idString,
          });
        }
      });
    });
  });
  return Array.from(equiposMap.values());
}

// Extrae los equipos que estan en playoffs.
export function useExtractBracketGames(brackets?: BracketStage[]) {
  if (!brackets) return [];
  const games: Game[] = [];
  brackets.forEach((stage) => {
    stage.groups.forEach((group) => {
      group.games?.forEach((game) => {
        games.push(game);
      });
    });
  });
  return games;
}

export function useTeamsWithImages({
  tables_groups,
  brackets,
}: {
  tables_groups?: TableGroup[];
  brackets?: BracketStage[];
}): Map<string, TeamWithImage> {
  return useMemo(() => {
    let equipos: TeamBasicInfo[] = [];

    // Verifica si hay tables_groups con equipos, en caso de que sea TRUE, extrae los equipos de tables_groups.
    if (
      Array.isArray(tables_groups) &&
      tables_groups.length > 0 &&
      tables_groups.some(
        (g) =>
          g.tables.length > 0 && g.tables.some((t) => t.table.rows.length > 0),
      )
    ) {
      equipos = extractTeamsFromTableGroups(tables_groups);
      // Si no hay tables_groups, verifica si hay brackets y extrae los equipos de brackets (Ejemplo: Copa Argentina.).
    } else if (Array.isArray(brackets) && brackets.length > 0) {
      equipos = extractTeamsFromBrackets(brackets);
    }

    // En caso de que no encuentre equipos ni en table_groups ni en brackets, el hook retornara un diccionario vacio.
    if (equipos.length === 0) return new Map<string, TeamWithImage>();

    // Arma el mapeo para ser utilizado.
    const equiposMap = new Map<string, TeamWithImage>();
    equipos.forEach((equipo) => {
      equiposMap.set(equipo.id, {
        ...equipo,
        imageUrl: `https://api.promiedos.com.ar/images/team/${equipo.id}/4`,
      });
    });
    return equiposMap;
  }, [tables_groups, brackets]);
}
