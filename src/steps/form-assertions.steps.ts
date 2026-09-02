import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { TIMEOUTS } from '../config/constants';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then(
  'the {string} field should contain {string}',
  async ({ page }, field: string, value: string) => {
    await expect(page.getByLabel(field)).toHaveValue(value, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} field should not contain {string}',
  async ({ page }, field: string, value: string) => {
    await expect(page.getByLabel(field)).not.toHaveValue(value, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} checkbox should be checked',
  async ({ page }, label: string) => {
    await expect(page.getByLabel(label)).toBeChecked({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} checkbox should not be checked',
  async ({ page }, label: string) => {
    await expect(page.getByLabel(label)).not.toBeChecked({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);
