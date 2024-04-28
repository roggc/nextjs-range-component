"use client";

import dynamic from "next/dynamic";
const Range = dynamic(() => import("@/app/exercise1/range"), {
  ssr: false,
});
import { useFetch } from "@/app/hooks";
import styled from "styled-components";

const API_URL = "http://demo1050961.mockable.io/get-min-max-values";
type API_RESULT = { min: number; max: number };

export default function Home() {
  const { data, isLoading, isError } = useFetch<API_RESULT>(API_URL);

  if (isError) {
    return <>An error ocurred while fetching the data.</>;
  }

  if (isLoading) {
    return <>Loading data ...</>;
  }

  return (
    <Container>
      <Range min={data?.min} max={data?.max} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
`;
