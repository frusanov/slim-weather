import { UserPreferences } from "@/types/preferences";
import { html } from "hono/html";
import { createContext, FC, useContext } from "hono/jsx";

export const PreferencesContext = createContext<UserPreferences | null>(null);

const PreferencesScript: FC<{ preferences: UserPreferences }> = ({
  preferences,
}) => html`
  <script type="text/javascript">
    window.__app_preferences__ = {
      temperature: "${preferences.temperature}",
    };
  </script>
`;

export const PreferencesProvider: FC<{
  children: any;
  preferences: UserPreferences;
  noScript?: boolean;
}> = ({ children, preferences, noScript }) => {
  return (
    <PreferencesContext.Provider value={preferences}>
      {!noScript && <PreferencesScript preferences={preferences} />}
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
