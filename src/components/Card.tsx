import React from "react";
import { CardType } from "@/utils/gameData";
import { useLanguage } from "@/contexts/LanguageContext";

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
  showColors: boolean;
  isMobile?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled, showColors, isMobile = false }) => {
  const { t } = useLanguage();
  
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  // Get background color based on pair ID
  const getPairBackgroundColor = (pairId: number) => {
    switch (pairId) {
      case 1: return "bg-[#F2FCE2]"; // Soft Green
      case 2: return "bg-[#E5DEFF]"; // Soft Purple
      case 3: return "bg-[#D3E4FD]"; // Soft Blue
      case 4: return "bg-[#FEC6A1]"; // Soft Orange
      case 5: return "bg-[#FFDEE2]"; // Soft Pink
      case 6: return "bg-[#FDE1D3]"; // Soft Peach
      default: return "bg-[#E5DEFF]";
    }
  };

  // Get the text content, translating both achievements and person names
  const getCardText = () => {
    return t(card.text);
  };

  return (
    <div
      className={`card-container cursor-pointer ${
        isMobile 
          ? 'h-full w-full' 
          : 'h-[170px] md:h-[170px]'
      } ${
        card.isFlipped || card.isMatched ? "flipped" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-inner h-full w-full">
        <div className="card-front flex h-full w-full items-center justify-center rounded-lg bg-white p-0.5 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="relative flex h-full w-full items-center justify-center rounded-md bg-gradient-to-b from-[#A58DF7] to-[#9B87F5] p-0.5 overflow-hidden">
            {/* Static wave pattern overlay */}
            <div className="absolute inset-0 opacity-30 static-waves-pattern"></div>
            <span className={`relative z-10 text-white font-bold ${isMobile ? 'text-5xl' : 'text-5xl'}`}>
              {t("cardQuestion")}
            </span>
          </div>
        </div>
        <div className="card-back flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-0.5 shadow-lg">
          <div className={`flex h-full w-full flex-col items-center justify-center rounded-md ${getPairBackgroundColor(card.pairId)} p-0.5 text-center overflow-hidden`}>
            <div className={`mb-2 mt-1 inline-block rounded-full bg-[#9B87F5] px-1 py-0.5 ${isMobile ? 'text-2xs' : 'text-xs'} font-medium text-white`}>
              {card.type === "inventor" ? t("scientist") : t("achievement")}
            </div>
            <div className="w-full h-full overflow-y-auto flex items-center justify-center px-0.5">
              <p className={`text-[#6E59A5] text-center font-medium ${isMobile ? 'text-[10px] leading-tight' : 'text-2xs leading-tight'}`}>
                {getCardText()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
