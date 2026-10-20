import { createBdd } from 'playwright-bdd';
import { readFileSync } from 'fs';
import { join } from 'path';
import { test } from '../../src/fixtures/customFixtures';

const { Given } = createBdd(test);

Given('the toolbar fixture is loaded', async ({ page }) => {
  const html = readFileSync(join(__dirname, '../fixtures/toolbar.html'), 'utf-8');
  await page.setContent(html);
});

Given('the form fixture is loaded', async ({ page }) => {
  const html = readFileSync(join(__dirname, '../fixtures/form.html'), 'utf-8');
  await page.setContent(html);
});
