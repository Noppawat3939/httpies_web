import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider
        withCssVariables
        withGlobalClasses
        theme={{
          primaryColor: "violet",
          defaultGradient: { from: "indigo", deg: 10, to: "violet" },
        }}
        forceColorScheme="dark"
      >
        <RouterProvider router={router} basepath="/httpies_web" />
      </MantineProvider>
    </StrictMode>
  );
}
