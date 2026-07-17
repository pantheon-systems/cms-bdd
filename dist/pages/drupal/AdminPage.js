"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPage = void 0;
const BasePage_1 = require("../BasePage");
const Toolbar_1 = require("../../components/drupal/Toolbar");
/**
 * Drupal Admin Page
 * Represents the Drupal admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
class AdminPage extends BasePage_1.BasePage {
    toolbar;
    constructor(page) {
        super(page);
        this.toolbar = new Toolbar_1.Toolbar(page);
    }
    /** The page title element in the admin content area */
    get pageTitle() {
        return this.page.locator('h1.page-title');
    }
    /** The main admin content area */
    get contentArea() {
        return this.page.locator('main, #content, .layout-content').first();
    }
    /**
     * Verify the Drupal admin UI is fully loaded
     * Checks that the admin toolbar and content area are visible
     * @returns true if the admin page is loaded
     */
    async isAdminLoaded() {
        try {
            const toolbarVisible = await this.toolbar.isToolbarVisible();
            await this.contentArea.waitFor({ state: 'visible', timeout: 10000 });
            return toolbarVisible;
        }
        catch {
            return false;
        }
    }
}
exports.AdminPage = AdminPage;
//# sourceMappingURL=AdminPage.js.map