import { useEffect, useState } from "react";
import Square from "../components/Square";
import styled from "styled-components";

const StyledBoard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: #07001e;
  color: white;
`;

const StyledSqaureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 9.5rem);
  grid-template-rows: repeat(3, 9.5rem);
  grid-gap: 1rem;
`;

const StyledText = styled.span`
  font-size: 2rem;
  margin-top: 2rem;
`;

const StyledButton = styled.button`
  font-size: 2rem;
  background-color: #07001e;
  color: white;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #07001e;
  }
`;

export type Player = "X" | "O" | "Tie" | null;

const determineWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random()) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);
  const [winnerHistory, setWinnerHistory] = useState<Player[]>([]);

  useEffect(() => {
    const possibleWinner = determineWinner(squares);
    if (possibleWinner) {
      setWinner(possibleWinner);
      setWinnerHistory([...winnerHistory, possibleWinner]);
    } else if (!squares.includes(null) && squares.length >= 5) {
      setWinner("Tie");
      setWinnerHistory([...winnerHistory, "Tie"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  const handleClick = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer(Math.round(Math.random()) === 1 ? "X" : "O");
    setWinner(null);
  };

  return (
    <StyledBoard>
      {!winner && <StyledText>On turn: {currentPlayer}</StyledText>}
      {winner === "Tie" && <StyledText>It's a tie!</StyledText>}
      {winner && winner !== "Tie" && <StyledText>{winner} won!</StyledText>}
      <StyledSqaureWrapper>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => handleClick(i)}
                value={squares[i]}
              />
            );
          })}
      </StyledSqaureWrapper>
      <StyledButton onClick={handleReset}>Reset</StyledButton>
      <span>
        X:{winnerHistory.filter((x) => x === "X").length} | Tie:
        {winnerHistory.filter((tie) => tie === "Tie").length} | O:
        {winnerHistory.filter((o) => o === "O").length}
      </span>
    </StyledBoard>
  );
}

export default Board;
