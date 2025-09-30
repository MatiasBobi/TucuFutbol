import axios from 'axios';
const getLeagueFullInfo = async (league_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/tables_and_fixtures/${league_id}`,
  );
  return data;
};

export default getLeagueFullInfo;
