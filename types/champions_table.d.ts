import { Game } from "./todayMatches";

interface League {
    name: string;
    id: string;
    url_name: string;
    country_id: string;
    show_country_flags: boolean;
    allow_open: boolean;
    country_name: string;
    is_international: boolean;
  }
  
  interface Column {
    key: string;
    title: string;
    type: number;
    is_bold: boolean;
  }
  
  interface TeamColors {
    color: string;
    text_color: string;
  }
  
  interface TeamObject {
    name: string;
    short_name: string;
    url_name?: string;
    id: string;
    country_id: string;
    allow_open?: boolean;
    colors?: TeamColors;
  }
  
  interface Entity {
    type: number;
    object: TeamObject;
  }
  
  interface RowValue {
    key: string;
    value: string;
  }

  export interface HistoryRow {
    num: number;
    values: RowValue[]; 
    entity?: Entity;
    trigger_type?: number;
    season_id?: string;
    game?: Game
  }
  
  export interface RankingRow {
    num: number;
    values: RowValue[];
    entity: Entity;
  }
  
  export interface RankingTable {
    name: string;
    columns: Column[];
    rows: RankingRow[];
  }
  
  interface History {
    name: string;
    columns: Column[];
    rows: HistoryRow[];
  }
  
  export interface LeagueChampionsData {
    TTL: number;
    league: League;
    history: History;
    ranking_tables: RankingTable[];
  }