
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Trophy, Home } from "lucide-react";
import { saveGameCompletion, countBetterCompletions, getTotalCompletions } from "@/lib/api-client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  playerName?: string;
  onClose: () => void;
  onRestart: () => void;
  onViewRankings: () => void;
  onSaveScore?: () => Promise<void>;
}

const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  moves,
  time,
  playerName = "Player",
  onClose,
  onRestart,
  onViewRankings,
  onSaveScore,
}) => {
  const { t } = useLanguage();
  const [rank, setRank] = useState<number | null>(null);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const saveScore = useCallback(async () => {
    if (!isOpen || scoreSaved) return;
    
    setIsLoading(true);
    
    try {
      // Save game completion and get rank info in one call
      const { data, error } = await saveGameCompletion(playerName, time, moves);
        
      if (error || !data) {
        throw new Error(error?.detail || "Failed to save score");
      }
      
      // Set rank and total players from response
      setRank(data.rank || null);
      setTotalPlayers(data.total_players || 0);
      setScoreSaved(true);
      
      toast.success(t("scoreHasBeenSaved"));
    } catch (error) {
      console.error("Error saving score:", error);
      toast.error(t("failedToSaveScore"));
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, scoreSaved, playerName, time, moves, t]);

  useEffect(() => {
    if (isOpen && !scoreSaved) {
      saveScore();
    }
  }, [isOpen, saveScore, scoreSaved]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="animate-scale-up relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gamePurple">{t("congratulations")}, {playerName}!</h2>
          <p className="mt-2 text-gray-600">
            {t("matchedAllPairs")}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm font-medium uppercase text-gray-500">{t("time")}</p>
            <p className="text-xl font-bold text-gray-800">{formatTime(time)}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm font-medium uppercase text-gray-500">{t("moves")}</p>
            <p className="text-xl font-bold text-gray-800">{moves}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="mb-6 text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gamePurple mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">{t("savingScore")}</p>
          </div>
        ) : rank ? (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <p className="font-bold text-gamePurple">
                {t("yourRank")}: {rank}/{totalPlayers}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {rank === 1 
                ? t("rankBest") 
                : rank <= 3 
                  ? t("rankTop") 
                  : t("rankRegular")}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={onViewRankings}
            className="group w-full bg-gamePurple hover:bg-gamePurple/90 text-white"
          >
            <Trophy className="mr-2 h-4 w-4" />
            {t("viewAllRankings")}
          </Button>
          
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-gamePurple text-gamePurple hover:bg-gamePurple/10"
          >
            <Home className="mr-2 h-4 w-4" />
            {t("backToWelcome")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
