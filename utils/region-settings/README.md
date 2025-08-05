# Region Settings

This directory contains temperature unit preferences for different regions around the world, organized by country with lazy loading for optimal performance.

## Structure

### Main Files
- `index.ts` - Main entry point with lazy loading utilities and region settings functions
- `README.md` - This documentation file

### Countries Directory
Each country has its own file in the `countries/` directory that is loaded on-demand:

- `us.ts` - United States (Fahrenheit)
- `ca.ts` - Canada (Celsius)
- `gb.ts` - United Kingdom (Celsius)
- `de.ts` - Germany (Celsius)
- `fr.ts` - France (Celsius)
- `au.ts` - Australia (Celsius)
- `jp.ts` - Japan (Celsius)
- `br.ts` - Brazil (Celsius)
- `in.ts` - India (Celsius)
- `tr.ts` - Turkey (Celsius)
- `es.ts` - Spain (Celsius)
- `it.ts` - Italy (Celsius)
- `nl.ts` - Netherlands (Celsius)
- `be.ts` - Belgium (Celsius)
- `ch.ts` - Switzerland (Celsius)
- `at.ts` - Austria (Celsius)
- `no.ts` - Norway (Celsius)
- `se.ts` - Sweden (Celsius)
- `dk.ts` - Denmark (Celsius)
- `fi.ts` - Finland (Celsius)
- `pl.ts` - Poland (Celsius)
- `cz.ts` - Czech Republic (Celsius)
- `ru.ts` - Russia (Celsius)
- `cn.ts` - China (Celsius)
- `kr.ts` - South Korea (Celsius)
- `mx.ts` - Mexico (Celsius)
- `ar.ts` - Argentina (Celsius)
- `za.ts` - South Africa (Celsius)
- `nz.ts` - New Zealand (Celsius)
- `ie.ts` - Ireland (Celsius)
- `pt.ts` - Portugal (Celsius)
- `gr.ts` - Greece (Celsius)
- `eg.ts` - Egypt (Celsius)
- `il.ts` - Israel (Celsius)
- `th.ts` - Thailand (Celsius)
- `id.ts` - Indonesia (Celsius)
- `my.ts` - Malaysia (Celsius)
- `sg.ts` - Singapore (Celsius)
- `ph.ts` - Philippines (Celsius)
- `vn.ts` - Vietnam (Celsius)
- `pk.ts` - Pakistan (Celsius)
- `bd.ts` - Bangladesh (Celsius)
- `ng.ts` - Nigeria (Celsius)
- `ke.ts` - Kenya (Celsius)

## Lazy Loading Strategy

This implementation uses dynamic imports to load country data only when needed, reducing initial bundle size and improving performance for the lightweight weather app.

### Key Features:
- **On-demand loading**: Country data is imported only when requested
- **Automatic fallback**: Returns Celsius as default if country data fails to load
- **Memory efficient**: Only loads the data you actually use
- **Simple API**: Single async function for all region lookups

## Usage

The API provides a single async function to get region settings:

```ts
import { getRegionSettings } from './index.js';

// Get settings for a specific region
const settings = await getRegionSettings('US-CA'); // { temperature: "f" }
const settings2 = await getRegionSettings('CA-ON'); // { temperature: "c" }

// If region/country doesn't exist, returns default (Celsius)
const settings3 = await getRegionSettings('INVALID'); // { temperature: "c" }
```

## Data Format

Each country file exports a default object as `Record<string, RegionSettings>` where:
- Keys are ISO 3166-2 codes (e.g., "US-CA" for California, USA)
- Values are `RegionSettings` objects with temperature unit preferences

```ts
export interface RegionSettings {
  temperature: "c" | "f";
}
```

Example country file structure:

```ts
import type { RegionSettings } from "../index.js";

export default {
  "US-CA": { temperature: "f" }, // California
  "US-NY": { temperature: "f" }, // New York
  // ... more states
} satisfies Record<string, RegionSettings>;
```

## Performance Benefits

- **Reduced initial bundle**: No upfront loading of all country data
- **Memory efficient**: Only loads countries that are actually used
- **Network optimized**: Perfect for poor connectivity scenarios
- **Simple caching**: Browser automatically caches loaded modules

## Adding New Countries

To add a new country:

1. Create a new file in `countries/` directory (e.g., `countries/xx.ts`)
2. Export a default object with region mappings:
   ```ts
   import type { RegionSettings } from "../index.js";
   
   export default {
     "XX-01": { temperature: "c" }, // Region name
     // ... more regions
   } satisfies Record<string, RegionSettings>;
   ```
3. The new country will be automatically available via lazy loading

## Temperature Units by Country

- **Fahrenheit**: United States
- **Celsius**: All other countries

This reflects real-world temperature unit preferences in different regions.

## Error Handling

The system gracefully handles missing or invalid country codes:
- Falls back to Celsius if country file doesn't exist
- Falls back to Celsius if region code is not found in country file
- Uses try/catch to handle import failures silently
- Provides consistent API regardless of data availability

## Implementation Details

The main function `getRegionSettings()`:

1. Extracts country code from ISO 3166-2 format (e.g., "US-CA" → "us")
2. Dynamically imports the corresponding country file
3. Looks up the specific region in the imported data
4. Returns the region settings or falls back to default (Celsius)

This approach ensures minimal bundle size while providing comprehensive regional temperature unit support.