import {
  Autocomplete,
  Button,
  Checkbox,
  Flex,
  Stack,
  TextInput,
} from "@mantine/core";
import { Group } from "lucide-react";

export type Header = { key: string; value: string; checked: boolean };

type HeadersEditorProps = {
  headers: Header[];
  onChange: (newHeaders: Header[]) => void;
};

export default function HeadersEditor({ headers }: HeadersEditorProps) {
  return (
    <Stack gap={8}>
      {headers.map(({ checked, key, value }, index) => (
        <Group key={index}>
          <Flex align="center" gap={4} flex={0.4}>
            {/* <Checkbox checked={checked} key={`c-${index}`} /> */}
            <Autocomplete
              placeholder="Header Key"
              size="sm"
              value={key}
              data={["React", "Angular", "Vue", "Svelte"]}
            />
          </Flex>
          <TextInput
            placeholder="Header Value"
            size="sm"
            value={value}
            flex={0.6}
          />
          <Button color="red" variant="outline" size="xs" disabled={!index}>
            rm
          </Button>
        </Group>
      ))}
      <Button radius={20} variant="outline" fullWidth>
        Add Header
      </Button>
    </Stack>
  );
}
