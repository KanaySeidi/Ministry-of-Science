// src/store/admin/useContingentsStore.ts
import { create } from "zustand";
import api from "@/store/auth/axiosConfig";

type ForeignStudent = {
  country: number;
  count: number;
};

type SocialCategory = {
  social_item: number;
  all_count: number;
  man_count: number;
  woman_count: number;
};

export type Contingent = {
  program: number;
  form_level: number;
  course_number: number;

  students_count: number;
  man_count: number;
  woman_count: number;
  group_count: number;

  contract_basis_count: number;
  grant_basis_count: number;

  foreign_students: ForeignStudent[];
  social_categories: SocialCategory[];
};

type State = {
  data: Contingent[];
  loading: boolean;
  fetchAll: () => Promise<void>;
};

export const useContingentsStore = create<State>((set) => ({
  data: [],
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    const res = await api.get("/ru/api/core/contingents/");
    set({ data: res.data, loading: false });
  },
}));
