import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/organisms/error/Error";
import Layout from "./components/pages/layout/Layout";
import routes from "./routes/routes";
import { AuthProvider } from "@/admin/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: routes,
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
