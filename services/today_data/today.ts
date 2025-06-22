import { TodayMatches } from '@/types/todayMatches';
import axios from 'axios';

export default async function getToday() {
  const { data } = await axios.get<TodayMatches>(
    'https://api.promiedos.com.ar/games/today',
  );
  return data;
}
