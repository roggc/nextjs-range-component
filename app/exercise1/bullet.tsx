import { FC } from "react";
import styled from "styled-components";

interface BulletProps {
  color?: string;
  dimension?: number;
  position: number;
}

const Bullet: FC<BulletProps> = ({
  color = "black",
  dimension = 20,
  position,
  ...props
}) => {
  return (
    <Container
      color={color}
      dimension={dimension}
      position={position}
      {...props}
    />
  );
};

interface ContainerProps {
  color: string;
  dimension: number;
  position: number;
}

const Container = styled(
  ({ color, dimension, position, ...props }: ContainerProps) => (
    <div {...props} />
  )
)`
  border-radius: 50%;
  width: ${({ dimension }) => dimension}px;
  height: ${({ dimension }) => dimension}px;
  background-color: ${({ color }) => color};
  position: absolute;
  top: 0;
  left: ${({ position }) => position}px;
  transform: translate(-47%, -36%);
  opacity: 0.2;
`;

export default Bullet;
