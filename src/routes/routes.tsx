import { AdminDashboard } from "@/admin/AdminDashboard.async";
import { RequireRole } from "@/admin/RequireRole";
import { useAuth } from "@/admin/AuthContext";
import { Info, Main, Sign } from "@/components/pages";

const routes = [
  { path: "/", element: <Sign /> },
  {
    path: "/select",
    element: (
      <RequireRole role="UNIVERSITY">
        <Main />
      </RequireRole>
    ),
  },
  { path: "/info/:id", element: <Info /> },
  {
    path: "/admin",
    element: (
      <RequireRole role="ADMIN">
        <AdminDashboard />
      </RequireRole>
    ),
  },
];

export default routes;
