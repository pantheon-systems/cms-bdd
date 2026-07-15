import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';
import { SearchApiPage } from '../../../pages/drupal/SearchApiPage';
import { ENV } from '../../../config/environment';
import { TIMEOUTS } from '../../../config/constants';
import { getSiteEnv, ensureConnectionMode } from '../../../utils/terminus.util';
import solrSearchViewConfig from '../../../config/solr-search-view.json';

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
 * CUJ 4: Add a search server with specified backend and connector
 * @example When I add a search server named "Pantheon Solr 9" with "Solr" backend and "Pantheon" connector
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

    // Connector uses the label directly (e.g. "Pantheon", "Standard")
    // Fill only — do not save yet (allows verifying connection details first)
    await searchApiPage.serverForm.fill(name, backendValue, connector);
  }
);

/**
 * Verify the connection details are auto-populated (Pantheon connector)
 * @example Then the connection details should be auto-populated
 */
Then('the connection details should be auto-populated', async ({ page }) => {
  // After selecting Pantheon connector, Drupal shows connection fields with
  // "These fields are populated by Pantheon infrastructure." text
  const populatedText = page.getByText('These fields are populated by Pantheon infrastructure.');
  await populatedText.first().waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });

  const hostField = page.getByLabel('Solr host');
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
 * CUJ 4: Verify server shows connected status with green indicator
 * @example Then the "Pantheon Solr 9" server should show a connected status
 */
Then('the {string} server should show a connected status', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  const isConnected = await searchApiPage.serverStatus.isConnected();
  expect(isConnected).toBe(true);
});

/**
 * CUJ 5: Create a search index
 * @example When I create a search index named "Site Content" for "Content" on "Pantheon Solr 9" server
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
 * Post Solr schema via drush (acceptable as CLI step)
 * @example And I post the Solr schema
 */
When('I post the Solr schema', async ({ page }) => {
  // Schema posting has no UI in search_api_pantheon 8.5.x — must use drush.
  // Retries needed — Solr provisioning can return 502 transiently (same as CLI tests).
  await ensureConnectionMode('sftp');
  const env = getSiteEnv();
  const { execSync } = await import('child_process');

  let lastOutput = '';
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      lastOutput = execSync(`terminus drush "${env}" -- search-api-pantheon:postSchema`, {
        encoding: 'utf-8',
        timeout: 120000,
      });
      if (!lastOutput.includes('[error]')) {
        return;
      }
    } catch (e: any) {
      lastOutput = e.stderr || e.message || '';
    }
    await page.waitForTimeout(10000);
  }
  expect.soft(lastOutput).not.toContain('[error]');
  expect(lastOutput).not.toContain('502');
});

/**
 * Index all content via the UI "Index now" button
 * @example And I index all content
 */
/**
 * Create test article content via drush for search testing
 * @example And I create test articles for search validation
 */
When('I create test articles for search validation', async ({ page }) => {
  await ensureConnectionMode('sftp');
  const env = getSiteEnv();
  const { execSync } = await import('child_process');

  // Create 3 articles one at a time to avoid complex PHP escaping
  const articles = [
    { title: 'Zephyr Observatory Research Paper', body: 'A comprehensive study on atmospheric phenomena' },
    { title: 'Quantum Mechanics Laboratory Guide', body: 'Introduction to quantum physics experiments' },
    { title: 'Maritime Navigation Historical Review', body: 'History of seafaring navigation methods' },
  ];

  for (const article of articles) {
    const phpCode = `\\$node = \\Drupal\\node\\Entity\\Node::create(['type' => 'article', 'title' => '${article.title}', 'body' => [['value' => '${article.body}', 'format' => 'basic_html']], 'status' => 1]); \\$node->save(); echo 'Created: ' . \\$node->getTitle();`;
    const output = execSync(`terminus drush "${env}" -- ev "${phpCode}"`, {
      encoding: 'utf-8',
      timeout: 120000,
    });
    expect(output).toContain(`Created: ${article.title}`);
  }
});

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
 * CUJ 5: Verify index is fully indexed
 * @example Then the search index should be fully indexed
 */
Then('the search index should be fully indexed', async ({ page }) => {
  const searchApiPage = new SearchApiPage(page);
  const isIndexed = await searchApiPage.indexOverview.isFullyIndexed();
  expect(isIndexed).toBe(true);
});

