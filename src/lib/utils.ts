import type { DefaultMantineColor, StyleProp } from "@mantine/core";
import type { Header } from "~/components/editors/headers-editor";
import type { Param } from "~/components/editors/param-editor";

export function getHttpStatusColor(
  status: number
): StyleProp<DefaultMantineColor> {
  if (status >= 200 && status < 400) return "green";
  if (status >= 400 && status < 500) return "orange";

  return "red";
}

export function numberFormat(value: number | bigint) {
  return Intl.NumberFormat().format(value);
}

/**
 *
 * @param params
 * @example entriesQueryParams([{key: "page": value: 1, checked: true}, {key: "limit", value: 100, cheeck: true}])
 * @returns `{ page: 1, limit: 100 }`
 */
export function entriesQueryParams(items: (Param & Header)[]) {
  const cleaned = items.filter(
    (param) => param.checked && param.key.trim() && param.value.trim()
  );

  return Object.fromEntries(
    cleaned.map(({ key, value }) => [
      encodeURIComponent(key),
      encodeURIComponent(value),
    ])
  );
}
