import { test as base } from 'playwright-bdd';
import { LoginPage as DrupalLoginPage } from '../pages/drupal/LoginPage';
import { LoginPage as WPLoginPage } from '../pages/wordpress/LoginPage';
import { ElasticPressPage } from '../pages/wordpress/ElasticPressPage';

export type CustomFixtures = {
  drupalLoginPage: DrupalLoginPage;
  wpLoginPage: WPLoginPage;
  elasticPressPage: ElasticPressPage;
};

export const test = base.extend<CustomFixtures>({
  drupalLoginPage: async ({ page }, use) => {
    await use(new DrupalLoginPage(page));
  },
  wpLoginPage: async ({ page }, use) => {
    await use(new WPLoginPage(page));
  },
  elasticPressPage: async ({ page }, use) => {
    await use(new ElasticPressPage(page));
  },
});

export { expect } from '@playwright/test';
