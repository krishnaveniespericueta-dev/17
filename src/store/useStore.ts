import { create } from 'zustand';

interface AppState {
  openedPacks: string[];
  openPack: (id: string) => void;
}

export const useStore = create<AppState>()(
  (set) => ({
    openedPacks: [],
    openPack: (id: string) => set((state) => ({ 
      openedPacks: Array.from(new Set([...state.openedPacks, id])) 
    })),
  })
);