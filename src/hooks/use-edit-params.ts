import { useCallback, useMemo } from "react";
import type { Param } from "~/components/editors/param-editor";

const defaultValue = { key: "", value: "", checked: false } satisfies Param;

export default function useEditParams(
  params: Param[],
  setParams: (params: Param[]) => void
) {
  const onValueChange = useCallback(
    (index: number, field: keyof Param, value: string | boolean) => {
      const updated = [...params];

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

      setParams(updated);
    },
    [params]
  );

  const add = useCallback(() => setParams([...params, defaultValue]), [params]);

  const remove = useCallback(
    (removeIdx: number) => {
      const updated = params.filter((_, i) => i !== removeIdx);

      setParams(updated.length ? updated : [defaultValue]);
    },
    [params]
  );

  const clear = useCallback(() => setParams([defaultValue]), [params]);

  const hasValue = useMemo(
    () => params.some((p) => !!p?.key) || false,
    [params]
  );

  return { onValueChange, add, remove, clear, hasValue };
}
