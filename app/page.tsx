"use client";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      enter localhost:3000/exercise1 and localhost:3000/exercise2 in the browser
      to see the components.
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
