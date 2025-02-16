import React, { useEffect, useMemo, useState } from "react";
import { calculateWinner } from "../utils/calculateWinner";
import Cell from "../components/cell";
import PlayerProfile from "../components/player-profile";
import { motion, AnimatePresence } from "framer-motion";
import usePoints from "../hooks/usePoints";
import toast from "react-hot-toast";

export type PlayerType = "X" | "O";

function Playground() {
  const [board, setBoard] = useState<(PlayerType | null)[]>(
    Array(9).fill(null),
  );
  const { xPoint, yPoint, handleUpdateScore, handleResetScore } = usePoints();
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const winner = useMemo(() => {
    return calculateWinner(board);
  }, [board]);

  const handleClick = (index: number) => {
    if (winner) {
      return;
    }
    if (board[index]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const isGameFinished = winner || board.every(Boolean);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetScore = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    handleResetScore();
  };

  useEffect(() => {
    if (winner) {
      handleUpdateScore(winner);
      toast(
        (t) => (
          <span className="text-slate-900 text-lg font-medium">
            Player{" "}
            <span
              className={`${winner === "O" ? "text-red-500" : "text-blue-500"}`}
            >
              {winner}
            </span>{" "}
            has won
          </span>
        ),
        {
          duration: 3000,
          icon: "🎉",
        },
      );
      return;
    }
    if (board.every(Boolean)) {
      toast(
        (t) => (
          <span className="text-slate-900 text-lg font-medium">
            It's a tie!
          </span>
        ),
        {
          duration: 3000,
          icon: "🤝",
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={xPoint}
            initial={{ y: 50, opacity: 0, scale: 0.3 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <span className="text-6xl font-bold text-white">{xPoint}</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={yPoint}
            initial={{ y: 50, opacity: 0, scale: 0.3 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <span className="text-6xl font-bold text-white">{yPoint}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-white rounded-lg shadow-2xl p-5 xs:p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div
              key={index}
              className="xs:w-20 xs:h-20 sm:w-24 sm:h-24 w-12 h-12 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Cell index={index} handleClick={handleClick} board={board} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-between gap-2">
        <PlayerProfile role="X" score={xPoint} />
        <PlayerProfile isReversed role="O" score={yPoint} />
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={resetScore}
          disabled={!isGameFinished}
          type="button"
          className="text-white bg-blue-600 disabled:bg-blue-700/80 disabled:cursor-not-allowed hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Reset score
        </button>
        <button
          onClick={resetGame}
          disabled={!isGameFinished}
          type="button"
          className="focus:outline-none text-white disabled:bg-green-700/80 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Reset game
        </button>
      </div>
    </div>
  );
}

export default Playground;
