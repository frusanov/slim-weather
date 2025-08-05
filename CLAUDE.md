---

# Slim Weather - Development Guidelines

This project is an extremely lightweight weather website optimized for poor internet connections. The architecture prioritizes minimal payload sizes, fast loading, and progressive enhancement.

## Runtime & Package Manager

Default to using Node.js with Yarn for all operations:

- Use `node <file>` or `tsx <file>` for TypeScript files
- Tests are not yet implemented (placeholder script exists)
- Use build tools like Webpack, esbuild, or Vite for bundling
- Use `yarn install` for installing dependencies
- Use `yarn <script>` for running package.json scripts
- Uses Vite's `import.meta.env` for environment variables

## Development Commands

- `yarn dev` - Start development server with hot reloading and asset watching
- `yarn build` - Create production build
- `yarn start` - Run built server

## Architecture Guidelines

### Server Framework

Use **Hono** instead of Express for minimal overhead:

```ts
import { Hono } from "hono";
import { compress } from "hono/compress";

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
2. Build them separately for browser target using your build tool (webpack, esbuild, etc.)
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
│   ├── hour-snippet.tsx   # Hourly forecast
│   └── weather-details.tsx # Weather details component
├── fetch-and-append.tsx   # Dynamic loading system
├── preferences-context.tsx # User preferences context
├── temperature-toggle.tsx  # Temperature unit toggle
└── temperature.tsx         # Temperature display component

routes/                     # Route handlers and pages
├── index.tsx              # Home page
├── api/                   # API endpoints
│   ├── index.ts           # Main API routes
│   └── preferences.ts     # User preferences API
└── _html/                 # HTML-specific routes
    ├── index.ts           # HTML route handlers
    └── details.tsx        # Details page

client-systems/            # On-demand client modules
├── location.ts           # Location services
├── weather.ts            # Client weather updates
└── preferences.ts        # Preferences management

utils/
├── fetch-weather.ts      # Weather API integration
├── format-weather.ts     # Weather data formatting
├── weather-emojis.ts     # Weather icon utilities
└── region-settings/      # Regional settings utilities

types/                     # TypeScript type definitions
├── common.ts             # Common type definitions
├── weather-api.ts        # Weather API types
├── preferences.ts        # User preferences types
└── client.ts             # Client-side types

middleware/               # Request middleware
└── preferences.ts        # Preferences middleware

validators/               # Input validation
└── preferences.ts        # Preferences validation

styles/                   # Style utilities
└── mixins/               # CSS mixins
    └── no-scrollbar.ts   # Scrollbar hiding mixin
```

### API Design

- `GET /` - Server-rendered weather page
- `GET /api/preferences` - User preferences management
- `GET /_html/details` - Weather details page
- `GET /systems/location.js` - JavaScript module for location services
- `GET /systems/weather.js` - JavaScript module for weather updates
- `GET /systems/preferences.js` - JavaScript module for preferences management

Keep API responses minimal - only include necessary data.

### Build Process

The dev script runs parallel processes for:

1. Server bundle: Build and watch server-side code using esbuild (outputs to `api/[...path].js` for Vercel)
2. Client systems: Build and watch client-side TypeScript modules using Vite (outputs to `public/systems/`)
3. Server: Run the development server with hot reload

Production builds:
- Server: `api/[...path].js` - Serverless function for Vercel
- Client systems: `public/systems/*.js` - Static ES modules

### Testing

Testing framework is not yet implemented. The `yarn test` command currently shows a placeholder message. Consider adding Vitest for future testing needs.

### Deployment

Configured for Vercel with Yarn commands:
- Install: `yarn install`
- Build: `yarn build` 
- Dev: `yarn dev`

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