import { createBdd } from 'playwright-bdd';
import { execSync } from 'child_process';
import { test, expect } from '../../../fixtures/customFixtures';
import { waitForWorkflows } from '../../../utils/terminus.util';

const { When, Then } = createBdd(test);

let lastOutput = '';

/**
 * Gets the site name from ES_TOGGLE_SITE environment variable
 * @returns {string} The site name
 * @throws {Error} If ES_TOGGLE_SITE is not set
 */
function getToggleSite(): string {
  const site = process.env.ES_TOGGLE_SITE;
  if (!site) {
    throw new Error('ES_TOGGLE_SITE is not set — ensure it is configured in .env or CI');
  }
  return site;
}

/**
 * Executes a Terminus command and captures both stdout and stderr
 * @param {string} command - The Terminus command to execute (without 'terminus' prefix)
 * @param {number} timeoutMs - Timeout in milliseconds (default: 120000)
 * @returns {string} The combined stdout and stderr output
 */
function terminusWithStderr(command: string, timeoutMs = 120000): string {
  return execSync(`terminus ${command} 2>&1`, {
    encoding: 'utf-8',
    timeout: timeoutMs,
  }).trim();
}

/**
 * Disables Elasticsearch on the site via Terminus search:disable command
 * @example When I disable Elasticsearch on the site via Terminus
 */
When('I disable Elasticsearch on the site via Terminus', async () => {
  const site = getToggleSite();
  lastOutput = terminusWithStderr(`search:disable ${site}`, 120000);
  console.log(`[es-toggle] search:disable output: ${lastOutput}`);
});

/**
 * Verifies the search:disable command output does not contain errors
 * @example Then the search:disable output should not contain errors
 */
Then('the search:disable output should not contain errors', async () => {
  expect(lastOutput, `search:disable failed: ${lastOutput}`).not.toContain('[error]');
});

/**
 * Enables Elasticsearch on the site via Terminus search:enable command
 * @example When I enable Elasticsearch on the site via Terminus
 */
When('I enable Elasticsearch on the site via Terminus', async () => {
  const site = getToggleSite();
  lastOutput = terminusWithStderr(`search:enable ${site}`, 120000);
  console.log(`[es-toggle] search:enable output: ${lastOutput}`);
});

Then('the search:enable output should not contain errors', async () => {
  expect(lastOutput, `search:enable failed: ${lastOutput}`).not.toContain('[error]');
});

Then('the workflow status should show the operation completed', async () => {
  const site = getToggleSite();
  await waitForWorkflows(site, 300000);

  const output = terminusWithStderr(
    `workflow:list ${site} --fields=workflow,status --format=json`,
    30000
  );
  const workflows = JSON.parse(output);
  const latest = Object.values(workflows)[0] as any;
  expect(latest.status).toBe('succeeded');
});
