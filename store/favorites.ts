import { Competitor } from '@/types/team_info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


/* Type para el hook */
type FavoritesState = {
  favorites: Competitor[];
  addFavorite: (team: Competitor) => void;
  removeFavorite: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
  getAllTeams: () => Competitor[];
};

/* Hook para manejar los favoritos, se utiliza persist para que la data dure entre sesiones. */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
       /* Agregar un equipo a favoritos, primero trae los que ya estan y verifica si no existe, en tal caso de que no exista lo agrega al array.*/
      favorites: [],
      addFavorite: (team) => {
        const current = get().favorites;
        const exists = current.find((t) => t.id === team.id); // <- cambio acá
        if (!exists) {
          set({ favorites: [...current, team] });
        }
      },
      /* Borrar equipo, filtramos por la id y guardamos lo que queda.*/
      removeFavorite: (teamId) => {
        const filtered = get().favorites.filter((team) => team.id !== teamId);
        set({ favorites: filtered });
      },
      isFavorite: (teamId) => {
        return get().favorites.some((team) => team.id === teamId); // Devolvemos true si el equipo ya esta en el array.
      },
      getAllTeams: () => {
        return get().favorites // Devolvemos todos los equipos
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

