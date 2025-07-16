import {
  Flex,
  Select,
  TextInput,
  type SelectProps,
  JsonInput,
  ScrollArea,
  Box,
  Button,
  Text,
  Stack,
} from "@mantine/core";
import { useInputState, useViewportSize } from "@mantine/hooks";
import { Fragment, useMemo } from "react";
import { useFetcher } from "~/hooks";
import { HTTPS_METHOD, HTTP_STATUS_MESSAGE } from "~/lib/constants";
import { getHttpStatusColor } from "~/lib/utils";

const testApi = "https://jsonplaceholder.typicode.com/photos";

export default function HttpRequestForm() {
  const [method, setMethod] = useInputState(HTTPS_METHOD.get);
  const [baseUrl, setBaseUrl] = useInputState(testApi);

  const { height } = useViewportSize();

  const { data, fetch, loading, duration, status } = useFetcher(baseUrl, {
    method,
    headers: {
      ["Content-type"]: "application/json",
    },
  });

  const methodOptions = useMemo<SelectProps["data"]>(
    () =>
      Object.values(HTTPS_METHOD).map((value) => ({
        label: value.toUpperCase(),
        value,
      })),
    []
  );

  return (
    <Fragment>
      <Stack gap={10}>
        <Flex gap={5}>
          <Select
            flex={0.3}
            variant="default"
            data={methodOptions}
            onChange={(value) => value && setMethod(value)}
            checkIconPosition="right"
            value={method}
          />
          <TextInput
            flex={0.7}
            placeholder="https://httpies-api.com"
            value={baseUrl}
            onChange={setBaseUrl}
          />
        </Flex>
        <Flex justify="end" gap={4}>
          {status && (
            <Text
              fw={700}
              size="xs"
              hidden={!status}
              c={getHttpStatusColor(status)}
            >
              {`${status} ${HTTP_STATUS_MESSAGE[status]}`}
            </Text>
          )}
          <Text size="xs">{`${duration || 0}ms`}</Text>
        </Flex>
        <ScrollArea type="auto" h={height - 46 - 76 - 100}>
          <JsonInput
            autosize
            minRows={3}
            placeholder="Response"
            value={data ? JSON.stringify(data) : undefined}
          />
        </ScrollArea>
      </Stack>

      <Box pos="absolute" bottom={0} w={"100%"} p={"lg"} left={0}>
        <Button
          loading={loading}
          onClick={() => fetch()}
          radius={20}
          fullWidth
          variant="gradient"
        >
          Send
        </Button>
      </Box>
    </Fragment>
  );
}
