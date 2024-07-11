import styled from "@emotion/styled";

const Button = styled.button`
  color: red;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const StyledExample = () => {
  return <Button>Click Me</Button>;
};

export default StyledExample;
