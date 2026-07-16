import { Page } from '@playwright/test';
/**
 * WordPress Admin Menu component
 * The sidebar menu on the left side of the WordPress admin UI (#adminmenu)
 */
export declare class AdminMenu {
    readonly page: Page;
    constructor(page: Page);
    /** The admin sidebar menu container */
    get menu(): import("playwright-core").Locator;
    /** Dashboard menu item */
    get dashboardLink(): import("playwright-core").Locator;
    /** Posts menu item */
    get postsLink(): import("playwright-core").Locator;
    /** Media menu item */
    get mediaLink(): import("playwright-core").Locator;
    /** Pages menu item */
    get pagesLink(): import("playwright-core").Locator;
    /** Appearance menu item */
    get appearanceLink(): import("playwright-core").Locator;
    /** Plugins menu item */
    get pluginsLink(): import("playwright-core").Locator;
    /** Users menu item */
    get usersLink(): import("playwright-core").Locator;
    /** Settings menu item */
    get settingsLink(): import("playwright-core").Locator;
    /**
     * Get a menu item by its visible text
     * @param label - Menu item text (e.g., "Dashboard", "Posts", "Plugins")
     */
    getMenuItem(label: string): import("playwright-core").Locator;
    /**
     * Verify the WordPress admin menu is visible
     * @returns true if admin menu is visible
     */
    isMenuVisible(): Promise<boolean>;
}
//# sourceMappingURL=AdminMenu.d.ts.map