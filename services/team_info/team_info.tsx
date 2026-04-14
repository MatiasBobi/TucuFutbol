import axios from "axios";

export const getTeamInfo = async (team_id: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/team/${team_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    }
  );
  return data;
};
