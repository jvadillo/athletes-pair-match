
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, User, ArrowLeft, Trophy, Hourglass, X, Check, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScoreboardProps, formatTime } from "./ScoreboardProps";

const DesktopScoreboard: React.FC<ScoreboardProps> = ({ 
  moves, 
  time, 
  score, 
  playerName = "Player",
  isMultiplayer = false,
  player2Name = "Player 2",
  player2Score = 0,
  currentPlayer = 1,
  restartGame,
  goToSplash,
  onViewRankings
}) => {
  const { t } = useLanguage();
  
  // Calculate failed moves
  const failedMoves = moves - score;

  return (
    <div className="animate-fade-in flex flex-col rounded-xl bg-white p-5 shadow-md scoreboard-content">
      <div className="mb-4 text-center">
        <h2 className="flex items-center justify-center mb-1">
          <span className="font-dancing text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">Eureka</span>
          <Lightbulb className="mx-2 h-8 w-8 text-[#9334ea]" strokeWidth={1.5} />
          <span className="font-dancing text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">Girls</span>
        </h2>
        <p className="text-sm text-gray-500 app-description">{t("appDescription")}</p>
      </div>
      
      {isMultiplayer ? (
        <div className="mb-4">
          <div className={`mb-3 flex items-center justify-center rounded-lg p-2 ${currentPlayer === 1 ? 'bg-gamePurple/10' : 'bg-gray-50'}`}>
            <User className={`h-4 w-4 mr-2 ${currentPlayer === 1 ? 'text-gamePurple' : 'text-gray-500'}`} />
            <p className={`font-medium truncate ${currentPlayer === 1 ? 'text-gamePurple' : 'text-gray-500'}`}>
              {playerName}: {score}
            </p>
          </div>
          <div className={`mb-3 flex items-center justify-center rounded-lg p-2 ${currentPlayer === 2 ? 'bg-gamePurple/10' : 'bg-gray-50'}`}>
            <User className={`h-4 w-4 mr-2 ${currentPlayer === 2 ? 'text-gamePurple' : 'text-gray-500'}`} />
            <p className={`font-medium truncate ${currentPlayer === 2 ? 'text-gamePurple' : 'text-gray-500'}`}>
              {player2Name}: {player2Score}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-2 sm:p-3 text-center">
            <p className="text-xs font-medium uppercase text-gray-500">{t("currentTurn")}</p>
            <p className="text-base sm:text-lg font-bold text-gray-800">{t("player")} {currentPlayer}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-center bg-gray-50 rounded-lg p-2">
            <User className="h-4 w-4 mr-2 text-gamePurple" />
            <p className="font-medium text-gamePurple truncate">{playerName}</p>
          </div>
          
          <div className="mb-3 rounded-lg bg-[#D3E4FD] p-2 sm:p-3 text-center">
            <div className="flex items-center justify-center">
              <Hourglass className="h-4 w-4 mr-2 text-[#0EA5E9]" />
              <p className="text-xs font-medium uppercase text-[#0EA5E9]">{t("time")}</p>
            </div>
            <p className="text-base sm:text-xl font-bold text-[#0E7CC7]">{formatTime(time)}</p>
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-2 sm:gap-4">
            <div className="rounded-lg bg-gray-50 p-2 sm:p-3 text-center">
              <div className="flex items-center justify-center">
                <X className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-xs font-medium uppercase text-gray-500">{t("moves")}</p>
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-800">{failedMoves}</p>
            </div>
            <div className="rounded-lg bg-gamePurple/10 p-2 sm:p-3 text-center">
              <div className="flex items-center justify-center">
                <Check className="h-4 w-4 mr-2 text-gamePurple" />
                <p className="text-xs font-medium uppercase text-gamePurple">{t("score")}</p>
              </div>
              <p className="text-base sm:text-lg font-bold text-gamePurple">{score}</p>
            </div>
          </div>
        </>
      )}
      
      <Button 
        onClick={restartGame}
        variant="outline" 
        className="group mt-2 w-full border-gamePurple text-gamePurple hover:bg-gamePurple hover:text-white"
      >
        <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
        {t("restartGame")}
      </Button>
      
      {!isMultiplayer && onViewRankings && (
        <Button 
          onClick={onViewRankings}
          variant="outline" 
          className="group mt-2 w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50"
        >
          <Trophy className="mr-2 h-4 w-4" />
          {t("viewRankings")}
        </Button>
      )}
      
      {goToSplash && (
        <Button 
          onClick={goToSplash}
          variant="outline" 
          className="group mt-2 w-full border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToWelcome")}
        </Button>
      )}
    </div>
  );
};

export default DesktopScoreboard;
