import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { TIMEOUTS } from '../config/constants';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then('I should see a {string} element', async ({ page }, selector: string) => {
  await expect(page.locator(selector).first()).toBeVisible({
    timeout: TIMEOUTS.ELEMENT_VISIBLE,
  });
});

Then('I should not see a {string} element', async ({ page }, selector: string) => {
  await expect(page.locator(selector)).toHaveCount(0, {
    timeout: TIMEOUTS.ELEMENT_VISIBLE,
  });
});

Then(
  'I should see {string} in the {string} element',
  async ({ page }, text: string, selector: string) => {
    await expect(page.locator(selector).first()).toContainText(text, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'I should see {int} {string} elements',
  async ({ page }, count: number, selector: string) => {
    await expect(page.locator(selector)).toHaveCount(count, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} element should be visible',
  async ({ page }, selector: string) => {
    await expect(page.locator(selector).first()).toBeVisible({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} element should not be visible',
  async ({ page }, selector: string) => {
    await expect(page.locator(selector).first()).toBeHidden({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);
