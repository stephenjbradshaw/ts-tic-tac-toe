import React, { useState } from "react";
import Board from "./Board";

type SquareValue = null | "X" | "O";
interface historyItem {
  squares: SquareValue[];
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<historyItem[]>([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number): void => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat([{ squares }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // I like how the tutorial stores the elements in a variable here, avoiding cluttering up the render method's return statement.
  const moves = history.map((step, moveIndex) => {
    const desc = moveIndex ? "Go to move #" + moveIndex : "go to game start";
    return (
      <li key={moveIndex}>
        <button onClick={() => jumpTo(moveIndex)}>{desc}</button>
      </li>
    );
  });

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number): void => {
            handleClick(i);
          }}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
