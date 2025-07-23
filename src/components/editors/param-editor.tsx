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
import { useEditParams } from "~/hooks";

export type Param = { key: string; value: string; checked: boolean };

type ParamEditorProps = {
  params: Param[];
  onChange: (newParams: Param[]) => void;
};

export default function ParamEditor({ params, onChange }: ParamEditorProps) {
  const { onValueChange, add, remove, clear, hasValue } = useEditParams(
    params,
    onChange
  );

  return (
    <Box>
      <Flex justify="end" mb={10}>
        <Text
          style={{ cursor: hasValue ? "pointer" : "default" }}
          size="xs"
          onClick={clear}
          c={hasValue ? "red" : "dark"}
        >
          {"clear"}
        </Text>
      </Flex>
      <Stack gap={8}>
        {params.map((p, index) => (
          <Group gap={5} key={index} align="center">
            <Flex align="center" gap={4} flex={0.4}>
              <Checkbox
                checked={p.checked}
                onChange={({ currentTarget: { checked } }) =>
                  onValueChange(index, "checked", checked)
                }
              />
              <TextInput
                placeholder="Key"
                size="sm"
                value={p.key}
                styles={{ input: { color: "orange", fontWeight: 600 } }}
                onChange={({ currentTarget: { value } }) =>
                  onValueChange(index, "key", value)
                }
              />
            </Flex>
            <TextInput
              placeholder="Value"
              size="sm"
              disabled={!params[index].checked}
              value={p.value}
              onChange={({ currentTarget: { value } }) =>
                onValueChange(index, "value", value)
              }
              flex={0.6}
            />
            <Button
              color="red"
              variant="outline"
              size="xs"
              disabled={!index}
              onClick={remove.bind(null, index)}
            >
              <Trash size={14} />
            </Button>
          </Group>
        ))}
        <Button radius={20} variant="outline" onClick={add} fullWidth>
          <Plus size={12} />
          {"Add param"}
        </Button>
      </Stack>
    </Box>
  );
}
