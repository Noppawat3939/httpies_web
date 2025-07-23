import {
  Flex,
  Select,
  TextInput,
  type SelectProps,
  ScrollArea,
  Box,
  Button,
  Text,
  Stack,
  Tabs,
} from "@mantine/core";
import { useInputState, useViewportSize } from "@mantine/hooks";
import {
  Fragment,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useFetcher } from "~/hooks";
import { HTTPS_METHOD, HTTP_STATUS_MESSAGE, isDevelop } from "~/lib/constants";
import {
  entriesQueryParams,
  getHttpStatusColor,
  numberFormat,
} from "~/lib/utils";
import { prettyPrintJson } from "pretty-print-json";
import { HeadersEditor, ParamEditor } from "~/components/editors";

import "~/styles/pretty-json.css";
import type { Param } from "~/components/editors/param-editor";
import type { Header } from "~/components/editors/headers-editor";
import { useNavigate, useSearch } from "@tanstack/react-router";

// Apply this url on develop mode
const testApi = isDevelop ? "https://jsonplaceholder.typicode.com/users" : "";

const httpConfigs = {
  params: "params",
  headers: "headers",
  auth: "auth",
  body: "body",
};

type HttpConfigs = keyof typeof httpConfigs;

const PARAM_EDITOR_HEIGHT = 44; //px
const MAGIC_NUMBER = 200; //px

const initalParam = { key: "", value: "", checked: false } satisfies Param;
const initalHeader = { key: "", value: "", checked: false } satisfies Header;

export default function HttpRequestForm() {
  const { tab = "params" } = useSearch({ from: "/app" }) satisfies {
    tab: HttpConfigs;
  };
  const navigation = useNavigate();

  const [method, setMethod] = useInputState(HTTPS_METHOD.get);
  const [baseUrl, setBaseUrl] = useInputState(testApi);

  const [pending, startTransition] = useTransition();

  const [httpConfigTab, setHttpConfigTab] = useState<HttpConfigs>(tab);
  const [params, setParams] = useState<Param[]>([initalParam]);
  const [headers, setHeaders] = useState<Header[]>([initalHeader]);

  const { height } = useViewportSize();

  const { data, fetch, loading, duration, status } = useFetcher(baseUrl, {
    method,
    headers: { ["Content-type"]: "application/json" },
    params: entriesQueryParams(params),
  });

  const methodOptions = useMemo<SelectProps["data"]>(
    () =>
      Object.values(HTTPS_METHOD).map((value) => ({
        label: value.toUpperCase(),
        value,
      })),
    []
  );

  const renderEditor = {
    params: <ParamEditor params={params} onChange={setParams} />,
    headers: <HeadersEditor headers={headers} onChange={setHeaders} />,
    body: <ParamEditor params={params} onChange={setParams} />,
    auth: <ParamEditor params={params} onChange={setParams} />,
  } as Record<HttpConfigs, ReactNode>;

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
        <Flex>
          <Tabs
            value={httpConfigTab}
            styles={{ tabLabel: { fontSize: 12, textTransform: "capitalize" } }}
            w="100%"
            onChange={(value) => {
              navigation({ to: "/app", search: { tab: value } });

              setHttpConfigTab(value as typeof httpConfigTab);
            }}
          >
            <Tabs.List grow justify="space-evenly">
              {Object.values(httpConfigs).map((config) => (
                <Tabs.Tab value={config} key={config}>
                  {config}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Flex>

        {renderEditor[httpConfigTab]}

        <ScrollArea
          type="auto"
          h={
            height -
            46 -
            76 -
            MAGIC_NUMBER -
            (params.length ? params.length * PARAM_EDITOR_HEIGHT : 0)
          }
        >
          <pre
            className="pretty-json"
            style={{ fontSize: 12, whiteSpace: "break-spaces" }}
            dangerouslySetInnerHTML={{
              __html: data ? prettyPrintJson.toHtml(data) : "",
            }}
          />
        </ScrollArea>
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
          <Text size="xs">{`${numberFormat(duration || 0)} ms`}</Text>
        </Flex>
      </Stack>

      <Box pos="absolute" bottom={0} w={"100%"} p={"lg"} left={0}>
        <Button
          loading={loading || pending}
          onClick={() => startTransition(fetch)}
          radius={20}
          fullWidth
          variant="gradient"
        >
          {"Send"}
        </Button>
      </Box>
    </Fragment>
  );
}
