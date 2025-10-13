import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    baseURL: 'http://localhost:5173'
  },
  webServer: {
    command: 'npm run dev:frontend',
    port: 5173,
    timeout: 120_000,
    reuseExistingServer: true
  }
});
