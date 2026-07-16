"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStatus = void 0;
const constants_1 = require("../../../config/constants");
/**
 * Search API Server status/view page
 * Route: /admin/config/search/search-api/server/{id}
 */
class ServerStatus {
    page;
    constructor(page) {
        this.page = page;
    }
    get serverName() {
        return this.page.locator('h1.page-title');
    }
    /**
     * Connection status indicator — Drupal shows "Connected" with a green checkmark
     * or an error indicator when the server is unreachable
     */
    get connectionStatus() {
        return this.page.locator('.search-api-server-summary, .system-status-report');
    }
    get serverReachable() {
        return this.page.getByText('The Solr server could be reached.');
    }
    get coreAccessible() {
        return this.page.getByText('The Solr core could be accessed');
    }
    get statusMessages() {
        return this.page.locator('.messages--status');
    }
    async isConnected() {
        try {
            await this.serverReachable.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.ServerStatus = ServerStatus;
//# sourceMappingURL=ServerStatus.js.map