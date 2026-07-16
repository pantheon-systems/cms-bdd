import { Page } from '@playwright/test';
/**
 * Search API Add Index form
 * Route: /admin/config/search/search-api/add-index
 */
export declare class IndexForm {
    readonly page: Page;
    constructor(page: Page);
    get nameInput(): import("playwright-core").Locator;
    get machineNameInput(): import("playwright-core").Locator;
    /**
     * Datasource checkboxes — e.g. "Content" = entity:node
     * Use getDatasourceCheckbox() to target by label
     */
    get datasourceFieldset(): import("playwright-core").Locator;
    get serverGroup(): import("playwright-core").Locator;
    get indexImmediatelyCheckbox(): import("playwright-core").Locator;
    get saveButton(): import("playwright-core").Locator;
    getDatasourceCheckbox(label: string): import("playwright-core").Locator;
    isFormVisible(): Promise<boolean>;
    /**
     * Fill and save the Add Index form
     * @param name - Index name (e.g. "Site Content")
     * @param datasource - Datasource label (e.g. "Content")
     * @param server - Server name to select from dropdown
     */
    fillAndSave(name: string, datasource: string, server: string): Promise<void>;
}
//# sourceMappingURL=IndexForm.d.ts.map