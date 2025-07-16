import { useState } from "react";

export default function useFetcher<TResponse>(
  url: string,
  options?: RequestInit
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResponse>();

  async function fetchData() {
    setLoading((prev) => !prev);
    try {
      const response = await fetch(url, { ...options });

      const toJson = await response.json();
      setData(toJson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => !prev);
    }
  }

  return {
    data,
    loading,
    fetch: fetchData,
  } as const;
}
