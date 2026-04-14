import axios from "axios";
const getLeagueFullInfo = async (league_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/tables_and_fixtures/${league_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    }
  );
  return data;
};

export default getLeagueFullInfo;
