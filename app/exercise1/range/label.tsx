import {
  forwardRef,
  PropsWithChildren,
  useState,
  InputHTMLAttributes,
  HTMLAttributes,
  useEffect,
} from "react";
import styled from "styled-components";
import { useClickAway } from "@uidotdev/usehooks";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  setValue: (value: number) => void;
  setStep: (value: number) => void;
  min: number;
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
      minWidth,
      maxWidth,
      maxHeight,
      isAlignRight = false,
      ...props
    },
    ref
  ) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const innerRef = useClickAway(() => setIsEditMode(false));
    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
      if (!isEditMode) {
        setValue(editValue);
        setStep(editValue - min);
      }
    }, [editValue, isEditMode, min]);

    useEffect(() => {
      setEditValue(value);
    }, [value]);

    return (
      <SupraContainer ref={ref} {...props}>
        <Container
          // @ts-ignore
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
              value={editValue}
              onChange={(event) =>
                setEditValue(parseInt(event.target.value, 10))
              }
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
