import { Page } from '@playwright/test';
/**
 * Drupal Extend (Modules) page component
 * Admin > Extend (/admin/modules)
 */
export declare class ExtendPage {
    readonly page: Page;
    constructor(page: Page);
    get filterInput(): import("playwright-core").Locator;
    get installButton(): import("playwright-core").Locator;
    /**
     * Get the checkbox for a module by its visible label text.
     * Targets the table row containing the module name and finds its checkbox.
     */
    getModuleCheckbox(moduleName: string): import("playwright-core").Locator;
    /**
     * Enable a module by name via the Extend UI.
     * Filters the list, checks the box, clicks Install, handles dependency confirmation.
     */
    enableModule(moduleName: string): Promise<void>;
    isModuleEnabled(moduleName: string): Promise<boolean>;
}
//# sourceMappingURL=ExtendPage.d.ts.map