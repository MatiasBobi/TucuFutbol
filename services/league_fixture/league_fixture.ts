import axios from 'axios';

export const getFixtureLeague = async (fecha_id: string, league_id: string) => {

 
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/league/games/${league_id}/${fecha_id}?t=${Date.now()}`,
    {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
    }
  );

  return data;
};
