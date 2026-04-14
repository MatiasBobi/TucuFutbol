import { TodayMatches } from "@/types/todayMatches";
import axios from "axios";

export default async function getToday(
  selectedDay: "yesterday" | "today" | "tomorrow" = "today",
) {
  const { data } = await axios.get<TodayMatches>(
    `https://api.promiedos.com.ar/games/${selectedDay}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-ver": "1.11.7.5",
      },
    },
  );
  return data;
}
