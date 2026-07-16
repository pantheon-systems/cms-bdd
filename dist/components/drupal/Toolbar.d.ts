import { Page } from '@playwright/test';
/**
 * Drupal Admin Toolbar component
 * The horizontal toolbar at the top of the Drupal admin UI (#toolbar-administration)
 */
export declare class Toolbar {
    readonly page: Page;
    constructor(page: Page);
    /** The toolbar container */
    get toolbar(): import("playwright-core").Locator;
    /** The toolbar menu bar (Manage, Shortcuts, admin account) */
    get toolbarBar(): import("playwright-core").Locator;
    /** Home icon / back to site button */
    get homeBtn(): import("playwright-core").Locator;
    /** "Manage" menu link */
    get manageLink(): import("playwright-core").Locator;
    /** Admin tray (expandable menu area below the toolbar bar) */
    get adminTray(): import("playwright-core").Locator;
    /**
     * Get a top-level admin menu item by label
     * @param label - Menu item text (e.g., "Content", "Structure", "Configuration")
     */
    getMenuItem(label: string): import("playwright-core").Locator;
    /**
     * Verify the Drupal admin toolbar is fully loaded
     * @returns true if toolbar elements are visible
     */
    isToolbarVisible(): Promise<boolean>;
}
//# sourceMappingURL=Toolbar.d.ts.map