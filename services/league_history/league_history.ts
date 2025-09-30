import axios from 'axios';
const getLeagueHistory = async (league_id: string, season_id: string) => {

  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/history/tables/${league_id}/${season_id}`,
  );
  return data;
};

export default getLeagueHistory;
