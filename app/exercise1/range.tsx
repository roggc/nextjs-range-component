import styled from "styled-components";
import {
  FC,
  PropsWithChildren,
  forwardRef,
  useState,
  MouseEvent,
  useEffect,
  useRef,
} from "react";
import Bullet from "./bullet";
import { createPortal } from "react-dom";

interface BarProps {
  thickness?: number;
  color?: string;
  numberOfSteps?: number;
}

const Range: FC<BarProps> = ({
  thickness = 5,
  color = "black",
  numberOfSteps = 10,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const stepSize = (width ?? 0) / numberOfSteps;
  const [minStep, setMinStep] = useState(0);
  const [maxStep, setMaxStep] = useState(numberOfSteps);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [minMovementX, setMinMovementX] = useState(0);
  const bulletRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isMouseDown && barRef.current && bulletRef.current) {
      const barOffsetX =
        event.clientX - barRef.current.getBoundingClientRect().left;
      setMinMovementX(barOffsetX);
    }
  };

  useEffect(() => {
    setMinStep(Math.round(minMovementX / stepSize));
  }, [minMovementX]);

  useEffect(() => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      setWidth(rect.right - rect.left);
    }
  }, []);

  return (
    <>
      <SupraContainer>
        <Container thickness={thickness} color={color} {...props} ref={barRef}>
          <Bullet
            color="red"
            position={minStep * stepSize}
            onMouseDown={handleMouseDown}
            isMouseDown={isMouseDown}
            onMouseUp={handleMouseUp}
            ref={bulletRef}
          />
          <Bullet
            color="purple"
            position={maxStep * stepSize}
            onMouseDown={handleMouseDown}
            isMouseDown={isMouseDown}
            onMouseUp={handleMouseUp}
          />
        </Container>
      </SupraContainer>
      {createPortal(
        <Portal
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          isMouseDown={isMouseDown}
        />,
        document.body
      )}
    </>
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

interface PortalProps {
  onMouseUp: () => void;
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  isMouseDown: boolean;
}

const Portal = styled.div<PortalProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  ${({ isMouseDown }) => (isMouseDown ? "cursor:grabbing;" : "")}
`;

const SupraContainer = styled.div`
  padding: 10px;
`;

export default Range;
