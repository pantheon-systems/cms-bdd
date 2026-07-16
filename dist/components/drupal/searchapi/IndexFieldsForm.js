"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexFieldsForm = void 0;
const constants_1 = require("../../../config/constants");
/**
 * Search API Index Fields management page
 * Route: /admin/config/search/search-api/index/{id}/fields
 */
class IndexFieldsForm {
    page;
    constructor(page) {
        this.page = page;
    }
    get addFieldsButton() {
        return this.page.locator('a:has-text("Add fields"), input[value="Add fields"]');
    }
    get saveButton() {
        return this.page.locator('#edit-submit');
    }
    get fieldsTable() {
        return this.page.locator('table.search-api-index-fields, #search-api-index-fields');
    }
    get statusMessage() {
        return this.page.locator('.messages--status');
    }
    /**
     * Add a field by finding its row in the fields table and clicking "Add"
     * @param fieldName - The field label to add (e.g. "Title", "Body")
     */
    async addField(fieldName) {
        const row = this.page.locator('tr').filter({ hasText: fieldName });
        const addButton = row.getByRole('button', { name: 'Add' }).or(row.getByRole('link', { name: 'Add' }));
        await addButton.first().click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    async saveChanges() {
        // After adding fields, navigate back to the Fields tab which has the save button
        const fieldsTab = this.page.getByRole('link', { name: 'Fields' });
        const doneLink = this.page.getByRole('link', { name: 'Done' }).or(this.page.getByRole('link', { name: 'Back to fields' }));
        // Try "Done" or "Back to fields" first, fall back to Fields tab
        if (await doneLink.first().isVisible().catch(() => false)) {
            await doneLink.first().click();
        }
        else if (await fieldsTab.isVisible().catch(() => false)) {
            await fieldsTab.click();
        }
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
        // Now click Save changes on the fields management page
        const saveBtn = this.page.getByRole('button', { name: 'Save changes' }).or(this.page.locator('#edit-submit'));
        await saveBtn.first().click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
    async isFormVisible() {
        try {
            await this.addFieldsButton.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.IndexFieldsForm = IndexFieldsForm;
//# sourceMappingURL=IndexFieldsForm.js.map