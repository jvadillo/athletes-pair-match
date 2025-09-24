
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowLeft, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface PlayerNameInputProps {
  gameMode: "single" | "multiplayer";
  onStartGame: (playerName: string, gameMode: "single" | "multiplayer") => void;
  onBack: () => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ 
  gameMode, 
  onStartGame, 
  onBack 
}) => {
  const { t } = useLanguage();
  const [playerName, setPlayerName] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate player name
    if (playerName.length < 3 || playerName.length > 16) {
      toast.error(t("player1NameTooShort"));
      return;
    }
    
    // In multiplayer mode, validate player 2 name
    if (gameMode === "multiplayer") {
      if (player2Name.length < 3 || player2Name.length > 16) {
        toast.error(t("player2NameTooShort"));
        return;
      }
      
      // Pass both names concatenated with a separator
      onStartGame(`${playerName}|${player2Name}`, gameMode);
    } else {
      onStartGame(playerName, gameMode);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md sm:w-[28rem]">
      <div className="animate-fade-in flex flex-col items-center rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center justify-center">
            <span className="font-dancing text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">
              Inspiring
            </span>
            <Lightbulb className="mx-2 h-9 w-9 text-[#9334ea] inline-block" strokeWidth={1.5} />
            <span className="font-dancing text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">
              Girls
            </span>
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <Input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t("player1Name")}
              className="w-full px-4 py-3 h-14 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gamePurple focus:border-transparent"
              required
              minLength={3}
              maxLength={16}
            />
          </div>
          
          {gameMode === "multiplayer" && (
            <div>
              <Input
                type="text"
                id="player2Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder={t("player2Name")}
                className="w-full px-4 py-3 h-14 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gamePurple focus:border-transparent"
                required
                minLength={3}
                maxLength={16}
              />
            </div>
          )}
          
          <Button 
            type="submit"
            className="group w-full bg-gamePurple hover:bg-gamePurple/90 text-white"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            {t("startGame")}
          </Button>
          
          <Button 
            type="button"
            onClick={onBack}
            className="group w-full border border-gray-300 hover:bg-gray-50"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("back")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PlayerNameInput;
