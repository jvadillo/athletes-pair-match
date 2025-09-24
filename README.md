# Athletes Pair Match

A multilingual memory card game where players match famous Spanish female athletes with their achievements. Built with React, TypeScript, and Supabase.

## Features

- 🧠 Memory card matching gameplay
- 🌍 Multi-language support (English, Spanish, Basque, Catalan, Galician)
- 🏆 Global leaderboard with score tracking
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time score saving to Supabase database

## Database Setup

Before running the project, you need to set up the Supabase database structure:

1. **Follow the detailed setup guide**: See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
2. **Quick setup**: Run the SQL migrations in `supabase/migrations/` in order
3. **Verify setup**: Use `supabase/verify_setup.sql` to test the database

## Game Configuration

The game pairs are now easily configurable through JSON files:

- **Game pairs**: `src/data/gamePairs.json`
- **Person translations**: `src/translations/card.ts`
- **Achievement translations**: `src/translations/achievement.ts`

See [docs/GAME_PAIRS_CONFIGURATION.md](docs/GAME_PAIRS_CONFIGURATION.md) for detailed instructions on adding new pairs.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

### Netlify
```bash
# Build and verify for deployment
npm run deploy

# Or manually:
npm run build
npm run verify-build
```

The project includes Netlify-specific configuration files:
- `netlify.toml` - Main Netlify configuration
- `public/_headers` - MIME type headers for JS/CSS files
- `public/_redirects` - SPA routing configuration

See [docs/NETLIFY_DEPLOYMENT.md](docs/NETLIFY_DEPLOYMENT.md) for detailed deployment instructions.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
