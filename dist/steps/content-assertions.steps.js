"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const constants_1 = require("../config/constants");
const test_1 = require("@playwright/test");
const { Then } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Then('I should see {string}', async ({ page }, text) => {
    await (0, test_1.expect)(page.getByText(text, { exact: false }).first()).toBeVisible({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('I should not see {string}', async ({ page }, text) => {
    await (0, test_1.expect)(page.getByText(text, { exact: false })).toHaveCount(0, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('I should see text matching {string}', async ({ page }, pattern) => {
    const content = await page.textContent('body');
    (0, test_1.expect)(content).toMatch(new RegExp(pattern));
});
Then('the response should contain {string}', async ({ page }, text) => {
    const html = await page.content();
    (0, test_1.expect)(html).toContain(text);
});
Then('the response should not contain {string}', async ({ page }, text) => {
    const html = await page.content();
    (0, test_1.expect)(html).not.toContain(text);
});
//# sourceMappingURL=content-assertions.steps.js.map