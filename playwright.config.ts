import { defineConfig } from "@playwright/test";

const port = 3100;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${port}`,
    // Bundled Chromium by default; PW_CHANNEL=msedge reuses an installed Edge instead.
    channel: process.env.PW_CHANNEL,
  },
  // Clicks run against the production build, never a stale server.
  webServer: {
    command: `npm run build && npx next start -p ${port}`,
    port,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
