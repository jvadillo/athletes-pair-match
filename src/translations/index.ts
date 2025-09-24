
import { Translations, Language } from '@/contexts/LanguageContext';
import { commonTranslations } from './common';
import { splashScreenTranslations } from './splashScreen';
import { scoreboardTranslations } from './scoreboard';
import { cardTranslations } from './card';
import { winModalTranslations } from './winModal';
import { achievementTranslations } from './achievement';

// Merge all translations
export const allTranslations: Translations = {
  ...commonTranslations,
  ...splashScreenTranslations,
  ...scoreboardTranslations,
  ...cardTranslations,
  ...winModalTranslations,
  ...achievementTranslations
};
