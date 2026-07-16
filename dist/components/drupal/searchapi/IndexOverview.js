"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexOverview = void 0;
const constants_1 = require("../../../config/constants");
/**
 * Search API Index overview/status page
 * Route: /admin/config/search/search-api/index/{id}
 */
class IndexOverview {
    page;
    constructor(page) {
        this.page = page;
    }
    get indexNowButton() {
        return this.page.getByRole('button', { name: 'Index now' });
    }
    get indexStatus() {
        return this.page.locator('.search-api-index-summary, .search-api-index-status');
    }
    get statusMessage() {
        return this.page.locator('.messages--status');
    }
    get pageTitle() {
        return this.page.locator('h1.page-title');
    }
    /**
     * Get the text showing indexing progress (e.g. "100% indexed" or "X/Y items indexed")
     */
    get indexingProgress() {
        return this.page.locator('.search-api-index-status, .search-api-index-summary');
    }
    async clickIndexNow() {
        if (await this.isFullyIndexed()) {
            console.log('[IndexOverview] Content already fully indexed, skipping Index now');
            return;
        }
        await this.indexNowButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
    /**
     * Check if the index is fully indexed by looking for status text
     */
    async isFullyIndexed() {
        try {
            const statusText = await this.page.locator('body').textContent();
            if (!statusText)
                return false;
            return statusText.includes('100%') ||
                statusText.includes('All items have been indexed') ||
                statusText.includes('remaining: 0');
        }
        catch {
            return false;
        }
    }
}
exports.IndexOverview = IndexOverview;
//# sourceMappingURL=IndexOverview.js.map