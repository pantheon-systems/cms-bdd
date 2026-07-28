"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressAutosuggest = void 0;
const constants_1 = require("../../config/constants");
class ElasticPressAutosuggest {
    page;
    constructor(page) {
        this.page = page;
    }
    get container() {
        return this.page.locator('div.ep-autosuggest');
    }
    get suggestionsList() {
        return this.page.locator('ul.autosuggest-list[role="listbox"]');
    }
    get suggestionItems() {
        return this.suggestionsList.locator('li');
    }
    async waitForSuggestions() {
        try {
            await this.suggestionItems
                .first()
                .waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    async getSuggestionTexts() {
        await this.suggestionItems
            .first()
            .waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        return await this.suggestionItems.allInnerTexts();
    }
    async hasSuggestion(text) {
        const suggestions = await this.getSuggestionTexts();
        return suggestions.some((s) => s.trim().toLowerCase().includes(text.toLowerCase()));
    }
    async clickSuggestion(text) {
        await this.suggestionsList.locator('li', { hasText: text }).click();
    }
}
exports.ElasticPressAutosuggest = ElasticPressAutosuggest;
//# sourceMappingURL=ElasticPressAutosuggest.js.map