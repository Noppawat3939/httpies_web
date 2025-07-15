import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex"></div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
