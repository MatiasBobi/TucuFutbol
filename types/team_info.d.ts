interface TeamColors {
  color: string;
  text_color: string;
}

export interface Competitor {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
  allow_open: boolean;
  colors: TeamColors;
}

interface MainLeague {
  name: string;
  id: string;
  url_name: string;
  country_id: string;
  show_country_flags: boolean;
  allow_open: boolean;
}

interface SquadColumn {
  name: string;
  key: string;
}

interface EntityObject {
  num: string;
  name: string;
  sname: string;
  position: string;
  formation_position: string;
  age: string;
  height: string;
  weight: string;
  country_id: string;
  birthdate: string;
  is_staff: boolean;
}

interface SquadValue {
  key: string;
  value: string;
}

interface SquadRow {
  values: SquadValue[];
  entity: {
    type: number;
    object: EntityObject;
  };
}

interface GameTeam {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
  allow_open: boolean;
  colors: TeamColors;
  red_cards: number;
}

interface GameStatus {
  enum: number;
  name: string;
  short_name: string;
  symbol_name: string;
}

interface GameData {
  id: string;
  stage_round_name: string;
  winner: number;
  teams: GameTeam[];
  url_name: string;
  status: GameStatus;
  start_time: string;
  game_time: number;
  game_time_to_display: string;
  game_time_status_to_display: string;
  scores?: number[]; // solo en games.last
}

interface GameEntityObject {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
  allow_open: boolean;
  colors: TeamColors;
  red_cards: number;
}

interface GameEntity {
  type: number;
  object: GameEntityObject;
}

 export interface GameRow {
  num: number;
  values: {
    key: string;
    value: string;
  }[];
  entity: GameEntity;
  game: GameData;
  result_status?: number; // solo en games.last
}

interface GameColumn {
  name: string;
  key: string;
}

export 	interface GameTable {
  name: string;
  columns: GameColumn[];
  rows: GameRow[];
}

export interface GamesData {
  preview_rows_num: number;
  next: GameTable;
  last: GameTable;
}

export interface SquadGroup {
  name: string;
  rows: SquadRow[];
}

export interface SquadData {
  columns: SquadColumn[];
  groups: SquadGroup[];
}

interface StatsTableColumn {
  key: string;
  title: string;
  type: number;
  is_bold: boolean;
}

interface StatsEntity {
  type: number;
  object: {
    name: string;
    short_name: string;
    country_id: string;
    team_id: string;
  };
}

interface StatsRow {
  num: number;
  entity: StatsEntity;
  values: {
    key: string;
    value: string;
  }[];
}

interface StatsTable {
  name: string;
  columns: StatsTableColumn[];
  rows: StatsRow[];
}

interface StatsFilter {
  name: string;
  key: string;
  selected?: boolean;
  tables: StatsTable[];
}

interface TeamInfoItem {
  name: string;
  value: string;
}

interface StadiumInfoItem {
  name: string;
  value: string;
}

interface Stadium {
  coordinates: string;
  name: string;
  info: StadiumInfoItem[];
}

export interface TeamData {
  TTL: number;
  competitor: Competitor;
  main_league: MainLeague;
  squad: SquadData;
  games: GamesData;
  stats: {
    preview_rows_num: number;
    filters: StatsFilter[];
  };
  team_info: TeamInfoItem[];
  stadium: Stadium;
}
