import { UserPreferences } from "./preferences";

export interface Systems {}

declare global {
  interface Window {
    __app_preferences__: UserPreferences;
    systems: Systems;
  }
}
