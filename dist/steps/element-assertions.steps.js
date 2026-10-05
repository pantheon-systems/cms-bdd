"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const constants_1 = require("../config/constants");
const test_1 = require("@playwright/test");
const { Then } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Then('I should see a {string} element', async ({ page }, selector) => {
    await (0, test_1.expect)(page.locator(selector).first()).toBeVisible({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('I should not see a {string} element', async ({ page }, selector) => {
    await (0, test_1.expect)(page.locator(selector)).toHaveCount(0, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('I should see {string} in the {string} element', async ({ page }, text, selector) => {
    await (0, test_1.expect)(page.locator(selector).first()).toContainText(text, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('I should see {int} {string} elements', async ({ page }, count, selector) => {
    await (0, test_1.expect)(page.locator(selector)).toHaveCount(count, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('the {string} element should be visible', async ({ page }, selector) => {
    await (0, test_1.expect)(page.locator(selector).first()).toBeVisible({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('the {string} element should not be visible', async ({ page }, selector) => {
    await (0, test_1.expect)(page.locator(selector).first()).toBeHidden({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
//# sourceMappingURL=element-assertions.steps.js.map