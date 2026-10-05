"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const test_1 = require("@playwright/test");
const { Then } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Then('I should be on {string}', async ({ page }, path) => {
    const url = new URL(page.url());
    (0, test_1.expect)(url.pathname).toBe(path);
});
Then('I should be on the homepage', async ({ page }) => {
    const url = new URL(page.url());
    (0, test_1.expect)(url.pathname).toBe('/');
});
Then('the URL should match {string}', async ({ page }, pattern) => {
    (0, test_1.expect)(page.url()).toMatch(new RegExp(pattern));
});
//# sourceMappingURL=url-assertions.steps.js.map