import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'API',
      testDir: 'tests/api',
      use: {
        baseURL: 'http://localhost:3000', 
      },
    },
    {
      name: 'UI',
      testDir: 'tests/ui',
      use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  timeout: 30000,
});
