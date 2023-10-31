import styled from "styled-components";
import { Player } from "../containers/Board";

const StyledSquare = styled.button`
  width: 10rem;
  height: 10rem;
  font-size: 5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: #fff 0 0 0.25rem;
  background-color: white;
  color: black;
  &:disabled {
    background-color: #ccc;
  }
  &:hover {
    background-color: #a1a1a1;
  }
`;

function Square({
  value,
  onClick,
  winner,
}: {
  value: Player;
  onClick: () => void;
  winner: Player;
}) {
  if (!value) {
    return <StyledSquare onClick={onClick} disabled={Boolean(winner)} />;
  }
  return <StyledSquare disabled>{value}</StyledSquare>;
}

export default Square;
