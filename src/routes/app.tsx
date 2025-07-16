import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Flex,
  JsonInput,
  ScrollArea,
  Select,
  TextInput,
} from "@mantine/core";
import { useInputState, useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { useFetcher } from "~/hooks";

export const Route = createFileRoute("/app")({
  component: App,
});

const testApi = "https://jsonplaceholder.typicode.com/photos";
const METHOD = {
  get: "get",
  post: "post",
  put: "put",
  patch: "patch",
  delete: "delete",
};

function App() {
  const [stringValue, setStringValue] = useInputState(testApi);

  const [method, setMethod] = useState(METHOD.get);

  const { data, fetch, loading } = useFetcher(stringValue, {
    method,
  });

  const { height } = useViewportSize();

  return (
    <Container size="xs" h="100dvh" bg="dark" pos="relative">
      <Flex gap={5}>
        <Select
          flex={0.3}
          variant="default"
          data={Object.values(METHOD).map((value) => ({
            label: value.toUpperCase(),
            value,
          }))}
          onChange={(value) => {
            value && setMethod(value);
          }}
          labelProps={{ style: { color: "red" } }}
          checkIconPosition="right"
          value={method}
        />
        <TextInput
          flex={0.7}
          placeholder="https://httpies-api.com"
          value={stringValue}
          onChange={setStringValue}
        />
      </Flex>
      <ScrollArea type="auto" mt={10} h={height - 46 - 76}>
        <JsonInput
          autosize
          minRows={3}
          placeholder="Response"
          value={data ? JSON.stringify(data) : undefined}
        />
      </ScrollArea>
      <Box pos="absolute" bottom={0} w={"100%"} p={"lg"} left={0}>
        <Button
          loading={loading}
          onClick={() => {
            fetch();
          }}
          radius={20}
          fullWidth
          variant="gradient"
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
