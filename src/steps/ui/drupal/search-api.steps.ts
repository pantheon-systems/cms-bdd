import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';
import { SearchApiPage } from '../../../pages/drupal/SearchApiPage';
import { ENV } from '../../../config/environment';
import { TIMEOUTS } from '../../../config/constants';

const { Given, When, Then } = createBdd(test);

/**
 * Navigate to the Search API configuration overview page
 * @example Given I navigate to the Search API configuration page
 */
Given('I navigate to the Search API configuration page', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  await searchApiPage.navigateTo(ENV.DRUPAL_URL);
});

/**
 * Add a search server with the specified backend and connector
 * @example When I add a search server named "My Solr Server" with "Solr" backend and "Standard" connector
 */
When(
  'I add a search server named {string} with {string} backend and {string} connector',
  async ({ page }, name: string, backend: string, connector: string) => {
    const searchApiPage = new SearchApiPage(page);
    await searchApiPage.clickAddServer();

    // Map user-friendly backend names to Drupal form values (radio button values)
    const backendMap: Record<string, string> = {
      'Solr': 'search_api_solr',
    };
    const backendValue = backendMap[backend] || backend;

    // Connector uses the label directly (e.g. "Standard", or a hosting-provider-specific connector)
    // Fill only — do not save yet (allows verifying connection details first)
    await searchApiPage.serverForm.fill(name, backendValue, connector);
  }
);

/**
 * Verify the connection details are auto-populated by a managed connector
 * @example Then the connection details should be auto-populated
 */
Then('the connection details should be auto-populated', async ({ page }) => {
  const hostField = page.getByLabel('Solr host');
  await hostField.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
  const hostValue = await hostField.inputValue();
  expect(hostValue).toBeTruthy();
});

/**
 * Save the search server configuration
 * @example When I save the search server
 */
When('I save the search server', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  await searchApiPage.serverForm.save();
});

/**
 * Verify server shows connected status with green indicator
 * @example Then the "My Solr Server" server should show a connected status
 */
Then('the {string} server should show a connected status', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  const isConnected = await searchApiPage.serverStatus.isConnected();
  expect(isConnected).toBe(true);
});

/**
 * Create a search index
 * @example When I create a search index named "Site Content" for "Content" on "My Solr Server" server
 */
When(
  'I create a search index named {string} for {string} content on {string} server',
  async ({ page }, name: string, datasource: string, server: string) => {
    const searchApiPage = new SearchApiPage(page);
    await searchApiPage.clickAddIndex();
    await searchApiPage.indexForm.fillAndSave(name, datasource, server);
  }
);

/**
 * Add a field to the search index
 * @example And I add the "Title" field to the index
 */
When('I add the {string} field to the index', async ({ page }, fieldName: string) => {
  const searchApiPage = new SearchApiPage(page);
  await searchApiPage.indexFieldsForm.addField(fieldName);
});

/**
 * Save the index field changes
 * @example And I save the index field changes
 */
When('I save the index field changes', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  await searchApiPage.indexFieldsForm.saveChanges();
});

/**
 * Index all content via the UI "Index now" button
 * @example And I index all content
 */
When('I index all content', async ({ page }) => {
  // Navigate to the index overview page — need the View tab with "Index now"
  // Reload to pick up newly created content (button may be disabled if no content)
  const baseUrl = ENV.DRUPAL_URL;
  await page.goto(`${baseUrl}/admin/config/search/search-api`, {
    waitUntil: 'networkidle',
    timeout: TIMEOUTS.NAVIGATION,
  });

  // Click the index name to go to its overview
  const indexLink = page.getByRole('link', { name: 'Site Content' }).first();
  await indexLink.click();
  await page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });

  const searchApiPage = new SearchApiPage(page);
  await searchApiPage.indexOverview.clickIndexNow();
});

/**
 * Verify index is fully indexed
 * @example Then the search index should be fully indexed
 */
Then('the search index should be fully indexed', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  const isIndexed = await searchApiPage.indexOverview.isFullyIndexed();
  expect(isIndexed).toBe(true);
});

/**
 * Verify a Views search page connected to the Search API index already exists.
 * Provisioning the view itself is out of scope for this UI-focused framework —
 * set it up ahead of time (e.g. via a setup script or manual Views UI step).
 * @example Given a Solr search page exists at "/solr-search"
 */
Given('a Solr search page exists at {string}', async ({ page }, path: string) => {
  const baseUrl = ENV.DRUPAL_URL;
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: TIMEOUTS.NAVIGATION });
  const bodyText = await page.locator('body').textContent() || '';

  if (!response || response.status() !== 200 || bodyText.includes('Page not found')) {
    throw new Error(
      `Expected a Views search page at "${path}" to already exist, but it does not. ` +
      'Provision the view ahead of time — this framework does not create it via CLI.'
    );
  }
});

/**
 * CUJ 6: Search via the front-end search page.
 * Requires a Views search page connected to the Search API index.
 * @example When I search for "Zephyr Observatory"
 */
When('I search for {string}', async ({ page }, searchTerm: string) => {
  const baseUrl = ENV.DRUPAL_URL;

  await page.goto(`${baseUrl}/solr-search`, {
    waitUntil: 'networkidle',
    timeout: TIMEOUTS.NAVIGATION,
  });

  // Fill the Views exposed filter search field (not the core search block)
  const searchInput = page.locator('input[name="search_api_fulltext"]:visible').or(
    page.locator('.views-exposed-form input[type="text"]:visible, .views-exposed-form input[type="search"]:visible')
  );
  await searchInput.first().fill(searchTerm);

  const searchButton = page.getByRole('button', { name: 'Search', exact: true });
  await searchButton.click();
  await page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });
});

/**
 * CUJ 6: Verify search results are returned
 * @example Then I should see search results for "Zephyr Observatory"
 */
Then('I should see search results for {string}', async ({ page }, searchTerm: string) => {
  // Retry search — Solr commit may lag after indexing
  const baseUrl = ENV.DRUPAL_URL;
  let count = 0;
  for (let attempt = 0; attempt < 5; attempt++) {
    const results = page.locator('.views-row, .view-content article, .view-content .node, .views-element-container article');
    count = await results.count();
    if (count > 0) break;
    await page.waitForTimeout(10000);
    await page.goto(`${baseUrl}/solr-search?search_api_fulltext=${encodeURIComponent(searchTerm)}`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }
  expect(count).toBeGreaterThan(0);
});

/**
 * CUJ 6: Verify no search results for a term
 * @example Then I should see no search results for "xyznonexistent98765zzz"
 */
Then('I should see no search results for {string}', async ({ page }) => {
  const results = page.locator('.views-row, .view-content article, .view-content .node');
  const count = await results.count();
  expect(count).toBe(0);
});

/**
 * CUJ 6: Verify no Solr errors in recent log messages
 * @example And there should be no Solr errors in the recent log messages
 */
Then('there should be no Solr errors in the recent log messages', async ({ page }) => {
  const baseUrl = ENV.DRUPAL_URL;
  await page.goto(`${baseUrl}/admin/reports/dblog?type[]=search_api_solr&type[]=search_api&severity[]=3&severity[]=2&severity[]=1&severity[]=0`, {
    waitUntil: 'networkidle',
    timeout: TIMEOUTS.NAVIGATION,
  });

  const errorRows = page.locator('table tbody tr');
  const count = await errorRows.count();

  if (count > 0) {
    const bodyText = await page.locator('body').textContent() || '';
    expect(bodyText).not.toContain('Exception');
  }
});
