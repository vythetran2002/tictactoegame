import React from "react";
import { PlayerType } from "../sections/playground";

function usePoints() {
  const [xPoint, setXPoint] = React.useState(0);
  const [yPoint, setYPoint] = React.useState(0);

  const handleUpdateScore = (player: PlayerType) => {
    if (player === "X") {
      setXPoint((prev) => prev + 1);
    } else {
      setYPoint((prev) => prev + 1);
    }
  };

  const handleResetScore = () => {
    setXPoint(0);
    setYPoint(0);
  };

  return {
    xPoint,
    yPoint,
    handleUpdateScore,
    handleResetScore,
  };
}

export default usePoints;
