import {
  Autocomplete,
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
import { useEditHeaders } from "~/hooks";
import { HTTP_HEADERS_OPTIONS } from "~/lib/constants";

export type Header = { key: string; value: string; checked: boolean };

type HeadersEditorProps = {
  headers: Header[];
  onChange: (newHeaders: Header[]) => void;
};

export default function HeadersEditor({
  headers,
  onChange,
}: HeadersEditorProps) {
  const { add, onValueChange, remove, clear, hasValue } = useEditHeaders(
    headers,
    onChange
  );

  return (
    <Box>
      <Flex justify="end" mb={10}>
        <Text
          size="xs"
          onClick={clear}
          c={hasValue ? "red" : "dark"}
          style={{ cursor: hasValue ? "pointer" : "default" }}
        >
          {"clear"}
        </Text>
      </Flex>

      <Stack gap={8}>
        {headers.map((h, index) => (
          <Group key={index} gap={5} align="center">
            <Flex align="center" gap={4} flex={0.4}>
              <Checkbox
                checked={h.checked}
                onChange={({ currentTarget: { checked } }) =>
                  onValueChange(index, "checked", checked)
                }
              />
              <Autocomplete
                value={h.key}
                placeholder="Key"
                size="sm"
                styles={{ input: { color: "orange", fontWeight: 600 } }}
                data={HTTP_HEADERS_OPTIONS}
                onChange={(value) => onValueChange(index, "key", value.trim())}
              />
            </Flex>
            <TextInput
              placeholder="Value"
              size="sm"
              disabled={!headers[index].checked}
              value={h.value}
              onChange={({ currentTarget: { value } }) =>
                onValueChange(index, "value", value)
              }
              flex={0.6}
            />
            <Button
              color="red"
              onClick={remove.bind(null, index)}
              variant="outline"
              size="xs"
              disabled={!index}
            >
              <Trash size={14} />
            </Button>
          </Group>
        ))}
        <Button radius={20} variant="outline" onClick={add} fullWidth>
          <Plus size={12} />
          {"Add Header"}
        </Button>
      </Stack>
    </Box>
  );
}
