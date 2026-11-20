import { defineConfig } from "@playwright/test";

const port = 3107;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 2,
  use: {
    baseURL,
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_USE_SYSTEM_CHROME === "1" ? "chrome" : undefined,
    viewport: { width: 1440, height: 950 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run build && npm run start -- --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: false,
  },
});
