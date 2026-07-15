import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Then } = createBdd(test);

/**
 * Verify text is visible on the page
 * @example Then I should see "Welcome"
 */
Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

/**
 * Verify text is not visible on the page
 * @example Then I should not see "Error"
 */
Then('I should not see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).not.toBeVisible();
});

/**
 * Verify exact page title
 * @example Then the page title should be "Example Domain"
 */
Then('the page title should be {string}', async ({ page }, title: string) => {
  await expect(page).toHaveTitle(title);
});

/**
 * Verify page title contains text
 * @example Then the page title should contain "Example"
 */
Then('the page title should contain {string}', async ({ page }, titlePart: string) => {
  await expect(page).toHaveTitle(new RegExp(titlePart, 'i'));
});

/**
 * Verify element is visible
 * @example Then "Submit" should be visible
 */
Then('{string} should be visible', async ({ page }, element: string) => {
  await expect(page.getByText(element)).toBeVisible();
});

/**
 * Verify element is hidden
 * @example Then "Error message" should be hidden
 */
Then('{string} should be hidden', async ({ page }, element: string) => {
  await expect(page.getByText(element)).not.toBeVisible();
});

/**
 * Verify button is enabled
 * @example Then "Submit" button should be enabled
 */
Then('{string} button should be enabled', async ({ page }, buttonName: string) => {
  await expect(page.getByRole('button', { name: buttonName })).toBeEnabled();
});

/**
 * Verify button is disabled
 * @example Then "Submit" button should be disabled
 */
Then('{string} button should be disabled', async ({ page }, buttonName: string) => {
  await expect(page.getByRole('button', { name: buttonName })).toBeDisabled();
});

/**
 * Verify URL contains text
 * @example Then the URL should contain "dashboard"
 */
Then('the URL should contain {string}', async ({ page }, urlPart: string) => {
  expect(page.url()).toContain(urlPart);
});

/**
 * Verify exact URL
 * @example Then the URL should be "https://example.com/login"
 */
Then('the URL should be {string}', async ({ page }, expectedUrl: string) => {
  expect(page.url()).toBe(expectedUrl);
});
