"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBar = void 0;
const constants_1 = require("../../config/constants");
/**
 * WordPress Admin Bar component
 * The horizontal bar at the top of the WordPress admin UI (#wpadminbar)
 */
class AdminBar {
    page;
    constructor(page) {
        this.page = page;
    }
    /** The admin bar container */
    get adminBar() {
        return this.page.locator('#wpadminbar');
    }
    /** Site name link in the admin bar */
    get siteName() {
        return this.page.locator('#wp-admin-bar-site-name a.ab-item');
    }
    /** "Howdy, <username>" greeting / user account menu */
    get userGreeting() {
        return this.page.locator('#wp-admin-bar-my-account a.ab-item');
    }
    /** New content dropdown (+ New) */
    get newContentBtn() {
        return this.page.locator('#wp-admin-bar-new-content a.ab-item');
    }
    /**
     * Verify the WordPress admin bar is visible
     * @returns true if admin bar is visible
     */
    async isAdminBarVisible() {
        try {
            await this.adminBar.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.AdminBar = AdminBar;
//# sourceMappingURL=AdminBar.js.map