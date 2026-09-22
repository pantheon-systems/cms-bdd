import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { TIMEOUTS } from '../config/constants';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false }).first()).toBeVisible({
    timeout: TIMEOUTS.ELEMENT_VISIBLE,
  });
});

Then('I should not see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text, { exact: false })).toHaveCount(0, {
    timeout: TIMEOUTS.ELEMENT_VISIBLE,
  });
});

Then('I should see text matching {string}', async ({ page }, pattern: string) => {
  const content = await page.textContent('body');
  expect(content).toMatch(new RegExp(pattern));
});

Then('the response should contain {string}', async ({ page }, text: string) => {
  const html = await page.content();
  expect(html).toContain(text);
});

Then('the response should not contain {string}', async ({ page }, text: string) => {
  const html = await page.content();
  expect(html).not.toContain(text);
});
