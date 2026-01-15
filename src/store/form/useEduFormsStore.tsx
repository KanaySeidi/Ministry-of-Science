import { create } from "zustand";
import api from "../auth/axiosConfig";

type EduFormsItem = {
  title: string;
  id: number;
};

type EduFormsState = {
  eduForms: EduFormsItem[];
  loading: boolean;
  error: string | null;
  fetchEduForms: () => Promise<void>;
};

export const useEduFormsStore = create<EduFormsState>((set) => ({
  loading: false,
  error: null,
  eduForms: [],
  fetchEduForms: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/ru/api/core/edu-forms/");
      set({
        loading: false,
        eduForms: res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
        })),
      });
    } catch (err) {
      set({ loading: false, error: "Ошибка загрузки типа обучения" });
    }
  },
}));
