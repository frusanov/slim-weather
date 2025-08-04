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
- **Build Tool**: [Vite](https://vitejs.dev) - Fast build tool with hot module replacement
- **Framework**: [Hono](https://hono.dev) - Lightweight web framework
- **UI**: Server-side JSX with minimal client-side JavaScript
- **Styling**: [@emotion/css](https://emotion.sh) with critical CSS extraction
- **Compression**: gzip compression for optimal payload sizes
- **Deployment**: Vercel with custom build configuration

## Project Structure

```
slim-weather/
├── components/           # Reusable UI components
│   ├── layout.tsx       # Base HTML layout with critical CSS
│   ├── weather-widget/  # Main weather display components
│   └── fetch-and-append.tsx # Dynamic content loading system
├── pages/               # Page components
│   └── index.tsx        # Home page
├── client-systems/      # On-demand client-side modules
│   ├── location.ts      # Location services
│   └── weather.ts       # Client-side weather updates
├── utils/               # Utility functions
│   └── fetch-weather.ts # Weather API integration
├── types/               # TypeScript type definitions
├── vite.config.ts       # Vite build configuration
├── build-server.js      # Server build script using esbuild
├── dev.js               # Development orchestration script
├── dev-server.ts        # Development server entry point
└── dist/                # Built assets
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

## Production Build

```bash
yarn build
```

Creates optimized production builds in the `dist` directory:
- Server bundle: `dist/index.js` (built with esbuild)
- Client systems: `dist/systems/` (built with Vite)

You can also build components separately:
- `yarn build:server` - Build only the server
- `yarn build:client` - Build only the client systems

## API Endpoints

- `GET /` - Main weather page with server-rendered content
- `GET /api/day?date=YYYY-MM-DD` - Get specific day forecast data
- `GET /location` - Load location services client system

## Performance Features

1. **Critical CSS**: Only essential styles are inlined, rest loads asynchronously
2. **Compression**: All responses are compressed using gzip
3. **Lazy loading**: Client-side features load only when needed
4. **Minimal JavaScript**: Core functionality works without JS
5. **Static assets**: Efficiently served with proper caching headers
6. **Bundle splitting**: Client systems are separate modules

## Environment Variables

Create a `.env` file (optional, currently uses mock data):

```env
WEATHER_API=your_weather_api_key_here
```

## Deployment

The project is configured for Vercel deployment with:
- Standard Node.js runtime with Yarn
- Optimized build process
- Proper static asset handling

Deploy to Vercel:

```bash
vercel deploy
```

## Browser Support

Works on all modern browsers and gracefully degrades on older ones. Uses modern build tools for efficient bundling and transpilation.

## License

MIT License - see LICENSE file for details.