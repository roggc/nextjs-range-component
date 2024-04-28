"use client";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      This is a range component. There are two versions. For the first one click
      on Exercise 1, for the second on Exercise 2.
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
