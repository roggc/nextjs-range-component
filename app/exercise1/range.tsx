import styled from "styled-components";
import {
  FC,
  PropsWithChildren,
  forwardRef,
  useState,
  MouseEvent,
  useEffect,
  useRef,
  useReducer,
  Reducer,
} from "react";
import Bullet from "./bullet";
import { createPortal } from "react-dom";

const BULLET_DIMENSION = 20;

type BulletSizePropsActionPayload = [boolean];

type BulletSizeProps = {
  isBig: boolean;
  dimension: number;
};

type BulletSizePropsAction = {
  type: "SET_IS_BIG";
  payload: BulletSizePropsActionPayload[0];
};

const bulletSizePropsReducer = (
  state: BulletSizeProps,
  action: BulletSizePropsAction
): BulletSizeProps => {
  switch (action.type) {
    case "SET_IS_BIG":
      if (action.payload) {
        return { ...state, isBig: true, dimension: state.dimension * 1.5 };
      }
      return { ...state, isBig: false, dimension: BULLET_DIMENSION };
    default:
      return state;
  }
};

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
  const [hover, setHover] = useState(false);
  const isHoverDirtyRef = useRef(false);
  const [bulletSizeProps, dispatchBulletSizeProps] = useReducer<
    Reducer<BulletSizeProps, BulletSizePropsAction>
  >(bulletSizePropsReducer, { isBig: false, dimension: BULLET_DIMENSION });

  const handleMouseEnter = () => {
    setHover(true);
    isHoverDirtyRef.current = true;
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

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

  useEffect(() => {
    if (hover && !bulletSizeProps.isBig) {
      dispatchBulletSizeProps({ type: "SET_IS_BIG", payload: true });
    } else if (isHoverDirtyRef.current && !isMouseDown && !hover) {
      dispatchBulletSizeProps({ type: "SET_IS_BIG", payload: false });
    }
  }, [hover, isMouseDown]);

  return (
    <>
      <SupraContainer>
        <Container
          thickness={thickness}
          color={color}
          ref={barRef}
          onMouseUp={handleMouseUp}
          isMouseDown={isMouseDown}
          {...props}
        >
          <Bullet
            color="red"
            position={minStep * stepSize}
            onMouseDown={handleMouseDown}
            isMouseDown={isMouseDown}
            onMouseUp={handleMouseUp}
            ref={bulletRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            dimension={bulletSizeProps.dimension}
            isBig={bulletSizeProps.isBig}
          />
          <Bullet
            color="purple"
            position={maxStep * stepSize}
            onMouseDown={handleMouseDown}
            isMouseDown={isMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
  onMouseUp: () => void;
  isMouseDown: boolean;
}

const Container = styled(
  forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ thickness, color, isMouseDown, ...props }, ref) => (
      <div ref={ref} {...props} />
    )
  )
)`
  height: ${({ thickness }) => thickness}px;
  background-color: ${({ color }) => color};
  border-radius: ${({ thickness }) => thickness}px;
  position: relative;
  ${({ isMouseDown }) => (isMouseDown ? "cursor:grabbing;" : "")}
`;

interface PortalProps {
  onMouseUp: () => void;
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  isMouseDown: boolean;
}

const Portal = styled(({ isMouseDown, ...props }: PortalProps) => (
  <div {...props} />
))`
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
