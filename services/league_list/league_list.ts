import axios from 'axios';

export const getLeagueList = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/MatiasBobi/TucuFutbol/refs/heads/dev/data/leagues.json',
  );
  return data;
};
