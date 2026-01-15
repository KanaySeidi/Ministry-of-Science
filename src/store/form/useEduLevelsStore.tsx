import { create } from "zustand";
import api from "../auth/axiosConfig";

type EduLevelItem = {
  title: string;
  id: number;
};

type EduLevelState = {
  eduLevel: EduLevelItem[];
  loading: boolean;
  error: string | null;
  fetchEduLevel: () => Promise<void>;
};

export const useEduLevelStore = create<EduLevelState>((set) => ({
  loading: false,
  error: null,
  eduLevel: [],
  fetchEduLevel: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/ru/api/core/edu-levels/");
      set({
        loading: false,
        eduLevel: res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
        })),
      });
    } catch (err) {
      set({ loading: false, error: "Ошибка загрузки уровня образования" });
    }
  },
}));
