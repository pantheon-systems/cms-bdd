import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { AdminBar } from '../../components/wordpress/AdminBar';
import { AdminMenu } from '../../components/wordpress/AdminMenu';
/**
 * WordPress Admin Page
 * Represents the WordPress admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
export declare class AdminPage extends BasePage {
    readonly adminBar: AdminBar;
    readonly adminMenu: AdminMenu;
    constructor(page: Page);
    /** The main content wrap area */
    get contentWrap(): import("playwright-core").Locator;
    /** The page heading in the content area */
    get pageTitle(): import("playwright-core").Locator;
    /**
     * Verify the WordPress admin UI is fully loaded
     * Checks that the admin bar, admin menu, and content area are visible
     * @returns true if the admin page is loaded
     */
    isAdminLoaded(): Promise<boolean>;
}
//# sourceMappingURL=AdminPage.d.ts.map