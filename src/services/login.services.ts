import { authApi } from "@/store/auth/auth.api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useAuth } from "@/admin/AuthContext";

export const loginAndResolveUniversity = async (
  username: string,
  password: string
): Promise<number> => {
  const login = useAuthStore.getState().login;

  const success = await login(username, password);
  if (!success) {
    throw new Error("Login failed");
  }

  const response = await authApi.me();
  const universityId = response.data?.data?.id;

  if (!universityId) {
    throw new Error("University ID not found in /me");
  }

  return universityId;
};
