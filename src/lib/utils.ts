import type { DefaultMantineColor, StyleProp } from "@mantine/core";

export function getHttpStatusColor(
  status: number
): StyleProp<DefaultMantineColor> {
  if (status >= 200 && status < 400) return "green";
  if (status >= 400 && status < 500) return "orange";

  return "red";
}