/**
 * Create a Views search page via the Views UI connected to the Search API index.
 * @example Given a Solr search page exists at "/solr-search"
 */
Given('a Solr search page exists at {string}', async ({ page }, path: string) => {
  const baseUrl = ENV.DRUPAL_URL;

  // Check if the search page already exists
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: TIMEOUTS.NAVIGATION });
  const bodyText = await page.locator('body').textContent() || '';
  if (response && response.status() === 200 && !bodyText.includes('Page not found')) {
    return;
  }

  // Create the Views search page via drush using config from JSON.
  // The Views edit UI uses complex modal dialogs that are fragile to automate.
  // Creating the search view is infrastructure, not a CUJ.
  await ensureConnectionMode('sftp');
  const env = getSiteEnv();
  const { execSync } = await import('child_process');

  const cleanPath = path.replace(/^\//, '');
  const viewId = cleanPath.replace(/[^a-z0-9]/g, '_');

  // Use drush config:set to create the view via individual config commands.
  // First check if it exists.
  const check = execSync(
    `terminus drush "${env}" -- ev "echo \\Drupal\\views\\Entity\\View::load('${viewId}') ? 'exists' : 'missing';"`,
    { encoding: 'utf-8', timeout: 60000 }
  );
  if (check.includes('exists')) return;

  // Set the view config path in the JSON and base64-encode to avoid shell escaping
  const viewConfig = JSON.parse(JSON.stringify(solrSearchViewConfig));
  viewConfig.id = viewId;
  viewConfig.display.page_1.display_options = { path: cleanPath };
  const b64 = Buffer.from(JSON.stringify(viewConfig)).toString('base64');

  // Decode base64 on the server side and create the view
  const phpCode = `\\$config = json_decode(base64_decode('${b64}'), TRUE); \\$view = \\Drupal\\views\\Entity\\View::create(\\$config); \\$view->save(); echo 'created';`;

  execSync(`terminus drush "${env}" -- ev "${phpCode}"`, {
    encoding: 'utf-8',
    timeout: 120000,
  });

  execSync(`terminus drush "${env}" -- cache:rebuild 2>&1`, {
    encoding: 'utf-8',
    timeout: 120000,
  });
});

/**
 * Ensure test articles exist and are indexed — creates them via drush if needed,
 * then indexes and waits for Solr commit.
 * @example And test articles exist for search validation
 */
Given('test articles exist for search validation', async ({ page }) => {
  await ensureConnectionMode('sftp');
  const env = getSiteEnv();
  const { execSync } = await import('child_process');

  // Create articles if they don't already exist
  const articles = [
    { title: 'Zephyr Observatory Research Paper', body: 'A comprehensive study on atmospheric phenomena' },
    { title: 'Quantum Mechanics Laboratory Guide', body: 'Introduction to quantum physics experiments' },
    { title: 'Maritime Navigation Historical Review', body: 'History of seafaring navigation methods' },
  ];

  let created = false;
  for (const article of articles) {
    const phpCode = `\\$q = \\Drupal::entityQuery('node')->condition('title', '${article.title}')->accessCheck(FALSE)->range(0,1); \\$r = \\$q->execute(); if (empty(\\$r)) { \\$n = \\Drupal\\node\\Entity\\Node::create(['type'=>'article','title'=>'${article.title}','body'=>[['value'=>'${article.body}','format'=>'basic_html']],'status'=>1]); \\$n->save(); echo 'Created'; } else { echo 'Exists'; }`;
    const output = execSync(`terminus drush "${env}" -- ev "${phpCode}"`, {
      encoding: 'utf-8',
      timeout: 120000,
    });
    if (output.includes('Created')) created = true;
  }

  // Only index and wait if new content was created
  if (created) {
    execSync(`terminus drush "${env}" -- search-api:index site_content`, {
      encoding: 'utf-8',
      timeout: 120000,
    });
    await page.waitForTimeout(15000);
  }
});

/**
 * CUJ 6: Search via the front-end search page.
 * Requires a Views search page connected to the Search API index.
 * The Views page is created via drush if it doesn't exist (infrastructure).
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

  // If the table has rows, check they aren't error-level entries about Solr
  if (count > 0) {
    const bodyText = await page.locator('body').textContent() || '';
    expect(bodyText).not.toContain('Exception');
  }
});
