"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexForm = void 0;
const constants_1 = require("../../../config/constants");
/**
 * Search API Add Index form
 * Route: /admin/config/search/search-api/add-index
 */
class IndexForm {
    page;
    constructor(page) {
        this.page = page;
    }
    get nameInput() {
        return this.page.locator('#edit-name');
    }
    get machineNameInput() {
        return this.page.locator('#edit-id');
    }
    /**
     * Datasource checkboxes — e.g. "Content" = entity:node
     * Use getDatasourceCheckbox() to target by label
     */
    get datasourceFieldset() {
        return this.page.locator('#edit-datasources');
    }
    get serverGroup() {
        return this.page.locator('#edit-server');
    }
    get indexImmediatelyCheckbox() {
        return this.page.locator('#edit-options-index-directly');
    }
    get saveButton() {
        return this.page.locator('#edit-submit');
    }
    getDatasourceCheckbox(label) {
        return this.page.getByRole('checkbox', { name: label, exact: true });
    }
    async isFormVisible() {
        try {
            await this.nameInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Fill and save the Add Index form
     * @param name - Index name (e.g. "Site Content")
     * @param datasource - Datasource label (e.g. "Content")
     * @param server - Server name to select from dropdown
     */
    async fillAndSave(name, datasource, server) {
        await this.nameInput.fill(name);
        const dsCheckbox = this.getDatasourceCheckbox(datasource);
        await dsCheckbox.check();
        // Drupal AJAX fires after checking a datasource — wait for the "Processing" indicator
        // to appear and disappear, then verify the checkbox is still checked
        const ajaxProgress = this.page.locator('.ajax-progress, .ajax-progress-throbber');
        try {
            await ajaxProgress.first().waitFor({ state: 'visible', timeout: 3000 });
            await ajaxProgress.first().waitFor({ state: 'hidden', timeout: constants_1.TIMEOUTS.LOAD_STATE });
        }
        catch {
            // AJAX may have completed very quickly
        }
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
        // Re-check if the AJAX rebuilt the form and unchecked it
        const isStillChecked = await dsCheckbox.isChecked();
        if (!isStillChecked) {
            await dsCheckbox.check();
            await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
        }
        await this.page.getByRole('radio', { name: server }).check();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
        // Click "Save and add fields" to go directly to the fields page
        const saveAndAddFields = this.page.getByRole('button', { name: 'Save and add fields' });
        await saveAndAddFields.click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
}
exports.IndexForm = IndexForm;
//# sourceMappingURL=IndexForm.js.map