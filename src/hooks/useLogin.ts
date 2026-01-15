import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndResolveUniversity } from "@/services/login.services";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Attempting login with username:", username);

      const universityId = await loginAndResolveUniversity(
        username,
        password
      );

      navigate(`/info/${universityId}`);
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
