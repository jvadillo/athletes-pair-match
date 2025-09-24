
import React from "react";
import Card from "@/components/Card";
import Scoreboard from "@/components/Scoreboard";
import { CardType } from "@/utils/gameData";
import { useIsMobile } from "@/hooks/use-mobile";
import { GameState } from "./GameState";

interface GameContentProps {
  gameState: GameState;
  handleCardClick: (card: CardType) => void;
  restartGame: () => void;
  goToSplash: () => void;
  onViewRankings: (() => void) | null;
}

const GameContent: React.FC<GameContentProps> = ({
  gameState,
  handleCardClick,
  restartGame,
  goToSplash,
  onViewRankings
}) => {
  const isMobile = useIsMobile();
  const { 
    cards, isChecking, moves, time, score, playerName,
    gameMode, player2Name, player2Score, currentPlayer
  } = gameState;

  return (
    <div className={`container mx-auto ${isMobile ? 'px-0 py-0.5 h-[100svh] flex flex-col' : 'px-1 py-0.5 h-[100vh] flex flex-col'}`}>
      {isMobile ? (
        <div className="flex flex-col h-full">
          <div className="w-full h-[60px] mb-[10px]">
            <Scoreboard 
              moves={moves} 
              time={time} 
              score={score} 
              playerName={playerName}
              isMultiplayer={gameMode === "multiplayer"}
              player2Name={player2Name}
              player2Score={player2Score}
              currentPlayer={currentPlayer}
              restartGame={restartGame}
              goToSplash={goToSplash}
              onViewRankings={null}
              isMobile={true}
            />
          </div>
          
          <div className="h-[calc(100vh-80px)] w-full flex justify-center">
            <div className="grid grid-cols-3 grid-rows-4 gap-2 w-full h-full">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  disabled={isChecking}
                  showColors={true}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_3fr] flex-grow h-[95vh]">
          <div>
            <Scoreboard 
              moves={moves} 
              time={time} 
              score={score} 
              playerName={playerName}
              isMultiplayer={gameMode === "multiplayer"}
              player2Name={player2Name}
              player2Score={player2Score}
              currentPlayer={currentPlayer}
              restartGame={restartGame}
              goToSplash={goToSplash}
              onViewRankings={null}
              isMobile={false}
            />
          </div>
          
          <div style={{ alignItems: "start" }} className="relative flex-grow flex h-full justify-center items-center">
            <div className="grid grid-cols-4 gap-[.250rem] grid-rows-3">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  disabled={isChecking}
                  showColors={true}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContent;
