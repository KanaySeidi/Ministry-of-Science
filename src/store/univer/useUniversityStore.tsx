import { create } from "zustand";

export type University = {
  id: number;
  title: string;
};

type UniversityState = {
  university: University | null;
  setUniversity: (u: University) => void;
  clearUniversity: () => void;
};

export const useUniversityStore = create<UniversityState>((set) => ({
  university: null,

  setUniversity: (u) => set({ university: u }),

  clearUniversity: () => set({ university: null }),
}));
