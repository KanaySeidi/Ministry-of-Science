import { create } from "zustand";
import api from "@/store/auth/axiosConfig";

/* ================= TYPES ================= */

export type ContengentData = {
  id: number;
  title: string;
};

type ContingentFormDataState = {
  eduFormData: ContengentData[];
  socialItems: ContengentData[];
  countries: ContengentData[];
  loading: boolean;
  error: string | null;
  fetchFormData: () => Promise<void>;
};

/* ================= STORE ================= */

export const useContingentFormDataStore = create<ContingentFormDataState>(
  (set) => ({
    eduFormData: [],
    socialItems: [],
    countries: [],

    loading: false,
    error: null,

    fetchFormData: async () => {
      try {
        set({ loading: true, error: null });
        const res = await api.get("/ru/api/core/contingent/data/");

        const { edu_forms, social_items, countries } = res.data.data || {};

        if (edu_forms && social_items) {
          set({
            eduFormData: edu_forms,
            socialItems: social_items,
            countries: countries || [],
            loading: false,
          });
        } else {
          console.error("Invalid API response structure:", res.data);
          set({
            loading: false,
            error: "Некорректная структура ответа API",
          });
        }
      } catch (e) {
        console.error("Error fetching contingent data:", e);
        set({
          loading: false,
          error: "Ошибка загрузки справочников",
        });
      }
    },
  })
);
