import { create } from "zustand";
import api from "../auth/axiosConfig";

type SocialCategoryItem = {
  title: string;
  id: number;
};

type SocialCategory = {
  social: SocialCategoryItem[];
  loading: boolean;
  error: string | null;
  fetchSocialCategory: () => Promise<void>;
};

export const useSocialCategoryStore = create<SocialCategory>((set) => ({
  loading: false,
  error: null,
  social: [],
  fetchSocialCategory: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/ru/api/core/social-items/");
      set({
        loading: false,
        social: res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
        })),
      });
    } catch (err) {
      set({ loading: false, error: "Ошибка загрузки социальных категорий" });
    }
  },
}));
