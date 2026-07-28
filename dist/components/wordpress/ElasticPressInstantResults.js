"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressInstantResults = void 0;
const constants_1 = require("../../config/constants");
class ElasticPressInstantResults {
    page;
    constructor(page) {
        this.page = page;
    }
    get modal() {
        return this.page.locator('div.ep-search-modal[role="dialog"]');
    }
    get closeButton() {
        return this.page.locator('button.ep-search-modal__close');
    }
    get resultsContainer() {
        return this.page.locator('.ep-search-results');
    }
    get resultsTitle() {
        return this.page.locator('.ep-search-results__title');
    }
    get sidebar() {
        return this.page.locator('.ep-search-sidebar');
    }
    get resultItems() {
        return this.resultsContainer.locator('article, [class*="result"]');
    }
    async isModalVisible() {
        try {
            await this.modal.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async hasResults() {
        try {
            await this.resultsTitle.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            const text = await this.resultsTitle.innerText();
            return !text.toLowerCase().includes('no results');
        }
        catch {
            return false;
        }
    }
    async hasFilters() {
        try {
            await this.sidebar.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    async closeModal() {
        await this.closeButton.click();
    }
}
exports.ElasticPressInstantResults = ElasticPressInstantResults;
//# sourceMappingURL=ElasticPressInstantResults.js.map