await Promise.all([
  Bun.$`bun build ./index.tsx --target=bun --outdir ./dist --watch`,
  Bun.$`bun build ./client-systems/*.ts --target=browser --outdir ./dist/systems --watch`,
  Bun.$`bun run --hot ./dist`,
]);
