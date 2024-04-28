import { HTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

interface BulletProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  dimension?: number;
  position: number;
  isMouseDown: boolean;
  isBig?: boolean;
}

const Bullet = forwardRef<HTMLDivElement, BulletProps>(
  (
    {
      color = "black",
      dimension = 20,
      position,
      isMouseDown,
      isBig = false,
      ...props
    },
    ref
  ) => {
    return (
      <Container
        color={color}
        dimension={dimension}
        position={position}
        isMouseDown={isMouseDown}
        isBig={isBig}
        ref={ref}
        {...props}
      />
    );
  }
);

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  color: string;
  dimension: number;
  position: number;
  isMouseDown: boolean;
  isBig: boolean;
}

const Container = styled(
  forwardRef<HTMLDivElement, ContainerProps>(
    ({ color, dimension, position, isMouseDown, isBig, ...props }, ref) => (
      <div ref={ref} {...props} />
    )
  )
)`
  border-radius: 50%;
  width: ${({ dimension }) => dimension}px;
  height: ${({ dimension }) => dimension}px;
  background-color: ${({ color }) => color};
  position: absolute;
  top: 0;
  left: ${({ position }) => position}px;
  ${({ isBig }) => `transform: translate(-47%, -${isBig ? 39 : 36}%);`}
  cursor: ${({ isMouseDown }) => (isMouseDown ? "grabbing" : "grab")};
  z-index: 1;
`;

export default Bullet;
