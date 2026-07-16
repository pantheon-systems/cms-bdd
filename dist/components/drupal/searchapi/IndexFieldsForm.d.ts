import { Page } from '@playwright/test';
/**
 * Search API Index Fields management page
 * Route: /admin/config/search/search-api/index/{id}/fields
 */
export declare class IndexFieldsForm {
    readonly page: Page;
    constructor(page: Page);
    get addFieldsButton(): import("playwright-core").Locator;
    get saveButton(): import("playwright-core").Locator;
    get fieldsTable(): import("playwright-core").Locator;
    get statusMessage(): import("playwright-core").Locator;
    /**
     * Add a field by finding its row in the fields table and clicking "Add"
     * @param fieldName - The field label to add (e.g. "Title", "Body")
     */
    addField(fieldName: string): Promise<void>;
    saveChanges(): Promise<void>;
    isFormVisible(): Promise<boolean>;
}
//# sourceMappingURL=IndexFieldsForm.d.ts.map