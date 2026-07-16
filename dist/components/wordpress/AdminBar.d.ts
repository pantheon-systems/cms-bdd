import { Page } from '@playwright/test';
/**
 * WordPress Admin Bar component
 * The horizontal bar at the top of the WordPress admin UI (#wpadminbar)
 */
export declare class AdminBar {
    readonly page: Page;
    constructor(page: Page);
    /** The admin bar container */
    get adminBar(): import("playwright-core").Locator;
    /** Site name link in the admin bar */
    get siteName(): import("playwright-core").Locator;
    /** "Howdy, <username>" greeting / user account menu */
    get userGreeting(): import("playwright-core").Locator;
    /** New content dropdown (+ New) */
    get newContentBtn(): import("playwright-core").Locator;
    /**
     * Verify the WordPress admin bar is visible
     * @returns true if admin bar is visible
     */
    isAdminBarVisible(): Promise<boolean>;
}
//# sourceMappingURL=AdminBar.d.ts.map