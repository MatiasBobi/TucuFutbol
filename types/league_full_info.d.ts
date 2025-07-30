interface TeamColors {
  color: string;
  text_color: string;
}

interface TeamBasicInfo {
  name: string;
  short_name: string;
  url_name?: string;
  id: string;
  country_id?: string;
  allow_open?: boolean;
  colors?: TeamColors;
}

interface PlayerBasicInfo {
  num: string;
  name: string;
  sname: string;
  position: string;
  formation_position: string;
  age: string;
  height: string;
  weight: string;
  team_id?: string;
  birthdate: string;
}

interface TableColumn {
  key: string;
  title: string;
  type: number;
  is_bold?: boolean;
}

interface TableRowValue {
  key: string;
  value: string | number[];
}

interface TableDestination {
  num: number;
  color: string;
  name: string;
}

export interface TableRow {
  num: number;
  values: TableRowValue[];
  entity: {
    type: number;
    object: TeamBasicInfo;
  };
  destination_color?: string;
}

export interface LeagueTable {
  is_live: boolean;
  destinations?: TableDestination[];
  columns: TableColumn[];
  rows: TableRow[];
}

export interface TableGroup {
  name: string;
  tables: {
    name: string;
    table: LeagueTable;
  }[];
}

interface GameStatus {
  enum: number;
  name: string;
  short_name: string;
  symbol_name: string;
}

interface GameTeam extends TeamBasicInfo {
  red_cards: number;
}

export interface Game {
  id: string;
  winner: number;
  to_qualify: number;
  teams: GameTeam[];
  url_name: string;
  scores: number[];
  penalties: [number, number];
  status: GameStatus;
  start_time: string;
  game_time_status_to_display: string;
}

export interface GameData {
  TTL: number;
  games: Game[];
}

interface GameFilter {
  name: string;
  key: string;
  selected?: boolean;
  games?: Game[];
}

interface BracketParticipant {
  name: string;
  short_name: string;
  symbol_name: string;
  id: string | number;
  url_name?: string;
  country_id?: string;
  allow_open?: boolean;
}

export interface BracketGroup {
  participants: BracketParticipant[];
  games: Game[];
  score: number[];
  show_games: boolean;
  winner: number;
  is_third_place?: boolean;
  is_final: boolean;
}

export interface BracketStage {
  name: string;
  groups: BracketGroup[];
  connect_to_next_stage: boolean;
  is_final?: boolean;
}

export interface PlayerStatistic {
  num: number;
  entity: {
    type: number;
    object: PlayerBasicInfo;
  };
  values: TableRowValue[];
}

export interface StatisticsTable {
  name: string;
  name_color?: string;
  columns: TableColumn[];
  rows: PlayerStatistic[];
}

export interface PlayersStatistics {
  preview_rows_num: number;
  tables: StatisticsTable[];
}

// Interfaz principal que engloba todo
interface LeagueFullInfo {
  TTL: number;
  league: {
    name: string;
    id: string;
    url_name: string;
    country_id: string;
    show_country_flags: boolean;
    allow_open: boolean;
    country_name: string;
    is_international: boolean;
  };
  tables_groups: TableGroup[];
  brackets: {
    stages: BracketStage[];
  };
  games: {
    filters: GameFilter[];
  };
  players_statistics: PlayersStatistics;
}
