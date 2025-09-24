
import { ReactNode } from "react";

export interface ScoreboardProps {
  moves: number;
  time: number;
  score: number;
  playerName?: string;
  isMultiplayer?: boolean;
  player2Name?: string;
  player2Score?: number;
  currentPlayer?: number;
  restartGame: () => void;
  goToSplash?: () => void;
  onViewRankings?: () => void;
  isMobile?: boolean;
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
