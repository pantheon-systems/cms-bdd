import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../fixtures/customFixtures';
import { AdminPage as DrupalAdminPage } from '../../../pages/drupal/AdminPage';
import { AdminPage as WPAdminPage } from '../../../pages/wordpress/AdminPage';

const { Given, Then } = createBdd(test);

/**
 * Log in to a Drupal site directly via /user/login
 * Uses DRUPAL_URL, DRUPAL_USER, DRUPAL_PASSWORD from environment
 * @example Given I am logged in to the Drupal site
 */
Given('I am logged in to the Drupal site', async ({ drupalLoginPage }) => {
  await drupalLoginPage.login();
});

/**
 * Log in to a Drupal site at a specific URL
 * @example Given I am logged in to the Drupal site at "https://dev-my-site.example.com"
 */
Given('I am logged in to the Drupal site at {string}', async ({ drupalLoginPage }, url: string) => {
  await drupalLoginPage.login(undefined, undefined, url);
});

/**
 * Verify the user is logged in to the Drupal admin (toolbar visible)
 * @example Then I should be logged in to the Drupal admin
 */
Then('I should be logged in to the Drupal admin', async ({ drupalLoginPage }) => {
  const isLoggedIn = await drupalLoginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});

/**
 * Verify the Drupal admin is fully loaded on the current page (toolbar + content area)
 * @example Then the Drupal admin should be loaded on the current page
 */
Then('the Drupal admin should be loaded on the current page', async ({ page }) => {
  const drupalAdmin = new DrupalAdminPage(page);
  const isLoaded = await drupalAdmin.isAdminLoaded();
  expect(isLoaded).toBe(true);
});

/**
 * Log in to a WordPress site directly via /wp-login.php
 * Uses WP_URL, WP_USER, WP_PASSWORD from environment
 * @example Given I am logged in to the WordPress site
 */
Given('I am logged in to the WordPress site', async ({ wpLoginPage }) => {
  await wpLoginPage.login();
});

/**
 * Log in to a WordPress site at a specific URL
 * @example Given I am logged in to the WordPress site at "https://dev-my-site.example.com"
 */
Given('I am logged in to the WordPress site at {string}', async ({ wpLoginPage }, url: string) => {
  await wpLoginPage.login(undefined, undefined, url);
});

/**
 * Verify the user is logged in to the WordPress admin (admin bar visible)
 * @example Then I should be logged in to the WordPress admin
 */
Then('I should be logged in to the WordPress admin', async ({ wpLoginPage }) => {
  const isLoggedIn = await wpLoginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});

/**
 * Verify the WordPress admin is fully loaded on the current page (admin bar + menu + content)
 * @example Then the WordPress admin should be loaded on the current page
 */
Then('the WordPress admin should be loaded on the current page', async ({ page }) => {
  const wpAdmin = new WPAdminPage(page);
  const isLoaded = await wpAdmin.isAdminLoaded();
  expect(isLoaded).toBe(true);
});
