"use client";

import { useRowLabel } from "@payloadcms/ui";

export const ArrayRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label: string; value: string }>();

  const customLabel = `${String((rowNumber ?? 0) + 1).padStart(2, "0")}. ${data.label || "Untitled"} ${data.value && `: ${data.value}`}`;

  return <div>{customLabel}</div>;
};
