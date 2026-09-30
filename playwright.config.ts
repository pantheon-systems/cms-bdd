import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'test/features/**/*.feature',
  steps: ['test/steps/**/*.ts', 'src/steps/**/*.ts', 'src/fixtures/customFixtures.ts'],
});

export default defineConfig({
  testDir,
  timeout: 30000,
  retries: 2,
  reporter: [['list']],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'on-first-retry',
  },
});
