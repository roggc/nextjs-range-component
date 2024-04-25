import styled from "styled-components";
import { FC, PropsWithChildren, forwardRef, useState } from "react";
import Bullet from "./bullet";
import { useMeasure } from "@uidotdev/usehooks";

interface BarProps {
  thickness?: number;
  color?: string;
  numberOfSteps?: number;
}

const Range: FC<BarProps> = ({
  thickness = 5,
  color = "black",
  numberOfSteps = 100,
  ...props
}) => {
  const [ref, { width }] = useMeasure();
  const stepSize = (width ?? 0) / numberOfSteps;
  const [minStep, setMinStep] = useState(0);
  const [maxStep, setMaxStep] = useState(numberOfSteps);

  return (
    <Container thickness={thickness} color={color} {...props} ref={ref}>
      <Bullet color="red" position={minStep * stepSize} />
      <Bullet color="purple" position={maxStep * stepSize} />
    </Container>
  );
};

interface ContainerProps {
  thickness: number;
  color: string;
}

const Container = styled(
  forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ thickness, color, ...props }, ref) => <div ref={ref} {...props} />
  )
)`
  height: ${({ thickness }) => thickness}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ thickness }) => thickness}px;
  position: relative;
`;

export default Range;
