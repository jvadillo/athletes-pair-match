
import { CardType } from "./gameData";

// Fisher-Yates (Knuth) shuffle algorithm
export const shuffleCards = (cards: CardType[]): CardType[] => {
  const shuffled = [...cards];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};
