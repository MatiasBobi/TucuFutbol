import { GameInfo } from '@/types/game_info';
import { create } from 'zustand';


type MatchViewState = {
    currentMatch: GameInfo | null;
    setCurrentMatch: (match: GameInfo) => void;
    clearMatch: () => void;
  };

// Estado para manejar el match consultado en el componente Match.tsx (Evitar un re-fetch)
export const useMatchView = create<MatchViewState>((set) => ({
    currentMatch: null,
    setCurrentMatch: (match : GameInfo) => set({currentMatch: match}),
    clearMatch: () => set({ currentMatch: null })
  }))
  