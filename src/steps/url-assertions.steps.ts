import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/customFixtures';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

Then('I should be on {string}', async ({ page }, path: string) => {
  const url = new URL(page.url());
  expect(url.pathname).toBe(path);
});

Then('I should be on the homepage', async ({ page }) => {
  const url = new URL(page.url());
  expect(url.pathname).toBe('/');
});

Then('the URL should match {string}', async ({ page }, pattern: string) => {
  expect(page.url()).toMatch(new RegExp(pattern));
});
