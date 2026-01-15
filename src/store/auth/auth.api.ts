import api from "@/store/auth/axiosConfig";

export const authApi = {
  login: (username: string, password: string) =>
    api.post("/ru/api/auth/login/", { username, password }),

  me: () => api.get("/ru/api/auth/me/"),
};
