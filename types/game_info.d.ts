type TeamColors = {
  color: string;
  text_color: string;
};

type PlayerBasicInfo = {
  jersey_num: number;
  name: string;
  player_short_name: string;
  position: string;
  formation_position: string;
  country_id: string;
  age: number;
  height?: string;
};

type Goal = {
  player_name: string;
  player_sname: string;
  time: number;
  time_to_display: string;
  goal_type?: string; // Ej: "Pen", "E.C"
};

type Card = {
  yellow: boolean;
  red: boolean;
  red_type: number;
};

type SubstitutionEvent = {
  has_substitution: boolean;
  time: number;
};

type PlayerEvents = {
  goals: {
    goals: number;
    own_goals: number;
  };
  cards: Card;
  substitution: SubstitutionEvent;
};

type PlayerWithEvents = PlayerBasicInfo & {
  pitch_location?: {
    x: number;
    y: number;
  };
  substitution?: {
    time: number;
    player: number;
    type: number;
  };
  events?: PlayerEvents;
};

type MissingPlayer = PlayerBasicInfo & {
  missing_details: {
    type: number;
    reason: string;
    will_play_status: number;
    will_play: string;
  };
};

type TeamLineup = {
  status: string;
  formation: string;
  team_num: number;
  starting: PlayerWithEvents[];
  bench: PlayerWithEvents[];
  staff: PlayerBasicInfo[];
};

type GameEvent = {
  type: number;
  time: string;
  team: number;
  texts: string[];
  player_jersey_num?: number | null;
};

type GameEventRow = {
  time: string;
  events: GameEvent[];
};

type GameStage = {
  name: string;
  show_stage_title: boolean;
  is_penalties_stage: boolean;
  scores: number[];
  rows: GameEventRow[];
};

type Statistic = {
  name: string;
  values: [string, string];
  percentages: [number, number];
};

type StandingColumn = {
  key: string;
  display_name: string;
  is_bold: boolean;
};

type StandingRow = {
  num: number;
  entity: {
    type: number;
    object: {
      name: string;
      short_name: string;
      url_name: string;
      id: string;
      country_id: string;
      allow_open: boolean;
      colors: TeamColors;
    };
  };
  values: {
    key: string;
    value: string;
  }[];
};

type Video = {
  source: string;
  url: string;
  video_id: string;
  thumbnail_url: string;
  embedding_allowed: boolean;
};

type PredictionOption = {
  name: string;
  votes: number;
  percentage: number;
  vote_url: string;
};

type PredictionOdd = {
  name: string;
  value: number;
  trend: number;
};

// Tipos principales
export type GameStatus = {
  enum: number;
  name: string;
  short_name: string;
  symbol_name: string;
};

export type Team = {
  name: string;
  short_name: string;
  url_name: string;
  id: string;
  country_id: string;
  allow_open: boolean;
  colors: TeamColors;
  red_cards?: number;
  goals?: Goal[];
};

export type GameInfoItem = {
  name: string;
  value: string;
};

export type Prediction = {
  pixels: {
    impression: any[];
    click: any[];
  };
  options: PredictionOption[];
  total_votes: number;
  odds: PredictionOdd[];
};

export type RecentForm = {
  home: number[];
  away: number[];
};

export type Standings = {
  title: string;
  columns: StandingColumn[];
  rows: StandingRow[];
};

export type League = {
  name: string;
  id: string;
  url_name: string;
  country_id: string;
  show_country_flags: boolean;
  allow_open: boolean;
  country_name: string;
  is_international: boolean;
};

export type GameInfo = {
  TTL: number;
  cache_time: number;
  game: {
    id: string;
    league: League;
    stage_round_name: string;
    winner?: number;
    teams: Team[];
    url_name: string;
    scores: number[];
    status: GameStatus;
    start_time: string;
    game_time: number;
    game_time_to_display: string;
    game_time_status_to_display: string;
    players: {
      lineups: {
        support_visual_lineups: boolean;
        teams: TeamLineup[];
      };
    };
    missing_players: MissingPlayer[][];
    prediction: Prediction;
    game_info: GameInfoItem[];
    events: GameStage[];
    statistics: Statistic[];
    recent_form: RecentForm;
    standings: Standings;
    videos: Video[];
  };
};
