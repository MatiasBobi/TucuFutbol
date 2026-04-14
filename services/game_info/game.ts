import axios from "axios";

const getGameInfo = async (url_match: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/gamecenter/${url_match}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    }
  );

  return data;
};

export default getGameInfo;
