import {
  forwardRef,
  PropsWithChildren,
  useState,
  InputHTMLAttributes,
  HTMLAttributes,
  useEffect,
  RefObject,
} from "react";
import styled from "styled-components";
import { useClickAway } from "@uidotdev/usehooks";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  setValue: (value: number) => void;
  setStep: (value: number) => void;
  min: number;
  max: number;
  absoluteMin: number;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  isAlignRight?: boolean;
}

const Label = forwardRef<HTMLDivElement, LabelProps>(
  (
    {
      value,
      setValue,
      setStep,
      min,
      max,
      absoluteMin,
      minWidth,
      maxWidth,
      maxHeight,
      isAlignRight = false,
      ...props
    },
    ref
  ) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const innerRef = useClickAway(() =>
      setIsEditMode(false)
    ) as RefObject<HTMLDivElement>;
    const [editValue, setEditValue] = useState(value.toString());

    useEffect(() => {
      const newEditValue = parseInt(editValue, 10);
      if (
        !isEditMode &&
        !isNaN(newEditValue) &&
        newEditValue >= min &&
        newEditValue <= max
      ) {
        setValue(newEditValue);
        setStep(newEditValue - absoluteMin);
      } else if (!isEditMode) {
        setEditValue(value.toString());
      }
    }, [editValue, isEditMode, min, max, absoluteMin]);

    useEffect(() => {
      setEditValue(value.toString());
    }, [value]);

    return (
      <SupraContainer ref={ref} {...props}>
        <Container
          ref={innerRef}
          minWidth={minWidth}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          isAlignRight={isAlignRight}
          onClick={() => setIsEditMode(true)}
        >
          {isEditMode ? (
            <Input
              maxWidth={maxWidth}
              type="number"
              max={max}
              min={min}
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
            />
          ) : (
            <Text>{value}€</Text>
          )}
        </Container>
      </SupraContainer>
    );
  }
);

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  isAlignRight: boolean;
}

const Container = styled(
  forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ minWidth, maxWidth, maxHeight, isAlignRight, ...props }, ref) => (
      <div ref={ref} {...props} />
    )
  )
)`
  ${({ minWidth }) => (minWidth ? `min-width:${minWidth}px;` : "")}
  ${({ maxWidth }) => (maxWidth ? `max-width:${maxWidth}px;` : "")}
  ${({ maxHeight }) => (maxHeight ? `max-height:${maxHeight}px;` : "")}
  display:flex;
  align-items: center;
  ${({ isAlignRight }) => (isAlignRight ? "justify-content:flex-end;" : "")}
  user-select:none;
`;

const Text = styled.div`
  border: 1px solid white;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: number;
}

const Input = styled(({ maxWidth, ...props }: InputProps) => (
  <input {...props} />
))`
  ${({ maxWidth }) => (maxWidth ? `max-width:${maxWidth}px;` : "")}
`;

const SupraContainer = styled.div`
  cursor: pointer;
  z-index: 1;
`;

export default Label;
