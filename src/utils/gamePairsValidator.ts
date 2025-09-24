import gamePairsData from '@/data/gamePairs.json';
import { cardTranslations } from '@/translations/card';
import { achievementTranslations } from '@/translations/achievement';

/**
 * Validates that all game pairs have corresponding translations
 * This is useful for catching missing translations during development
 */
export const validateGamePairs = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  gamePairsData.pairs.forEach(pair => {
    // Check if person key exists in card translations
    if (!cardTranslations[pair.personKey]) {
      errors.push(`Missing translation for person key: ${pair.personKey}`);
    }
    
    // Check if achievement key exists in achievement translations
    if (!achievementTranslations[pair.achievementKey]) {
      errors.push(`Missing translation for achievement key: ${pair.achievementKey}`);
    }
    
    // Check if all required fields are present
    if (!pair.id || !pair.personKey || !pair.achievementKey || !pair.color) {
      errors.push(`Incomplete pair data for ID: ${pair.id}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Gets a summary of the current game configuration
 */
export const getGamePairsSummary = () => {
  const validation = validateGamePairs();
  
  return {
    totalPairs: gamePairsData.pairs.length,
    validation,
    availableLanguages: Object.keys(cardTranslations.scientist || {}),
    pairs: gamePairsData.pairs.map(pair => ({
      id: pair.id,
      person: cardTranslations[pair.personKey]?.en || 'Missing translation',
      achievement: achievementTranslations[pair.achievementKey]?.en || 'Missing translation',
      color: pair.color
    }))
  };
};