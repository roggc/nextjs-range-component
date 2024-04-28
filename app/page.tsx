"use client";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <SupraContainer>
      <Container>
        This is a range component. There are two versions. For the first one
        click on Exercise 1, for the second on Exercise 2.
      </Container>
      <Container>
        <div>
          Units tests for these components can be found{" "}
          <Link
            href="https://github.com/roggc/nextjs-range-component-test"
            target="_blank"
          >
            here
          </Link>
          .
        </div>
      </Container>
    </SupraContainer>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SupraContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
