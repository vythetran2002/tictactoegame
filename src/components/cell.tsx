import React from "react";
import { X, Circle } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface CellProps {
  index: number;
  handleClick: (index: number) => void;
  board: (string | null)[];
}

const Cell: React.FC<CellProps> = ({ index, handleClick, board }) => {
  const { isSM, isXS } = useBreakpoint();

  return (
    <button
      className="w-full h-full flex items-center justify-center text-4xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 "
      onClick={() => handleClick(index)}
    >
      {board[index] === "X" && (
        <X className="text-blue-500" size={isSM ? 60 : isXS ? 50 : 30} />
      )}
      {board[index] === "O" && (
        <Circle className="text-red-500" size={isSM ? 60 : isXS ? 50 : 30} />
      )}
    </button>
  );
};

export default Cell;
