import React, { useState } from "react";
import Square from "./Square";

type SquareValue = null | "X" | "O";

const Board: React.FC = () => {
  // Explicitly define type of squares by passing into useState's generic
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Func takes an arg of type SquareValue array, returns value of type SquareValue
  const calculateWinner = (squares: SquareValue[]): SquareValue => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number): void => {
    // Return early if game won or square already filled
    if (calculateWinner(squares || squares[i])) return;
    const newSquares = [...squares];
    // Fill the square with X or O, depending on whose turn it is
    newSquares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };

  // Explicitly declares that func returns JSX
  const renderSquare = (i: number): JSX.Element => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else status = `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
