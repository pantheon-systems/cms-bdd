import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';
import { ExtendPage } from '../../../components/drupal/ExtendPage';
import { ENV } from '../../../config/environment';
import { TIMEOUTS } from '../../../config/constants';

const { When, Then } = createBdd(test);

/**
 * Enable a Drupal module via Admin > Extend
 * @example When I enable the "Search API Solr" module
 */
When('I enable the {string} module', async ({ page }, moduleName: string) => {
  const baseUrl = ENV.DRUPAL_URL;
  await page.goto(`${baseUrl}/admin/modules`, {
    waitUntil: 'networkidle',
    timeout: TIMEOUTS.NAVIGATION,
  });

  const extendPage = new ExtendPage(page);
  await extendPage.enableModule(moduleName);
});

/**
 * Verify a module is enabled
 * @example Then the "Search API Solr" module should be enabled
 */
Then('the {string} module should be enabled', async ({ page }, moduleName: string) => {
  const baseUrl = ENV.DRUPAL_URL;
  await page.goto(`${baseUrl}/admin/modules`, {
    waitUntil: 'networkidle',
    timeout: TIMEOUTS.NAVIGATION,
  });

  const extendPage = new ExtendPage(page);
  const isEnabled = await extendPage.isModuleEnabled(moduleName);
  expect(isEnabled).toBe(true);
});
