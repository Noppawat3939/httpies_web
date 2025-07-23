import { useCallback, useMemo } from "react";
import type { Header } from "~/components/editors/headers-editor";

const defaultValue = { key: "", value: "", checked: false } satisfies Header;

export default function useEditHeaders(
  headers: Header[],
  setHeaders: (headers: Header[]) => void
) {
  const onValueChange = useCallback(
    (index: number, field: keyof Header, value: string | boolean) => {
      const updated = [...headers];

      const header = { ...updated[index], [field]: value };

      // auto checked if have key and value
      if (
        field !== "checked" &&
        !header.checked &&
        (!!header.key.trim() || !!header.value.trim())
      ) {
        header.checked = true;
      }

      // auto un-check if empty key and value
      if (
        field !== "checked" &&
        header.checked &&
        !header.key.trim() &&
        !header.value.trim()
      ) {
        header.checked = false;
      }

      updated[index] = header;

      setHeaders(updated);
    },
    [headers]
  );

  const add = useCallback(
    () => setHeaders([...headers, defaultValue]),
    [headers]
  );

  const remove = useCallback(
    (removeIdx: number) => {
      const updated = headers.filter((_, i) => i !== removeIdx);

      setHeaders(updated.length ? updated : [defaultValue]);
    },
    [headers]
  );

  const clear = useCallback(() => setHeaders([defaultValue]), [headers]);

  const hasValue = useMemo(
    () => headers.some((h) => !!h?.key) || false,
    [headers]
  );

  return { onValueChange, add, remove, clear, hasValue };
}
