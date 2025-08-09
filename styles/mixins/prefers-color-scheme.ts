export const prefersColorScheme = (scheme: "light" | "dark") => {
  return `@media (prefers-color-scheme: ${scheme})`;
};
