export interface TodayMatches {
  leagues: League[];
  calendar: Calendar;
  TTL: number;
  cache_time: number;
}

export interface League {
  name: string;
  id: string;
  url_name: string;
  country_id: string;
  show_country_flags: boolean;
  allow_open: boolean;
  country_name: string;
  is_international: boolean;
  games: Game[];
}

export interface Game {
  id: string;
  stage_round_name: string;
  winner: number;
  teams: Team[];
  url_name: string;
  status: Status;
  start_time: string;
  scores: number[];
  game_time: number;
  game_time_to_display: string;
  game_time_status_to_display: string;
  tv_networks: TvNetwork[];
  main_odds?: MainOdds;
}

export interface Goal {
  time_display: string;
  player_sname: string;
  time: number;
  time_to_display: string;
  goal_type: string;
}

export interface Team {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  goals: Goal[];
  country_id: string;
  allow_open: boolean;
  colors: TeamColors;
  red_cards: number;
}

export interface TeamColors {
  color: string;
  text_color: string;
}

export interface Status {
  enum: number;
  name: string;
  short_name: string;
  symbol_name: string;
}

export interface TvNetwork {
  id: string;
  name: string;
}

export interface MainOdds {
  options: OddsOption[];
}

export interface OddsOption {
  name: string; // e.g., "1", "X", "2"
  value: number;
  trend: number;
}

export interface Calendar {
  clubs: CalendarClub[];
  players: CalendarPlayer[];
  title: string;
}

export interface CalendarClub {
  name: string;
  text: string;
  id: string;
}

export interface CalendarPlayer {
  name: string;
  team: string;
  text: string;
}
