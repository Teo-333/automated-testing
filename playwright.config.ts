import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'API',
      testDir: 'tests/api',
      use: {
        baseURL: 'https://www.saucedemo.com/api',
      },
    },
    {
      name: 'UI',
      testDir: 'tests/ui',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
  ],
  reporter: [['list'], ['html']],
  timeout: 30000,
});
