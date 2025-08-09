# Slim Weather

An extremely lightweight weather website designed to work fast even with very poor internet connections. Built with performance and minimal resource usage as top priorities.

## Features

- **Ultra-fast loading**: Optimized for slow connections and low-bandwidth scenarios
- **Minimal bundle size**: Uses efficient bundling and compression
- **Server-side rendering**: Weather data is pre-rendered on the server
- **Progressive enhancement**: Core functionality works without JavaScript
- **Responsive design**: Works on all devices with minimal CSS
- **Dark mode support**: Automatic theme switching based on system preferences
- **Modular client systems**: JavaScript features load on-demand to reduce initial payload

## Tech Stack

- **Runtime**: Node.js with Yarn package manager
- **Build Tool**: [Vite](https://vitejs.dev) for client systems, [esbuild](https://esbuild.github.io) for server
- **Framework**: [Hono](https://hono.dev) - Lightweight web framework
- **UI**: Server-side JSX with minimal client-side JavaScript
- **Styling**: [@emotion/css](https://emotion.sh) with critical CSS extraction
- **Compression**: gzip compression for optimal payload sizes
- **Deployment**: Vercel with custom build configuration
- **Database**: [Upstash Redis](https://upstash.com) for caching and preferences
- **Validation**: [Zod](https://zod.dev) for type-safe input validation

## Project Structure

```
slim-weather/
├── components/          # Reusable UI components
│   ├── layout.tsx       # Base HTML layout with critical CSS
│   ├── weather-widget/  # Main weather display components
│   │   ├── index.tsx    # Main weather widget
│   │   ├── day-snippet.tsx # Daily forecast component
│   │   ├── hour-snippet.tsx # Hourly forecast component
│   │   └── weather-details.tsx # Weather details component
│   ├── fetch-and-append.tsx # Dynamic content loading system
│   ├── preferences-context.tsx # User preferences context
│   ├── temperature-toggle.tsx # Temperature unit toggle
│   └── temperature.tsx  # Temperature display component
├── routes/              # Route handlers and pages
│   ├── index.tsx        # Home page
│   ├── api/             # API endpoints
│   │   ├── index.ts     # Main API routes
│   │   └── preferences.ts # User preferences API
│   └── _html/           # HTML-specific routes
│       ├── index.ts     # HTML route handlers
│       └── details.tsx  # Details page
├── client-systems/      # On-demand client-side modules
│   ├── _shared.ts       # Shared utilities for client systems
│   ├── location.ts      # Location services
│   ├── weather.ts       # Client-side weather updates
│   └── preferences.ts   # Preferences management
├── utils/               # Utility functions
│   ├── fetch-weather.ts # Weather API integration
│   ├── format-weather.ts # Weather data formatting
│   ├── weather-emojis.ts # Weather icon utilities
│   └── region-settings/ # Regional settings utilities
├── types/               # TypeScript type definitions
│   ├── common.ts        # Common type definitions
│   ├── weather-api.ts   # Weather API types
│   ├── preferences.ts   # User preferences types
│   └── client.ts        # Client-side types
├── middleware/          # Request middleware
│   ├── location.ts      # Location detection middleware
│   ├── preferences.ts   # Preferences middleware
│   └── weather.ts       # Weather data middleware
├── validators/          # Input validation
│   └── preferences.ts   # Preferences validation
├── styles/              # Style utilities
│   └── mixins/          # CSS mixins
│       ├── breakpoints.ts  # Responsive breakpoint utilities
│       └── no-scrollbar.ts # Scrollbar hiding mixin
├── api/                 # Built server bundle
│   └── [...path].js     # Vercel serverless function
├── public/              # Static assets
│   └── systems/         # Built client systems
├── vite.config.ts       # Vite build configuration
├── build-server.js      # Server build script using esbuild
├── dev.js               # Development orchestration script
├── dev-server.ts        # Development server entry point
└── index.ts             # Main application entry point
```

## Installation

```bash
yarn install
```

## Development

Start the development server with hot reloading:

```bash
yarn dev
```

This will:
- Build the server bundle using esbuild and watch for changes
- Build client systems using Vite and watch for changes  
- Start the development server with hot reload on port 3000
- Provide fast HMR (Hot Module Replacement) for client-side code

The development process uses three parallel processes:
1. **Server Build**: esbuild watches and builds server code to `api/[...path].js`
2. **Client Build**: Vite watches and builds client systems to `public/systems/`
3. **Dev Server**: tsx runs the development server with hot reload

## Production Build

```bash
yarn build
```

Creates optimized production builds:
- Server bundle: `api/[...path].js` (built with esbuild for Vercel)
- Client systems: `public/systems/` (built with Vite)

You can also build components separately:
- `yarn build:server` - Build only the server
- `yarn build:client` - Build only the client systems

## API Endpoints

- `GET /` - Main weather page with server-rendered content
- `GET /api/preferences` - User preferences management
- `GET /_html/details` - Weather details page
- `GET /systems/location.js` - Location services client system
- `GET /systems/weather.js` - Weather updates client system
- `GET /systems/preferences.js` - Preferences management client system

## Performance Features

1. **Critical CSS**: Only essential styles are inlined, rest loads asynchronously
2. **Compression**: All responses are compressed using gzip
3. **Lazy loading**: Client-side features load only when needed
4. **Minimal JavaScript**: Core functionality works without JS
5. **Static assets**: Efficiently served with proper caching headers
6. **Bundle splitting**: Client systems are separate modules

## Environment Variables

Currently uses mock weather data. To use real weather data, uncomment the API call in `utils/fetch-weather.ts` and set the following environment variables:

- `WEATHER_API` - WeatherAPI.com API key
- `UPSTASH_REDIS_REST_URL` - Redis REST URL for caching (optional)
- `UPSTASH_REDIS_REST_TOKEN` - Redis REST token for caching (optional)

Uses Vite's `import.meta.env` format for environment variables.

## Deployment

The project is configured for Vercel deployment with:
- Standard Node.js runtime with Yarn
- Serverless function at `api/[...path].js`
- Static assets served from `public/`

**Note**: The `yarn start` script references the built serverless function which is optimized for Vercel's runtime. For local production testing, use `yarn dev` instead.

Deploy to Vercel:

```bash
vercel deploy
```

## Browser Support

Works on all modern browsers and gracefully degrades on older ones. Uses modern build tools for efficient bundling and transpilation.

## License

FSL-1.1-MIT License - see LICENSE.md file for details.