import { create } from "zustand";
import { loginRequest } from "@/store/auth/auth";

type AuthState = {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  loading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });

      const { access, refresh } = await loginRequest(username, password);

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      set({ access, refresh, loading: false });
      return true;
    } catch {
      set({
        loading: false,
        error: "Неверный логин или пароль",
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    set({ access: null, refresh: null });
  },
}));
