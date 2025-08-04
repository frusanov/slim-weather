# Slim Weather

An extremely lightweight weather website designed to work fast even with very poor internet connections. Built with performance and minimal resource usage as top priorities.

## Features

- **Ultra-fast loading**: Optimized for slow connections and low-bandwidth scenarios
- **Minimal bundle size**: Uses Bun's efficient bundling and compression
- **Server-side rendering**: Weather data is pre-rendered on the server
- **Progressive enhancement**: Core functionality works without JavaScript
- **Responsive design**: Works on all devices with minimal CSS
- **Dark mode support**: Automatic theme switching based on system preferences
- **Modular client systems**: JavaScript features load on-demand to reduce initial payload

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev) - Lightweight web framework
- **UI**: Server-side JSX with minimal client-side JavaScript
- **Styling**: [@emotion/css](https://emotion.sh) with critical CSS extraction
- **Compression**: bun-compression for optimal payload sizes
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
├── dev-scripts/         # Development tools
└── dist/                # Built assets
```

## Installation

```bash
bun install
```

## Development

Start the development server with hot reloading:

```bash
bun run dev
```

This will:
- Build the server bundle and watch for changes
- Build client systems for the browser
- Start the server with hot reload

## Production Build

```bash
bun run build
```

Creates optimized production builds in the `dist` directory.

## API Endpoints

- `GET /` - Main weather page with server-rendered content
- `GET /api/day?date=YYYY-MM-DD` - Get specific day forecast data
- `GET /location` - Load location services client system

## Performance Features

1. **Critical CSS**: Only essential styles are inlined, rest loads asynchronously
2. **Compression**: All responses are compressed using bun-compression
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
- Custom install command using Bun
- Optimized build process
- Proper static asset handling

Deploy to Vercel:

```bash
vercel deploy
```

## Browser Support

Works on all modern browsers and gracefully degrades on older ones. No build tools or transpilation needed for modern JavaScript features thanks to Bun's efficient bundling.

## License

MIT License - see LICENSE file for details.