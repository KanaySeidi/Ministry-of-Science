import { Info, Main, Sign } from "@/components/pages";

const routes = [
  { path: "/", element: <Sign /> },
  { path: "/education", element: <Main /> },
  { path: "/info/:id", element: <Info /> },
];

export default routes;
