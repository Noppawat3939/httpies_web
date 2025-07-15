import { useRef, useState } from "react";

export default function useFetcher<TResponse>(
  url: string,
  options?: RequestInit
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResponse>();

  const responseRef = useRef<Response>(null);

  async function fetchData() {
    setLoading((prev) => !prev);
    try {
      const response = await fetch(url, { ...options });
      responseRef.current = response;

      const toJson = await response.json();
      setData(toJson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => !prev);
    }
  }

  async function refetch() {
    setLoading((prev) => !prev);
    try {
      const response = await fetch(url, { ...options, cache: "default" });
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
    refetch,
    ...responseRef.current,
  } as const;
}
