import { build, context } from "esbuild";
import { resolve } from "path";

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: [resolve(process.cwd(), "index.ts")],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  outfile: "api/[...path].js",
  external: [
    "hono",
    "@hono/node-server",
    "@emotion/css",
    "@emotion/server",
    "postcss",
  ],
  sourcemap: true,
  minify: process.env.NODE_ENV === "production",
  jsx: "automatic",
  jsxImportSource: "hono/jsx",
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development",
    ),
  },
};

async function buildServer() {
  try {
    if (isWatch) {
      const ctx = await context(buildOptions);
      await ctx.watch();
      console.log("👀 Watching server files for changes...");
    } else {
      await build(buildOptions);
      console.log("✅ Server build completed");
    }
  } catch (error) {
    console.error("❌ Server build failed:", error);
    if (!isWatch) {
      process.exit(1);
    }
  }
}

buildServer();
