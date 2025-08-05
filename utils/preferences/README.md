# User Preferences System

This system provides cookie-based user preferences storage that integrates seamlessly with the existing RegionSettings system. It allows users to customize their weather display preferences while maintaining fast performance and minimal bundle size.

## Features

- **Cookie-based storage**: Preferences persist across sessions
- **Region-aware defaults**: Automatically uses appropriate defaults based on user's region (e.g., Fahrenheit for US, Celsius elsewhere)
- **Progressive enhancement**: Works without JavaScript, enhanced with client-side interactivity
- **Lightweight**: Minimal overhead, consistent with slim-weather performance goals
- **Type-safe**: Full TypeScript support with proper type definitions

## Architecture

### Server-Side (Node.js/Hono)
- **`server.ts`**: Cookie management, region integration, server-side utilities
- **`format-weather.ts`**: Weather data formatting with user preferences

### Client-Side (Browser)
- **`preferences.ts`**: Client system for dynamic preference updates and UI synchronization

## Supported Preferences

### Temperature Unit
- **Type**: `"c"` (Celsius) | `"f"` (Fahrenheit)
- **Default**: Based on user's region via RegionSettings
- **Affects**: All temperature displays, feels-like temperatures
- **Client updates**: Live temperature conversion without page reload

## Usage Examples

### Server-Side Integration

```tsx
import { getPreferences } from "@/utils/preferences/server";
import { WeatherWidget } from "@/components/weather-widget";

// In your route handler
export const indexRoute = new Hono();
indexRoute.get("/", async (c) => {
  const weather = await fetchWeather("Location");
  const preferences = await getPreferences(c);
  
  return c.html(
    <WeatherWidget 
      weather={weather} 
      preferences={preferences} 
    />
  );
});
```

### Component Integration

```tsx
import { formatTemperatureWithPreferences } from "@/utils/preferences/format-weather";

export const TemperatureDisplay: FC<{ 
  tempC: number; 
  tempF: number; 
  preferences: UserPreferences 
}> = ({ tempC, tempF, preferences }) => {
  const formatted = formatTemperatureWithPreferences(tempC, tempF, preferences);
  
  return (
    <span 
      data-temp-c={tempC} 
      data-temp-f={tempF}
    >
      {formatted}
    </span>
  );
};
```

### Client-Side Usage

```html
<!-- Load the preferences system -->
<script>
loadSystem("preferences").then(() => {
  // Get current preferences
  const prefs = window.systems.preferences.get();
  
  // Update temperature unit
  window.systems.preferences.setTemperatureUnit('f');
  
  // This automatically updates all temperature displays on the page
});
</script>
```

### API Endpoints

```bash
# Get current preferences
GET /api/preferences
# Optional: ?region=US-CA for region-based defaults

# Update preferences
POST /api/preferences
# Body: { "temperatureUnit": "f" }

# Update just temperature unit
PUT /api/preferences/temperature
# Body: { "unit": "f" }

# Toggle temperature unit
POST /api/preferences/toggle-temperature
```

## Data Flow

### Initial Page Load
1. Server reads preferences cookie or uses region-based default
2. Components render with user's preferred units
3. Client system loads and syncs with current preferences

### Preference Updates
1. User clicks temperature toggle or makes preference change
2. Client system updates cookie and live-updates all displays
3. API calls provide fallback for non-JS users

### Region Integration
1. If no preferences cookie exists, system queries RegionSettings
2. US regions default to Fahrenheit, all others to Celsius
3. User preferences override region defaults once set

## Performance Considerations

### Bundle Size Impact
- **Server utilities**: ~2KB compressed
- **Client system**: ~3KB compressed  
- **Total overhead**: <5KB for complete preferences system

### Caching Strategy
- Preferences cached in cookie for 1 year
- RegionSettings lazy-loaded only when needed
- Client system auto-loads on first preference interaction

### Progressive Enhancement
- Core functionality works without JavaScript
- Temperature toggle falls back to page reload if JS unavailable
- API endpoints provide server-side preference updates

## Implementation Details

### Cookie Structure
```typescript
interface UserPreferences {
  temperatureUnit: "c" | "f";
}
```

**Cookie name**: `slim-weather-prefs`
**Expiry**: 1 year
**Security**: HttpOnly=false (allows client access), Secure in production

### Data Attributes for Client Updates
Components include data attributes for live temperature conversion:

```html
<!-- Temperature displays -->
<span data-temp-c="25" data-temp-f="77">25°C</span>

<!-- Wind speed -->
<span data-wind-kph="15" data-wind-mph="9.3">15 km/h</span>

<!-- Visibility -->  
<span data-visibility-km="10" data-visibility-miles="6.2">10 km</span>

<!-- Precipitation -->
<span data-precipitation-mm="5.2" data-precipitation-in="0.20">5.2 mm</span>
```

### Error Handling
- Invalid preference values fall back to defaults
- Missing cookies trigger region-based default lookup
- Client system gracefully handles missing DOM elements
- API failures fall back to page reload

## RegionSettings Integration

The preferences system seamlessly integrates with the existing RegionSettings:

```typescript
// Convert RegionSettings to UserPreferences
const preferences = regionSettingsToPreferences(regionSettings);

// Convert UserPreferences to RegionSettings  
const regionSettings = preferencesToRegionSettings(preferences);

// Get preferences with region-aware defaults
const preferences = await getPreferences(context, "US-CA");
```

This ensures consistent temperature unit handling across the entire application.

## Adding New Preferences

To add a new preference:

1. **Update types**:
```typescript
// types/preferences.ts
export interface UserPreferences {
  temperatureUnit: "c" | "f";
  newPreference: "value1" | "value2"; // Add here
}
```

2. **Update server utilities**:
```typescript
// utils/preferences/server.ts
export function updateNewPreference(c: Context, value: NewPreferenceType) {
  return updatePreference(c, "newPreference", value);
}
```

3. **Update client system**:
```typescript
// client-systems/preferences.ts
window.systems.preferences = {
  // ... existing methods
  setNewPreference: (value) => { /* implementation */ },
};
```

4. **Create API endpoint**:
```typescript
// routes/preferences.ts
preferencesRoute.put("/new-preference", async (c) => {
  // implementation
});
```

## Security Considerations

- Preferences are validated on server-side before storage
- Cookie values are URL-encoded to prevent injection
- Client-side updates validate input before sending to server
- API endpoints include proper error handling and validation

## Testing

The preferences system can be tested at multiple levels:

```bash
# Test API endpoints
curl -X POST /api/preferences/toggle-temperature

# Test client system in browser console
window.systems.preferences.setTemperatureUnit('f');

# Test server-side integration
// Unit tests for preference utilities
```

## Migration and Compatibility

- Existing users without preferences get region-appropriate defaults
- Invalid or corrupted preference cookies are gracefully reset
- System maintains backward compatibility with existing RegionSettings
- Future preference additions won't break existing implementations

This preferences system provides a robust, performant foundation for user customization while maintaining the slim-weather project's core principles of minimal overhead and fast loading.