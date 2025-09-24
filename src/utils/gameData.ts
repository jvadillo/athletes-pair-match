
import gamePairsData from '@/data/gamePairs.json';

export type CardType = {
  id: number;
  type: 'inventor' | 'achievement';
  text: string;
  pairId: number;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type PairType = {
  id: number;
  personKey: string;
  achievementKey: string;
  color: string;
};

// Load the athlete-achievement pairs from JSON
export const PAIRS: PairType[] = gamePairsData.pairs;

// Generate cards from pairs
export const generateCards = (): CardType[] => {
  const cards: CardType[] = [];
  
  PAIRS.forEach(pair => {
    // Add athlete card
    cards.push({
      id: pair.id * 2 - 1,
      type: 'inventor',
      text: pair.personKey,
      pairId: pair.id,
      color: pair.color,
      isFlipped: false,
      isMatched: false
    });
    
    // Add achievement card
    cards.push({
      id: pair.id * 2,
      type: 'achievement',
      text: pair.achievementKey,
      pairId: pair.id,
      color: pair.color,
      isFlipped: false,
      isMatched: false
    });
  });
  
  return cards;
};
