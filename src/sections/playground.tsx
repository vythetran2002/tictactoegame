import React, { useState } from "react";
import { calculateWinner } from "../utils/calculateWinner";
import Cell from "../components/cell";

function Playground() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div
            key={index}
            className="w-24 h-24 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Cell index={index} handleClick={handleClick} board={board} />
          </div>
        ))}
      </div>
      <div className="text-2xl font-semibold text-center text-gray-800">
        {status}
      </div>
    </div>
  );
}

export default Playground;
