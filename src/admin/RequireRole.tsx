import { Navigate } from "react-router-dom";
import { useAuth, type Role } from "./AuthContext";
import type { JSX } from "react";

export const RequireRole = ({
  role,
  children,
}: {
  role: Role;
  children: JSX.Element;
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/403" replace />;

  return children;
};
