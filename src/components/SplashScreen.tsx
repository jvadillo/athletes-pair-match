
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Users, Trophy, Globe, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SplashScreenProps {
  onStartGame: (playerName: string, gameMode: "single" | "multiplayer") => void;
  onViewRankings: () => void;
  onSelectGameMode: (mode: "single" | "multiplayer") => void;
  onSelectLanguage: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onViewRankings, 
  onSelectGameMode,
  onSelectLanguage
}) => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-md sm:w-[28rem]">
      <div className="animate-fade-in flex flex-col items-center rounded-xl bg-white p-6 sm:p-6 mt-4 sm:mt-0 mx-3 sm:mx-0 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center justify-center">
            <span className="font-dancing text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">
              Inspira
            </span>
            {/* <Lightbulb className="mx-2 h-9 w-9 text-[#9334ea] inline-block" strokeWidth={1.5} /> */}
            <span className="font-dancing text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 app-title">
              Girls
            </span>
          </h1>
          <p className="text-lg text-gray-600 landing-page-description">
            {t("appDescription")}
          </p>
        </div>
        
        <div className="w-full mb-6 space-y-4">
          <Button 
            onClick={() => onSelectGameMode("single")}
            className="group w-full bg-[#9334ea] hover:bg-[#8429d6] text-white py-6"
          >
            <User className="mr-2 h-5 w-5" />
            {t("singlePlayer")}
          </Button>
          
          <Button 
            onClick={() => onSelectGameMode("multiplayer")}
            className="group w-full bg-[#8a4ff7] hover:bg-[#7e45e9] text-white py-6"
          >
            <Users className="mr-2 h-5 w-5" />
            {t("twoPlayers")}
          </Button>
          
          <Button 
            onClick={onViewRankings}
            className="group w-full bg-[#b481fb] hover:bg-[#a772ea] text-white py-6"
            variant="default"
          >
            <Trophy className="mr-2 h-5 w-5" />
            {t("viewRankings")}
          </Button>
          
          <Button 
            onClick={onSelectLanguage}
            className="group w-full bg-[rgb(100,57,192)] hover:bg-[rgb(90,51,173)] text-white py-6"
            variant="default"
          >
            <Globe className="mr-2 h-5 w-5" />
            {t("selectLanguage")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
