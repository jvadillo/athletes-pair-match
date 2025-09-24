
import React, { useState } from "react";
import WinModal from "./WinModal";
import SplashScreen from "./SplashScreen";
import PlayerNameInput from "./PlayerNameInput";
import RankingTable from "./RankingTable";
import { useGameLogic } from "./game/useGameLogic";
import GameContent from "./game/GameContent";
import MultiplayerWinModal from "./game/MultiplayerWinModal";
import { saveGameResult } from "./game/GameResultService";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "./LanguageSelector";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const GameBoard: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [showNameInput, setShowNameInput] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState<"single" | "multiplayer">("single");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const {
    gameState,
    showSplash,
    showRankings,
    showCountdown,
    countdownValue,
    handleStartGame,
    goToSplash,
    handleCardClick,
    restartGame,
    setGameWon,
    handleViewRankings,
    handleBackFromRankings,
    setShowRankings
  } = useGameLogic();

  const {
    moves, time, playerName, gameWon, gameMode,
    player2Score, score, winnerName
  } = gameState;

  const handleSaveScore = async () => {
    await saveGameResult(playerName, time, moves, t);
  };

  const handleSelectGameMode = (mode: "single" | "multiplayer") => {
    setSelectedGameMode(mode);
    setShowNameInput(true);
  };

  const handleStartGameFlow = (name: string, mode: "single" | "multiplayer") => {
    handleStartGame(name, mode);
    setShowNameInput(false);
  };

  const handleBackToSplash = () => {
    setShowNameInput(false);
  };

  const handleSelectLanguage = () => {
    setShowLanguageSelector(true);
  };

  const getCountdownText = () => {
    return countdownValue === 0 ? "GO!" : countdownValue.toString();
  };

  // Handler for when the multiplayer game modal is closed - go back to splash screen
  const handleMultiplayerModalClose = () => {
    setGameWon(false);
    goToSplash(); // This will take us back to the home screen
  };

  if (showLanguageSelector) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <LanguageSelector standalone={true} onClose={() => setShowLanguageSelector(false)} />
        </div>
      </div>
    );
  }

  if (showRankings) {
    return (
      <div className={`flex justify-center ${isMobile ? 'items-start pt-0' : 'items-center min-h-[60vh]'}`}>
        <RankingTable onBack={handleBackFromRankings} />
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <PlayerNameInput 
          gameMode={selectedGameMode}
          onStartGame={handleStartGameFlow}
          onBack={handleBackToSplash}
        />
      </div>
    );
  }

  if (showSplash) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <SplashScreen 
          onStartGame={handleStartGame} 
          onViewRankings={() => setShowRankings(true)}
          onSelectGameMode={handleSelectGameMode}
          onSelectLanguage={handleSelectLanguage}
        />
      </div>
    );
  }

  return (
    <>
      <GameContent 
        gameState={gameState}
        handleCardClick={handleCardClick}
        restartGame={restartGame}
        goToSplash={goToSplash}
        onViewRankings={null}
      />
      
      <AnimatePresence>
        {showCountdown && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              key={countdownValue}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                color: "#ffffff" // Changed from conditionally using green to always white
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <motion.div 
                className="text-8xl font-bold drop-shadow-lg"
                animate={{ 
                  fontSize: countdownValue === 0 ? "7rem" : "6rem"
                }}
              >
                {getCountdownText()}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {gameMode === "single" ? (
        <WinModal
          isOpen={gameWon}
          moves={moves}
          time={time}
          onClose={() => setGameWon(false)}
          onRestart={restartGame}
          playerName={playerName}
          onViewRankings={handleViewRankings}
          onSaveScore={handleSaveScore}
        />
      ) : (
        <MultiplayerWinModal
          isOpen={gameWon}
          onClose={handleMultiplayerModalClose}
          onRestart={restartGame}
          score={score}
          player2Score={player2Score}
          winnerName={winnerName}
        />
      )}
    </>
  );
};

export default GameBoard;
