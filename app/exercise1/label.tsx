import { FC } from "react";
import styled from "styled-components";

type LabelProps = {
  value: number;
  setValue: (value: number) => void;
};

const Label: FC<LabelProps> = ({ value, setValue, ...props }) => {
  return <Container {...props}>{value}€</Container>;
};

const Container = styled.div``;

export default Label;
