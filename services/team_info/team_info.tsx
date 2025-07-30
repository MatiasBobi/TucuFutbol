import axios from 'axios';

export const getTeamInfo = async (team_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/team/${team_id}`,
  );
  return data;
};
