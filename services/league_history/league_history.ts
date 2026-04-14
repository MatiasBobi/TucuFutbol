import axios from "axios";
const getLeagueHistory = async (league_id: string, season_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/history/tables/${league_id}/${season_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    }
  );
  return data;
};

export default getLeagueHistory;
