import { useEffect, useState } from "react";
import { myFetch, API_RESULT } from "@/app/exercise2/api";

export function useMyFetch() {
  const [data, setData] = useState<API_RESULT>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        setIsLoading(true);
        const data = await myFetch();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchAsync();
  }, []);

  return { data, isLoading, isError };
}
