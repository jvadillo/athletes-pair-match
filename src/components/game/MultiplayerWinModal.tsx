
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MultiplayerWinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  score: number;
  player2Score: number;
  winnerName: string;
}

const MultiplayerWinModal: React.FC<MultiplayerWinModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  score,
  player2Score,
  winnerName
}) => {
  const { t } = useLanguage();

  // Function to handle going back to homepage
  const handleBackToHome = () => {
    onClose(); // Call the existing onClose handler
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4">{t("gameOver")}</h2>
        
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gamePurple mb-2">{winnerName}</p>
          <div className="flex justify-center space-x-8 mb-2">
            <div>
              <p className="text-sm text-gray-500">{t("player")} 1</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("player")} 2</p>
              <p className="text-xl font-bold">{player2Score}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleBackToHome}
            variant="outline" 
            className="flex-1 border-gray-300"
          >
            <Home className="h-4 w-4 mr-2" />
            {t("backToWelcome")}
          </Button>
          <Button 
            onClick={onRestart}
            className="flex-1 bg-gamePurple hover:bg-gamePurple/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("playAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerWinModal;
