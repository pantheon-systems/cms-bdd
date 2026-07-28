"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordPressSearch = void 0;
const constants_1 = require("../../config/constants");
class WordPressSearch {
    page;
    baseUrl;
    constructor(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;
    }
    get searchInput() {
        return this.page.locator('input[type="search"]').first();
    }
    get searchSubmitButton() {
        return this.page
            .locator('button:text-is("Search"), input[type="submit"][value="Search"]')
            .first();
    }
    get searchResultsHeading() {
        return this.page.locator('h1').filter({ hasText: 'Search results for' });
    }
    get searchResultItems() {
        return this.page.locator('main article, .search-results article, .hentry');
    }
    async submitSearch(term) {
        await this.page.goto(`${this.baseUrl}/?s=${encodeURIComponent(term)}`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    async submitSearchViaForm(term) {
        await this.page.goto(`${this.baseUrl}/?s=`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
        await this.searchInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        await this.searchInput.clear();
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
    }
    async typeSearchField(term) {
        await this.searchInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        await this.searchInput.clear();
        await this.searchInput.pressSequentially(term, { delay: 100 });
    }
    async hasResults() {
        try {
            await this.searchResultItems
                .first()
                .waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async getResultCount() {
        await this.searchResultItems
            .first()
            .waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
        return await this.searchResultItems.count();
    }
    async hasResultsHeading() {
        try {
            await this.searchResultsHeading.waitFor({
                state: 'visible',
                timeout: constants_1.TIMEOUTS.NAVIGATION,
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async measureSearchLatency(term) {
        const start = Date.now();
        await this.page.goto(`${this.baseUrl}/?s=${encodeURIComponent(term)}`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
        await this.searchResultsHeading.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
        return Date.now() - start;
    }
}
exports.WordPressSearch = WordPressSearch;
//# sourceMappingURL=WordPressSearch.js.map