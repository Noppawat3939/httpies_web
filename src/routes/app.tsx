import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@mantine/core";
import { HttpRequestForm } from "~/components/form";

export const Route = createFileRoute("/app")({
  component: App,
});

function App() {
  return (
    <Container size="xs" h="100dvh" bg="dark" pos="relative" py={16}>
      <HttpRequestForm />
    </Container>
  );
}
