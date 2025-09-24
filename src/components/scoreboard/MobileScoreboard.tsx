
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft, Trophy, Menu, Hourglass, X, Check, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScoreboardProps, formatTime } from "./ScoreboardProps";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileScoreboard: React.FC<ScoreboardProps> = ({ 
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
  const isMobile = useIsMobile();
  
  // Calculate failed moves
  const failedMoves = moves - score;

  return (
    <div className="bg-purple-600 p-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isMultiplayer ? (
          isMobile ? (
            // Mobile multiplayer view with abbreviated player names
            <div className="flex space-x-2">
              <span className={`bg-white rounded-full px-3 py-1 text-purple-600 font-medium flex items-center ${currentPlayer === 1 ? 'ring-2 ring-yellow-300' : ''}`}>
                {currentPlayer === 1 && <User className="h-4 w-4 mr-1 text-purple-600" />}
                {`${t("player1Short")}: ${score}`}
              </span>
              <span className={`bg-white rounded-full px-3 py-1 text-purple-600 font-medium flex items-center ${currentPlayer === 2 ? 'ring-2 ring-yellow-300' : ''}`}>
                {currentPlayer === 2 && <User className="h-4 w-4 mr-1 text-purple-600" />}
                {`${t("player2Short")}: ${player2Score}`}
              </span>
            </div>
          ) : (
            // Desktop multiplayer view
            <div className="flex items-center text-xs scoreboard-text">
              <span className={`font-medium ${currentPlayer === 1 ? 'text-gamePurple' : 'text-gray-500'}`}>
                {playerName}: {score}
              </span>
              <span className="mx-1 text-gray-400">|</span>
              <span className={`font-medium ${currentPlayer === 2 ? 'text-gamePurple' : 'text-gray-500'}`}>
                {player2Name}: {player2Score}
              </span>
              <span className="mx-1 text-gray-400">|</span>
              <span className="text-xs text-gray-500 scoreboard-text">{t("currentTurn")}: {currentPlayer}</span>
            </div>
          )
        ) : (
          // Single player view
          <div className="flex items-center gap-3">
            <span className="bg-white rounded-full px-3 py-1 text-purple-600 font-medium flex items-center">
              <Hourglass className="h-5 w-5 mr-1.5" />
              <span className="score-text">{formatTime(time)}</span>
            </span>
            
            <span className="bg-white rounded-full px-3 py-1 text-purple-600 font-medium flex items-center">
              <X className="h-5 w-5 mr-1.5" />
              <span className="score-text">{failedMoves}</span>
            </span>
            
            <span className="bg-white rounded-full px-3 py-1 text-purple-600 font-medium flex items-center">
              <Check className="h-5 w-5 mr-1.5" />
              <span className="score-text">{score}</span>
            </span>
          </div>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full text-white"
          >
            <Menu className="h-7 w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={restartGame}>
            <RefreshCw className="mr-2 h-4 w-4 mobile-icon" />
            {t("restartGame")}
          </DropdownMenuItem>
          
          {!isMultiplayer && onViewRankings && (
            <DropdownMenuItem onClick={onViewRankings}>
              <Trophy className="mr-2 h-4 w-4 mobile-icon" />
              {t("viewRankings")}
            </DropdownMenuItem>
          )}
          
          {goToSplash && (
            <DropdownMenuItem onClick={goToSplash}>
              <ArrowLeft className="mr-2 h-4 w-4 mobile-icon" />
              {t("backToWelcome")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileScoreboard;
