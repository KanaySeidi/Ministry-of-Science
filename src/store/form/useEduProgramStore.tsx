import { create } from "zustand";
import api from "@/store/auth/axiosConfig";

/* ================== TYPES ================== */

export type EduProgram = {
  id: number;
  direction: number;
  edu_level: number;
  courses_count: number;
};

type EduProgramState = {
  program: EduProgram | null;
  loading: boolean;
  error: string | null;

  fetchProgram: (eduLevelId: number, directionId: number) => Promise<void>;
  reset: () => void;
};

/* ================== STORE ================== */

export const useEduProgramStore = create<EduProgramState>((set) => ({
  program: null,
  loading: false,
  error: null,

  fetchProgram: async (eduLevelId, directionId) => {
    if (!eduLevelId || !directionId) {
      set({ program: null, error: null });
      return;
    }

    try {
      set({ loading: true, error: null });

      const res = await api.get(
        `/ru/api/core/edu-programs/${eduLevelId}/${directionId}/`
      );
      const data = Array.isArray(res.data) ? res.data[0] : res.data;

      set({
        program: {
          id: data.id,
          direction: data.direction,
          edu_level: data.edu_level,
          courses_count: data.courses_count,
        },
        loading: false,
      });
    } catch (e) {
      set({
        program: null,
        loading: false,
        error: "Программа обучения не найдена",
      });
    }
  },

  reset: () =>
    set({
      program: null,
      loading: false,
      error: null,
    }),
}));
