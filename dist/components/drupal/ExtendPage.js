"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendPage = void 0;
const constants_1 = require("../../config/constants");
/**
 * Drupal Extend (Modules) page component
 * Admin > Extend (/admin/modules)
 */
class ExtendPage {
    page;
    constructor(page) {
        this.page = page;
    }
    get filterInput() {
        return this.page.locator('#edit-text');
    }
    get installButton() {
        return this.page.locator('#edit-submit');
    }
    /**
     * Get the checkbox for a module by its visible label text.
     * Targets the table row containing the module name and finds its checkbox.
     */
    getModuleCheckbox(moduleName) {
        return this.page.getByRole('checkbox', { name: moduleName }).first();
    }
    /**
     * Enable a module by name via the Extend UI.
     * Filters the list, checks the box, clicks Install, handles dependency confirmation.
     */
    async enableModule(moduleName) {
        await this.filterInput.fill(moduleName);
        await this.page.waitForTimeout(500);
        const checkbox = this.getModuleCheckbox(moduleName);
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
            return;
        }
        await checkbox.check();
        await this.installButton.click();
        // Drupal may show a dependency confirmation page
        const continueButton = this.page.locator('#edit-submit');
        try {
            await continueButton.waitFor({ state: 'visible', timeout: 5000 });
            await continueButton.click();
        }
        catch {
            // No dependency confirmation needed
        }
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
    async isModuleEnabled(moduleName) {
        await this.filterInput.fill(moduleName);
        await this.page.waitForTimeout(500);
        try {
            const checkbox = this.getModuleCheckbox(moduleName);
            return await checkbox.isChecked();
        }
        catch {
            return false;
        }
    }
}
exports.ExtendPage = ExtendPage;
//# sourceMappingURL=ExtendPage.js.map