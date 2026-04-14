import axios from "axios";

export const getLeagueChampions = async (league_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/history/${league_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    }
  );
  return data;
};
