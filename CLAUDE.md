---

# Slim Weather - Development Guidelines

This project is an extremely lightweight weather website optimized for poor internet connections. The architecture prioritizes minimal payload sizes, fast loading, and progressive enhancement.

## Runtime & Package Manager

Default to using Bun instead of Node.js for all operations:

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv

## Development Commands

- `bun run dev` - Start development server with hot reloading and asset watching
- `bun run build` - Create production build
- `bun --hot ./dist` - Run built server with hot reload

## Architecture Guidelines

### Server Framework

Use **Hono** instead of Express for minimal overhead:

```ts
import { Hono } from "hono";
import { compress } from "bun-compression";

const app = new Hono();
app.use(compress()); // Always compress responses
```

### UI Components

Use **server-side JSX** with Hono for fast initial renders:

```tsx
import type { FC } from "hono/jsx";

export const Component: FC = ({ children }) => {
  return <div>{children}</div>;
};
```

### Styling

Use **@emotion/css** with critical CSS extraction:

```tsx
import { css } from "@emotion/css";
import { extractCritical } from "@emotion/server";

const styles = css`
  /* styles here */
`;
```

Always extract critical CSS in the Layout component to minimize render-blocking styles.

### Client-Side Code

Keep client-side JavaScript minimal and modular:

1. Place client systems in `client-systems/` directory
2. Build them separately for browser target: `bun build ./client-systems/*.ts --target=browser --outdir ./dist/systems`
3. Load on-demand using the `loadSystem()` function
4. Use progressive enhancement - core functionality must work without JS

Example client system:

```ts
// client-systems/location.ts
if (!window.systems) window.systems = {};

window.systems.location = {
  getCurrentLocation: () => {
    // Implementation
  }
};
```

### Weather Data

- Use the `fetchWeather()` utility for all weather API calls
- Currently uses mock data for development
- Weather data structure follows WeatherAPI.com format
- Cache weather responses when possible to reduce API calls

### Performance Requirements

1. **Bundle Size**: Keep total JavaScript under 50KB
2. **First Paint**: Aim for <1s on slow 3G connections
3. **Compression**: All responses must be compressed
4. **Critical CSS**: Only inline essential styles
5. **Progressive Enhancement**: Site must work without JavaScript

### File Organization

```
components/
├── layout.tsx              # Base HTML with critical CSS
├── weather-widget/         # Weather display components
│   ├── index.tsx          # Main widget
│   ├── day-snippet.tsx    # Daily forecast
│   └── hour-snippet.tsx   # Hourly forecast
└── fetch-and-append.tsx   # Dynamic loading system

pages/
└── index.tsx              # Main weather page

client-systems/            # On-demand client modules
├── location.ts           # Location services
└── weather.ts            # Client weather updates

utils/
└── fetch-weather.ts      # Weather API integration
```

### API Design

- `GET /` - Server-rendered weather page
- `GET /api/day?date=YYYY-MM-DD` - JSON day forecast
- `GET /location` - JavaScript module for location services

Keep API responses minimal - only include necessary data.

### Build Process

The dev script runs three parallel processes:

1. Server bundle: `bun build ./index.tsx --target=bun --outdir ./dist --watch`
2. Client systems: `bun build ./client-systems/*.ts --target=browser --outdir ./dist/systems --watch`
3. Server: `bun run --hot ./dist`

### Testing

Use `bun test` for testing:

```ts
import { test, expect } from "bun:test";

test("weather widget renders", () => {
  // Test implementation
});
```

### Deployment

Configured for Vercel with custom Bun commands:
- Install: `bun install`
- Build: `bun run build` 
- Dev: `bun run dev`

### Dark Mode

Support automatic dark mode using CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  /* dark styles */
}
```

## Weather-Specific Guidelines

1. **Location Handling**: Default to a fallback location (currently Izmir)
2. **Forecast Display**: Show current conditions prominently, with hourly and daily forecasts
3. **Data Slots**: Use `data-slot` attributes for dynamic content updates
4. **Weather Icons**: Use emoji or minimal icons to reduce asset size
5. **Units**: Display both metric and imperial when space allows
6. **Offline Graceful Degradation**: Show cached/fallback data when API fails

## Performance Monitoring

- Monitor bundle sizes in build output
- Test on slow connections regularly
- Measure Time to First Byte (TTFB) and First Contentful Paint (FCP)
- Validate compression ratios for all assets

Remember: Every byte counts. This is a weather app for users with poor connectivity.