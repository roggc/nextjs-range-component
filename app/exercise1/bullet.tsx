import { forwardRef } from "react";
import styled from "styled-components";

interface BulletProps {
  color?: string;
  dimension?: number;
  position: number;
  onMouseDown: () => void;
  isMouseDown: boolean;
  onMouseUp: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isBig?: boolean;
}

const Bullet = forwardRef<HTMLDivElement, BulletProps>(
  (
    {
      color = "black",
      dimension = 20,
      position,
      onMouseDown,
      isMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
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
        onMouseDown={onMouseDown}
        isMouseDown={isMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isBig={isBig}
        ref={ref}
        {...props}
      />
    );
  }
);

interface ContainerProps {
  color: string;
  dimension: number;
  position: number;
  onMouseDown: () => void;
  isMouseDown: boolean;
  onMouseUp: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
  opacity: 0.2;
  cursor: ${({ isMouseDown }) => (isMouseDown ? "grabbing" : "grab")};
`;

export default Bullet;
