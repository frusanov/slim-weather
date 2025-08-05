import { FC } from "hono/jsx";
import { usePreferences } from "./preferences-context";

export const Temperature: FC<{ c: number; f: number }> = ({ c, f }) => {
  const preferences = usePreferences();
  const isCelsius = preferences.temperature === "c";

  return (
    <span data-temp-c={c} data-temp-f={f}>
      {isCelsius ? `${c}°C` : `${f}°F`}
    </span>
  );
};
