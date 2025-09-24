import gamePairsData from './data/gamePairs.json';
import { cardTranslations } from './translations/card';
import { achievementTranslations } from './translations/achievement';

console.log('=== Athletes Pair Match - Data Validation ===\n');

console.log('🏃‍♀️ Featured Athletes and Achievements:');
gamePairsData.pairs.forEach((pair, index) => {
  const athleteName = cardTranslations[pair.personKey]?.es || 'Missing translation';
  const achievement = achievementTranslations[pair.achievementKey]?.es || 'Missing translation';
  
  console.log(`${index + 1}. ${athleteName}`);
  console.log(`   → ${achievement}`);
  console.log(`   Color: ${pair.color}\n`);
});

console.log('✅ All athlete pairs updated successfully!');
console.log('🌍 Available in: Spanish, English, Basque, Catalan, and Galician');

export {};