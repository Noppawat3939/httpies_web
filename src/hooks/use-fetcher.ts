import { useState } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export default function useFetcher<TResponse>(
  url: string,
  options?: AxiosRequestConfig
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TResponse>();
  const [infos, setInfos] = useState<{
    duration: number;
    status: number | null;
  }>({ duration: 0, status: null });

  async function fetchData() {
    const start = performance.now();
    setLoading(true);

    try {
      const response: AxiosResponse<TResponse> = await axios({
        url,
        method: "get", // default to GET; override via `options`
        ...options,
      });

      const end = performance.now();
      setData(response.data);
      setInfos({
        duration: Math.round(end - start),
        status: response.status,
      });
    } catch (error: any) {
      const end = performance.now();
      setInfos({
        duration: Math.round(end - start),
        status: error?.response?.status ?? 0,
      });
      console.error("Axios fetch error:", error);
    }

    setLoading(false);
  }

  return {
    data,
    loading,
    fetch: fetchData,
    ...infos,
  } as const;
}
