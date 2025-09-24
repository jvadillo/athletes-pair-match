
import React from "react";
import MobileScoreboard from "./scoreboard/MobileScoreboard";
import DesktopScoreboard from "./scoreboard/DesktopScoreboard";
import { ScoreboardProps } from "./scoreboard/ScoreboardProps";

const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  const { isMobile = false } = props;
  
  if (isMobile) {
    return <MobileScoreboard {...props} />;
  }

  return <DesktopScoreboard {...props} />;
};

export default Scoreboard;
