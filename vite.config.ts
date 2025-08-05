import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react({
        jsxImportSource: "hono/jsx",
      }),
    ],

    build: {
      rollupOptions: {
        input: {
          // Client systems only - server is handled separately
          location: resolve(__dirname, "client-systems/location.ts"),
          weather: resolve(__dirname, "client-systems/weather.ts"),
          preferences: resolve(__dirname, "client-systems/preferences.ts"),
        },
        output: {
          dir: "public/systems",
          format: "es",
          entryFileNames: "[name].js",
          chunkFileNames: "[name]-[hash].js",
          assetFileNames: "[name]-[hash][extname]",
        },
        external: [],
      },
      target: "es2020",
      minify: isProduction ? "esbuild" : false,
      sourcemap: !isProduction,
      emptyOutDir: false, // Don't clear dist as server build might be there
    },

    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
      },
    },

    esbuild: {
      target: "es2020",
    },

    server: {
      port: 3001, // Different port for Vite dev server
      host: true,
    },

    // Optimize dependencies for faster dev startup
    optimizeDeps: {
      include: [],
    },
  };
});
