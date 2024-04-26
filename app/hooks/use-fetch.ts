import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAsync = async (url: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchAsync(url);
  }, [url]);

  return { data, isLoading, isError };
}
