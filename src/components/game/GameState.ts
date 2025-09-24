
import { CardType } from "@/utils/gameData";

export type GameMode = "single" | "multiplayer";

export interface GameState {
  cards: CardType[];
  flippedCards: CardType[];
  moves: number;
  time: number;
  score: number;
  player2Score: number;
  gameStarted: boolean;
  gameWon: boolean;
  isChecking: boolean;
  playerName: string;
  player2Name: string;
  currentPlayer: number;
  winnerName: string;
  gameMode: GameMode;
}

export const initialGameState: GameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  time: 0,
  score: 0,
  player2Score: 0,
  gameStarted: false,
  gameWon: false,
  isChecking: false,
  playerName: "",
  player2Name: "Player 2",
  currentPlayer: 1,
  winnerName: "",
  gameMode: "single"
};
