import { Box, Button, Group, Stack, TextInput } from "@mantine/core";
import { useCallback } from "react";

export type Param = { key: string; value: string };

const initial = { key: "", value: "" } satisfies Param;

type ParamEditorProps = {
  params: Param[];
  onChange: (newParams: Param[]) => void;
};

export default function ParamEditor({ params, onChange }: ParamEditorProps) {
  const updateParams = (newParams: Param[]) => onChange(newParams);

  const addParam = useCallback(
    () => updateParams([...params, initial]),
    [params]
  );

  const removeParam = useCallback(
    (removeIndex: number) => {
      const newParams = params.filter((_, i) => i !== removeIndex);

      updateParams(newParams.length ? newParams : [initial]);
    },
    [params]
  );

  const handleParamChange = useCallback(
    (index: number, filed: keyof Param, value: string) => {
      const updated = [...params];
      updated[index][filed] = value;

      updateParams(updated);
    },
    [params]
  );

  return (
    <Box>
      <Stack gap={8}>
        {params.map((param, index) => (
          <Group gap={5} key={index} align="center">
            <TextInput
              placeholder="Key"
              flex={0.4}
              size="sm"
              value={param.key}
              onChange={(e) =>
                handleParamChange(index, "key", e.currentTarget.value)
              }
            />
            <TextInput
              placeholder="Value"
              size="sm"
              value={param.value}
              onChange={(e) =>
                handleParamChange(index, "value", e.currentTarget.value)
              }
              flex={0.6}
            />
            <Button
              color="red"
              variant="outline"
              size="xs"
              disabled={!index}
              onClick={() => removeParam(index)}
            >
              rm
            </Button>
          </Group>
        ))}
        <Button radius={20} variant="outline" onClick={addParam} fullWidth>
          + Add param
        </Button>
      </Stack>
    </Box>
  );
}
