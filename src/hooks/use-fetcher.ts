import { useState } from "react";

export default function useFetcher<TResponse>(
  url: string,
  options?: RequestInit
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResponse>();
  const [infos, setInfos] = useState<{
    duration: number;
    status: number | null;
  }>({ duration: 0, status: null });

  let end: number, status: number;

  async function fetchData() {
    const start = performance.now();
    setLoading(true);

    const response = await fetch(url, { ...options });
    status = response.status;

    end = performance.now();
    status = response.status;

    if (response.ok) {
      const contentType = response.headers.get("content-type") ?? "";
      const result = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      setData(result);
    }

    setInfos({ duration: Math.round(end - start), status });

    setLoading(false);
  }

  return {
    data,
    loading,
    fetch: fetchData,
    ...infos,
  } as const;
}
