import { LoginPage as DrupalLoginPage } from '../pages/drupal/LoginPage';
import { LoginPage as WPLoginPage } from '../pages/wordpress/LoginPage';
import { ElasticPressPage } from '../pages/wordpress/ElasticPressPage';
export type CustomFixtures = {
    drupalLoginPage: DrupalLoginPage;
    wpLoginPage: WPLoginPage;
    elasticPressPage: ElasticPressPage;
};
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & import("playwright-bdd").BddTestFixtures & CustomFixtures, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions & import("playwright-bdd").BddWorkerFixtures>;
export { expect } from '@playwright/test';
//# sourceMappingURL=customFixtures.d.ts.map