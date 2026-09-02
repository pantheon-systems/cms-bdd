import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { info } from '../utils/logger';

const { Then } = createBdd(test);

Then('print current URL', async ({ page }) => {
  info(`Current URL: ${page.url()}`);
});

Then('print page title', async ({ page }) => {
  const title = await page.title();
  info(`Page title: ${title}`);
});

Then('take a screenshot', async ({ page, $testInfo }) => {
  const path = $testInfo.outputPath('debug-screenshot.png');
  await page.screenshot({ path, fullPage: true });
  await $testInfo.attach('debug-screenshot', { path, contentType: 'image/png' });
  info(`Screenshot saved: ${path}`);
});
