
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Trophy, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

  useEffect(() => {
    if (isOpen && !scoreSaved) {
      saveScore();
    }
  }, [isOpen]);

  const saveScore = async () => {
    if (!isOpen || scoreSaved) return;
    
    setIsLoading(true);
    
    try {
      // Insert the score
      const { error: insertError } = await supabase
        .from("game_completions")
        .insert([
          { 
            player_name: playerName, 
            completion_time: time, 
            moves: moves 
          }
        ]);
        
      if (insertError) throw insertError;
      
      // Get the player's rank
      const { data: betterScores, error: rankError } = await supabase
        .from("game_completions")
        .select("id")
        .lt("completion_time", time);
        
      if (rankError) throw rankError;
      
      // Get total number of players
      const { count, error: countError } = await supabase
        .from("game_completions")
        .select("id", { count: "exact", head: true });
        
      if (countError) throw countError;
      
      // Calculate rank (adding 1 because ranks start at 1, not 0)
      setRank((betterScores?.length || 0) + 1);
      setTotalPlayers(count || 0);
      setScoreSaved(true);
      
      toast.success("Your score has been saved!");
    } catch (error) {
      console.error("Error saving score:", error);
      toast.error("Failed to save your score. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
