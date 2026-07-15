import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';
import { terminusExec } from '../../../utils/terminus.util';

const { When, Then } = createBdd(test);

/**
 * Gets the site environment from WP_CLI_SITE_ENV environment variable
 * @returns {string} The site environment (e.g., 'site-name.env')
 * @throws {Error} If WP_CLI_SITE_ENV is not set
 */
function getCliSiteEnv(): string {
  const siteEnv = process.env.WP_CLI_SITE_ENV;
  if (!siteEnv) {
    throw new Error('WP_CLI_SITE_ENV is not set — ensure ELASTIC_CLI_BASE is configured and global-setup ran');
  }
  return siteEnv;
}

/**
 * Installs and activates the ElasticPress plugin via WP-CLI
 * @example When I install and activate the ElasticPress plugin via WP-CLI
 */
When('I install and activate the ElasticPress plugin via WP-CLI', async () => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(`remote:wp ${siteEnv} -- plugin install elasticpress --activate`, 120000);
  console.log(`[ep-cli] plugin install output: ${output}`);
});

/**
 * Verifies the ElasticPress plugin is active
 * @example Then the ElasticPress plugin should be active
 */
Then('the ElasticPress plugin should be active', async () => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(`remote:wp ${siteEnv} -- plugin list --status=active --format=csv`);
  expect(output).toContain('elasticpress');
});

/**
 * Runs an ElasticPress sync via WP-CLI with setup and auto-confirm flags
 * @example When I run an ElasticPress sync via WP-CLI
 */
When('I run an ElasticPress sync via WP-CLI', async () => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(`remote:wp ${siteEnv} -- elasticpress sync --setup --yes`, 180000);
  console.log(`[ep-cli] sync output: ${output}`);
});

/**
 * Verifies ElasticPress has indexed content by checking stats command output
 * @example Then ElasticPress should have indexed content
 */
Then('ElasticPress should have indexed content', async () => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(`remote:wp ${siteEnv} -- elasticpress stats`);
  expect(output).not.toContain('is not a registered wp command');
  expect(output.length).toBeGreaterThan(0);
});

/**
 * Creates a test post with the specified title via WP-CLI
 * @example When I create a test post titled "My Test Post" via WP-CLI
 */
When('I create a test post titled {string} via WP-CLI', async ({}, title: string) => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(
    `remote:wp ${siteEnv} -- post create --post_title="${title}" --post_status=publish --porcelain`
  );
  const postId = output.trim();
  console.log(`[ep-cli] created post ID: ${postId}`);
});

/**
 * Verifies that a WP_Query search with ElasticPress integration returns results
 * @example Then a WP_Query search for "test post" should return results
 */
Then('a WP_Query search for {string} should return results', async ({}, searchTerm: string) => {
  const siteEnv = getCliSiteEnv();
  const output = terminusExec(
    `remote:wp ${siteEnv} -- eval "\\$q = new WP_Query(['s' => '${searchTerm}', 'ep_integrate' => true]); echo 'FOUND=' . \\$q->found_posts;"`,
    60000
  );
  expect(output).toContain('FOUND=');
  const match = output.match(/FOUND=(\d+)/);
  expect(match).not.toBeNull();
  const count = parseInt(match![1], 10);
  expect(count, `Expected search for "${searchTerm}" to return results, got ${count}`).toBeGreaterThan(0);
});
