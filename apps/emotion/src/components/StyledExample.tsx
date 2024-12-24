import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

const Button = styled.button`
  color: white;
  background-color: red;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
interface StyledExampleProps {
  onClick?: () => void
}
const StyledExample = ({children, onClick}:PropsWithChildren<StyledExampleProps>) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default StyledExample;
