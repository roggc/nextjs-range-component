"use client";
import styled from "styled-components";
import Link from "next/link";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface MyLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const MyLayout: FC<PropsWithChildren<MyLayoutProps>> = ({
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Header>
        <Link href="/">Home</Link>
        <Link href="/exercise1">Exercise 1</Link>
        <Link href="/exercise2">Exercise 2</Link>
      </Header>
      <Main>{children}</Main>
      <Footer>2024 Roger Gómez Castells</Footer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 2px solid black;
  z-index: 1;
  padding: 10px;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Footer = styled.div`
  border-top: 2px solid black;
  padding: 10px;
`;

export default MyLayout;
