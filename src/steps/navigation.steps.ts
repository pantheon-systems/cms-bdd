import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { TIMEOUTS } from '../config/constants';

const { Given, When } = createBdd(test);

Given('I am on the homepage', async ({ page }) => {
  await page.goto('/', { timeout: TIMEOUTS.NAVIGATION });
  await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.LOAD_STATE });
});

Given('I visit {string}', async ({ page }, url: string) => {
  await page.goto(url, { timeout: TIMEOUTS.NAVIGATION });
  await page.waitForLoadState('domcontentloaded', { timeout: TIMEOUTS.LOAD_STATE });
});

When('I reload the page', async ({ page }) => {
  await page.reload({ waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION });
});

When('I go back', async ({ page }) => {
  await page.goBack({ waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION });
});

When('I go forward', async ({ page }) => {
  await page.goForward({ waitUntil: 'domcontentloaded', timeout: TIMEOUTS.NAVIGATION });
});
