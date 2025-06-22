import axios from 'axios';

const getGameInfo = async (url_match: string) => {
  const { data } = await axios.get(
    `https://api.promiedos.com.ar/gamecenter/${url_match}`,
  );
  return data;
};

export default getGameInfo;
