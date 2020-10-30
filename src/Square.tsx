import React from "react";

interface Props {
  value: "X" | "O" | null;
  onClick: () => void
}

const Square: React.FC<Props> = ({value, onClick}) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;