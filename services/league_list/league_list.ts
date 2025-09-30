import axios from 'axios';

export const getLeagueList = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/MatiasBobi/TL_Politicas/refs/heads/main/src/leagues.json',
  );
  return data;
};
