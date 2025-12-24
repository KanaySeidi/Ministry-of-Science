import Header from "@/components/organisms/header/Header";
import Loader from "@/components/organisms/loader/Loader";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const signpage = location.pathname === "/";

  return (
    <>
      <Header />
      <main className="mt-24">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
