import { createFileRoute } from "@tanstack/react-router";
import { LayoutWrapper } from "~/components/wrapper";

export const Route = createFileRoute("/app")({
  component: App,
});

function App() {
  return (
    <LayoutWrapper>
      <div>
        <p>App</p>
      </div>
    </LayoutWrapper>
  );
}
