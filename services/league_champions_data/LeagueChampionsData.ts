import axios from 'axios';

export const getLeagueChampions = async (league_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/history/${league_id}`,
  );
  return data;
};
