"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
/**
 * BasePage provides the base structure for all page objects.
 * It exposes the Playwright Page instance, allowing page objects to use
 * the readonly locator pattern: `readonly loginBtn = this.page.locator(...)`
 *
 * Page objects should call Playwright methods directly rather than through wrappers.
 */
class BasePage {
    page;
    constructor(page) {
        this.page = page;
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map