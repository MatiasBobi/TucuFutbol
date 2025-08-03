import { Competitor } from '@/types/team_info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


type FavoritesState = {
  favorites: Competitor[];
  addFavorite: (team: Competitor) => void;
  removeFavorite: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (team) => {
        const current = get().favorites;
        if (!current.find((team) => team.id === team.id)) {
          set({ favorites: [...current, team] });
        }
      },
      removeFavorite: (teamId) => {
        const filtered = get().favorites.filter((team) => team.id !== teamId);
        set({ favorites: filtered });
      },
      isFavorite: (teamId) => {
        return get().favorites.some((team) => team.id === teamId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
