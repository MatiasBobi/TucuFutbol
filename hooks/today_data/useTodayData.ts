import getToday from "@/services/today_data/today";
import { useQuery } from "@tanstack/react-query";

export default function useToday(
  selectedDay: "yesterday" | "today" | "tomorrow" = "today",
) {
  // Hook para obtener los datos de hoy.
  // RefetchInterval es para actualizar los datos cada 15 segundos.
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["today", selectedDay],
    queryFn: () => getToday(selectedDay),
    refetchInterval: selectedDay === "today" ? 15000 : false, // Solo sirve para que se muestre el dia de hoy
    refetchIntervalInBackground: selectedDay === "today",
  });
  return { data, isLoading, error, refetch, isFetching };
}
