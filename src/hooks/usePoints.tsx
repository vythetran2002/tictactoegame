import React, { useEffect } from "react";
import { PlayerType } from "../sections/playground";
import { getCookie, setCookie } from "../utils/cookie-helper";

interface PlayerData {
  xPoint: number;
  yPoint: number;
}

function usePoints() {
  const [xPoint, setXPoint] = React.useState<number>(() => {
    const data = getCookie("playerData");
    if (data) {
      const parsed: PlayerData = JSON.parse(data);
      return parsed.xPoint;
    }
    return 0;
  });

  const [yPoint, setYPoint] = React.useState<number>(() => {
    const data = getCookie("playerData");
    if (data) {
      const parsed: PlayerData = JSON.parse(data);
      return parsed.yPoint;
    }
    return 0;
  });

  useEffect(() => {
    const playerData: PlayerData = {
      xPoint,
      yPoint,
    };
    setCookie("playerData", JSON.stringify(playerData), { path: "/" });
  }, [xPoint, yPoint]);

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
