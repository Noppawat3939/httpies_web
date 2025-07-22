import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Plus, Trash } from "lucide-react";
import { useCallback } from "react";

export type Param = { key: string; value: string; checked: boolean };

const initial = { key: "", value: "", checked: false } satisfies Param;

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
    (index: number, field: keyof Param, value: string | boolean) => {
      const updated = [...params];

      const param = { ...updated[index], [field]: value };

      // auto checked if have key and value
      if (
        field !== "checked" &&
        !param.checked &&
        (!!param.key.trim() || !!param.value.trim())
      ) {
        param.checked = true;
      }

      // auto un-check if empty key and value
      if (
        field !== "checked" &&
        param.checked &&
        !param.key.trim() &&
        !param.value.trim()
      ) {
        param.checked = false;
      }

      updated[index] = param;

      updateParams(updated);
    },
    [params]
  );

  return (
    <Box>
      <Flex justify="end" mb={10}>
        <Text
          style={{ cursor: params.length > 1 ? "pointer" : "default" }}
          size="xs"
          onClick={() => (params.length > 1 ? updateParams([initial]) : null)}
          c={params.length > 1 ? "red" : "dark"}
        >
          {"clear"}
        </Text>
      </Flex>
      <Stack gap={8}>
        {params.map((param, index) => (
          <Group gap={5} key={index} align="center">
            <Flex align="center" gap={4} flex={0.4}>
              <Checkbox
                checked={param.checked}
                onChange={(e) =>
                  handleParamChange(index, "checked", e.currentTarget.checked)
                }
              />
              <TextInput
                placeholder="Key"
                size="sm"
                value={param.key}
                styles={{ input: { color: "orange" } }}
                onChange={(e) =>
                  handleParamChange(index, "key", e.currentTarget.value)
                }
              />
            </Flex>
            <TextInput
              placeholder="Value"
              size="sm"
              disabled={!params[index].checked}
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
              <Trash size={14} />
            </Button>
          </Group>
        ))}
        <Button radius={20} variant="outline" onClick={addParam} fullWidth>
          <Plus size={12} />
          {"Add param"}
        </Button>
      </Stack>
    </Box>
  );
}
