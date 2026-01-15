import { create } from "zustand";
import api from "@/store/auth/axiosConfig";

type Direction = {
  id: number;
  code: string;
  title: string;
};

type DirectionByCodeState = {
  direction: Direction | null;
  loading: boolean;
  error: string | null;
  fetchByCode: (code: string) => Promise<void>;
  reset: () => void;
};

export const useDirectionByCodeStore = create<DirectionByCodeState>((set) => ({
  direction: null,
  loading: false,
  error: null,

  fetchByCode: async (code) => {
    if (code.length < 6) return;

    try {
      set({ loading: true });

      const res = await api.get(`/ru/api/core/directions/${code}/`);
      const data = res.data.data;

      set({
        direction: {
          id: data.id,
          code,
          title: data.title,
        },
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: "Направление не найдено",
      });
    }
  },

  reset: () => set({ direction: null, error: null }),
}));
