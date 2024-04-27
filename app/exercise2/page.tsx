"use client";

import dynamic from "next/dynamic";
const Range = dynamic(() => import("@/app/exercise2/range"), {
  ssr: false,
});
import { useFetch, useMyFetch } from "@/app/hooks";
import { API_RESULT } from "@/app/exercise2/api";

const API_URL = "http://demo1050961.mockable.io/get-range-values";

export default function Home() {
  const { data, isLoading, isError } = useFetch<API_RESULT>(API_URL);
  // const { data, isLoading, isError } = useMyFetch();

  if (isError) {
    return <>An error ocurred while fetching the data.</>;
  }

  if (isLoading) {
    return <>Loading data ...</>;
  }

  return (
    <>
      <Range values={data ?? []} />
    </>
  );
}
