import { forwardRef, PropsWithChildren } from "react";
import styled from "styled-components";

type LabelProps = {
  value: number;
  setValue: (value: number) => void;
  minWidth?: number;
  isAlignRight?: boolean;
};

const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ value, setValue, minWidth, isAlignRight = false, ...props }, ref) => {
    return (
      <Container
        ref={ref}
        minWidth={minWidth}
        isAlignRight={isAlignRight}
        {...props}
      >
        <Text>{value}€</Text>
      </Container>
    );
  }
);

type ContainerProps = {
  minWidth?: number;
  isAlignRight: boolean;
};

const Container = styled(
  forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ minWidth, isAlignRight, ...props }, ref) => <div ref={ref} {...props} />
  )
)`
  ${({ minWidth }) => (minWidth ? `min-width:${minWidth}px;` : "")}
  display:flex;
  align-items: center;
  ${({ isAlignRight }) => (isAlignRight ? "justify-content:flex-end;" : "")}
  user-select:none;
`;

const Text = styled.div``;

export default Label;
