# Game Pairs Configuration

This document explains how to modify the person-achievement pairs in the game.

## Files Structure

The game pairs are now configured in a modular way using the following files:

### 1. Game Pairs Data (`src/data/gamePairs.json`)

This file contains the core game pairs configuration:

```json
{
  "pairs": [
    {
      "id": 1,
      "personKey": "ada_lovelace",
      "achievementKey": "achievement1",
      "color": "gamePurple"
    }
  ]
}
```

- `id`: Unique identifier for the pair
- `personKey`: Translation key for the person's name
- `achievementKey`: Translation key for the achievement
- `color`: Color theme for the pair

### 2. Person Name Translations (`src/translations/card.ts`)

Add translations for person names in the `cardTranslations` object:

```typescript
"ada_lovelace": {
  en: "Ada Lovelace",
  es: "Ada Lovelace",
  eu: "Ada Lovelace",
  ca: "Ada Lovelace",
  gl: "Ada Lovelace"
}
```

### 3. Achievement Translations (`src/translations/achievement.ts`)

Add translations for achievements in the `achievementTranslations` object:

```typescript
"achievement1": {
  en: "First computer algorithm",
  es: "Primer algoritmo informático",
  eu: "Lehen konputagailu-algoritmoa",
  ca: "Primer algoritme informàtic",
  gl: "Primeiro algoritmo informático"
}
```

## How to Add New Pairs

1. **Add a new pair in `gamePairs.json`**:
   ```json
   {
     "id": 7,
     "personKey": "new_person",
     "achievementKey": "achievement7",
     "color": "gameRed"
   }
   ```

2. **Add person name translations in `card.ts`**:
   ```typescript
   "new_person": {
     en: "New Person Name",
     es: "Nombre de Nueva Persona",
     eu: "Pertsona Berriaren Izena",
     ca: "Nom de Nova Persona",
     gl: "Nome de Nova Persoa"
   }
   ```

3. **Add achievement translations in `achievement.ts`**:
   ```typescript
   "achievement7": {
     en: "New achievement description",
     es: "Nueva descripción de logro",
     eu: "Lorpen berriaren deskribapena",
     ca: "Nova descripció d'assoliment",
     gl: "Nova descrición de logro"
   }
   ```

## Current Athletes Featured

The game currently features these Spanish female athletes and their achievements:

1. **Aitana Bonmatí** - Best footballer in the world 3 consecutive years
2. **Carolina Marín** - 3-time world badminton champion  
3. **Edurne Pasaban** - First woman in the world to summit all 14 eight-thousanders
4. **Nuria Picas** - World ultratrail champion
5. **Garbiñe Muguruza** - Winner of two Grand Slams
6. **Mireia Belmonte** - Multiple Olympic medallist in swimming

## Available Colors

The following color themes are available:
- `gamePurple`
- `gameBlue`
- `gameGreen`
- `gamePink`
- `gameOrange`
- `gameTeal`

## Benefits of This Structure

- **Easy maintenance**: All game data is centralized in JSON format
- **Internationalization**: Full support for multiple languages
- **Extensibility**: Easy to add new pairs without touching code
- **Type safety**: TypeScript ensures data consistency
- **Performance**: JSON is loaded once and cached