import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { TIMEOUTS } from '../config/constants';
import { fieldLocator } from '../utils/field-locator';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then(
  'the {string} field should contain {string}',
  async ({ page }, field: string, value: string) => {
    await expect(fieldLocator(page, field)).toHaveValue(value, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} field should not contain {string}',
  async ({ page }, field: string, value: string) => {
    await expect(fieldLocator(page, field)).not.toHaveValue(value, {
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} checkbox should be checked',
  async ({ page }, label: string) => {
    await expect(fieldLocator(page, label)).toBeChecked({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);

Then(
  'the {string} checkbox should not be checked',
  async ({ page }, label: string) => {
    await expect(fieldLocator(page, label)).not.toBeChecked({
      timeout: TIMEOUTS.ELEMENT_VISIBLE,
    });
  },
);
