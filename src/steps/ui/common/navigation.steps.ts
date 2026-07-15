import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { Logger } from '../../../utils/logger';
import { TIMEOUTS } from '../../../config/constants';

const { Given, When } = createBdd(test);

/**
 * Navigate to a specific URL
 * @example Given I navigate to "https://example.com"
 */
Given('I navigate to {string}', async ({ page }, url: string) => {
  Logger.info(`Navigating to: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'load',  timeout: 30000 });
  } catch (error: any) {
    // Handle navigation interruptions from redirects or Firefox-specific aborts
    if (error.message?.includes('interrupted by another navigation') ||
        error.message?.includes('NS_BINDING_ABORTED')) {
      Logger.info(`Navigation was interrupted (redirect or Firefox), waiting for page load...`);
      // Wait for navigation to settle
      await page.waitForLoadState('load', { timeout: TIMEOUTS.LOAD_STATE });
    } else {
      throw error;
    }
  }

  // Ensure DOM is ready
  await page.waitForLoadState('domcontentloaded');
  Logger.info(`Navigation completed. Final URL: ${page.url()}`);
});

/**
 * Navigate to a page by name (relative to baseURL)
 * @example Given I am on the "login" page
 */
Given('I am on the {string} page', async ({ page }, pageName: string) => {
  Logger.info(`Navigating to page: ${pageName}`);
  await page.goto(`/${pageName}`, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(new RegExp(pageName));
});

/**
 * Refresh the current page
 * @example When I refresh the page
 */
When('I refresh the page', async ({ page }) => {
  Logger.info('Refreshing page');
  await page.reload({ waitUntil: 'domcontentloaded' });
});

/**
 * Navigate back in browser history
 * @example When I go back
 */
When('I go back', async ({ page }) => {
  Logger.info('Going back');
  await page.goBack();
});

/**
 * Navigate forward in browser history
 * @example When I go forward
 */
When('I go forward', async ({ page }) => {
  Logger.info('Going forward');
  await page.goForward();
});
