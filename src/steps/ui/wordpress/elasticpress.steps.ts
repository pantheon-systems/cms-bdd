import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';

const { Given, When, Then } = createBdd(test);

When('I navigate to the ElasticPress Settings page', async ({ elasticPressPage }) => {
  await elasticPressPage.gotoSettings();
});

When('I navigate to the ElasticPress Sync page', async ({ elasticPressPage }) => {
  await elasticPressPage.gotoSync();
});

When('I navigate to the ElasticPress Health page', async ({ elasticPressPage }) => {
  await elasticPressPage.gotoHealth();
});

When('I navigate to the ElasticPress Features page', async ({ elasticPressPage }) => {
  await elasticPressPage.gotoFeatures();
});

Then('the ElasticPress Host URL should be pre-populated', async ({ elasticPressPage }) => {
  const isPopulated = await elasticPressPage.settings.isHostUrlPopulated();
  expect(isPopulated).toBe(true);
});

Then('the ElasticPress Host URL should use the proxy', async ({ elasticPressPage }) => {
  const isProxy = await elasticPressPage.settings.isHostUrlUsingProxy();
  expect(isProxy).toBe(true);
});

Then('the ElasticPress Host URL should be defined in wp-config', async ({ elasticPressPage }) => {
  const isDefined = await elasticPressPage.settings.isHostDefinedInConfig();
  expect(isDefined).toBe(true);
});

When('I run an ElasticPress index sync', async ({ elasticPressPage }) => {
  await elasticPressPage.sync.runSync();
});

Then('the ElasticPress index sync should be complete', async ({ elasticPressPage }) => {
  const isComplete = await elasticPressPage.sync.isSyncComplete();
  expect(isComplete).toBe(true);
});

Then('the ElasticPress index health should be {string}', async ({ elasticPressPage }, status: string) => {
  const health = await elasticPressPage.health.getFirstIndexHealth();
  expect(health).toBe(status);
});

Then('the ElasticPress site should have indices', async ({ elasticPressPage }) => {
  const hasIndices = await elasticPressPage.health.hasIndices();
  expect(hasIndices).toBe(true);
});

Given('the ElasticPress {string} feature is enabled on the Features page', async ({ elasticPressPage }, featurePath: string) => {
  const [category, feature] = featurePath.split('/');
  await elasticPressPage.gotoFeatures();
  await elasticPressPage.features.navigateToFeature(category, feature);
  const isEnabled = await elasticPressPage.features.isFeatureEnabled();
  expect(isEnabled).toBe(true);
});

When('I navigate to the WordPress site frontend', async ({ elasticPressPage }) => {
  await elasticPressPage.gotoFrontend();
});

When('I search for {string} using the WordPress search', async ({ elasticPressPage }, term: string) => {
  await elasticPressPage.search.submitSearch(term);
});

Then('I should see WordPress search results for {string}', async ({ elasticPressPage }, _term: string) => {
  const hasHeading = await elasticPressPage.search.hasResultsHeading();
  expect(hasHeading, 'Search results heading should be visible').toBe(true);
  const hasResults = await elasticPressPage.search.hasResults();
  expect(hasResults, 'Search results list should contain at least one result').toBe(true);
});

Then('the search results should load within {int} seconds', async ({ elasticPressPage }, maxSeconds: number) => {
  const latencyMs = await elasticPressPage.search.measureSearchLatency('hello');
  console.log(`[search latency] ${latencyMs}ms`);
  expect(latencyMs, `Search latency ${latencyMs}ms exceeded ${maxSeconds}s threshold`).toBeLessThan(maxSeconds * 1000);
});

When('I type {string} in the WordPress search field', async ({ elasticPressPage }, term: string) => {
  await elasticPressPage.search.typeSearchField(term);
});

Then('I should see autosuggest suggestions', async ({ elasticPressPage }) => {
  const hasSuggestions = await elasticPressPage.autosuggest.waitForSuggestions();
  expect(hasSuggestions).toBe(true);
});

Then('the autosuggest suggestions should include {string}', async ({ elasticPressPage }, text: string) => {
  const hasSuggestion = await elasticPressPage.autosuggest.hasSuggestion(text);
  expect(hasSuggestion).toBe(true);
});

When('I submit a search for {string} via the WordPress search form', async ({ elasticPressPage }, term: string) => {
  await elasticPressPage.search.submitSearchViaForm(term);
});

Then('the Instant Results modal should be displayed', async ({ elasticPressPage }) => {
  const isVisible = await elasticPressPage.instantResults.isModalVisible();
  expect(isVisible).toBe(true);
});

Then('the Instant Results should show results for {string}', async ({ elasticPressPage }, _term: string) => {
  const hasResults = await elasticPressPage.instantResults.hasResults();
  expect(hasResults).toBe(true);
});

Then('the Instant Results should have filters', async ({ elasticPressPage }) => {
  const hasFilters = await elasticPressPage.instantResults.hasFilters();
  expect(hasFilters).toBe(true);
});
