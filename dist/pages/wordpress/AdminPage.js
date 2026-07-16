"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPage = void 0;
const BasePage_1 = require("../BasePage");
const AdminBar_1 = require("../../components/wordpress/AdminBar");
const AdminMenu_1 = require("../../components/wordpress/AdminMenu");
/**
 * WordPress Admin Page
 * Represents the WordPress admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
class AdminPage extends BasePage_1.BasePage {
    adminBar;
    adminMenu;
    constructor(page) {
        super(page);
        this.adminBar = new AdminBar_1.AdminBar(page);
        this.adminMenu = new AdminMenu_1.AdminMenu(page);
    }
    /** The main content wrap area */
    get contentWrap() {
        return this.page.locator('#wpbody-content');
    }
    /** The page heading in the content area */
    get pageTitle() {
        return this.page.locator('#wpbody-content h1');
    }
    /**
     * Verify the WordPress admin UI is fully loaded
     * Checks that the admin bar, admin menu, and content area are visible
     * @returns true if the admin page is loaded
     */
    async isAdminLoaded() {
        try {
            const [barVisible, menuVisible] = await Promise.all([
                this.adminBar.isAdminBarVisible(),
                this.adminMenu.isMenuVisible(),
            ]);
            await this.contentWrap.waitFor({ state: 'visible', timeout: 10000 });
            return barVisible && menuVisible;
        }
        catch {
            return false;
        }
    }
}
exports.AdminPage = AdminPage;
//# sourceMappingURL=AdminPage.js.map