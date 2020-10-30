import React from "react";

type SquareValue = null | "X" | "O";

interface Props {
  value: SquareValue;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
