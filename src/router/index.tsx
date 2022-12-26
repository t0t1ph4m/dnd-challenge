import { useRoutes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import SpellList from "../pages/SpellList";
import SpellDetail from "../pages/SpellDetail";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <SpellList />,
        },
        {
          path: "/:index",
          element: <SpellDetail />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default Routes;
