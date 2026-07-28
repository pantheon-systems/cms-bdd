import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Toolbar } from '../../components/drupal/Toolbar';
/**
 * Drupal Admin Page
 * Represents the Drupal admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
export declare class AdminPage extends BasePage {
    readonly toolbar: Toolbar;
    constructor(page: Page);
    /** The page title element in the admin content area */
    get pageTitle(): import("playwright-core").Locator;
    /** The main admin content area */
    get contentArea(): import("playwright-core").Locator;
    /**
     * Verify the Drupal admin UI is fully loaded
     * Checks that the admin toolbar and content area are visible
     * @returns true if the admin page is loaded
     */
    isAdminLoaded(): Promise<boolean>;
}
//# sourceMappingURL=AdminPage.d.ts.map