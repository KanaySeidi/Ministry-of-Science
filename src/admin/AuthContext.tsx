import React, { createContext, useContext, useState } from "react";

export type Role = "ADMIN" | "UNIVERSITY";

export type User = {
  login: string;
  role: Role;
  universityId?: string | number;
};

type AuthContextType = {
  role: Role | null;
  loginAsAdmin: (title: string) => void;
  loginAsUniversity: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);

  const loginAsAdmin = (title: string) => {
    if (title === "admin") {
      setRole("ADMIN");
    } else {
      setRole("UNIVERSITY");
    }
  };

  const loginAsUniversity = () => setRole("UNIVERSITY");
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider
      value={{ role, loginAsAdmin, loginAsUniversity, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
