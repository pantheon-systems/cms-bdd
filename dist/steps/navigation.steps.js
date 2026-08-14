"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const constants_1 = require("../config/constants");
const { Given, When } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Given('I am on the homepage', async ({ page }) => {
    await page.goto('/', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    await page.waitForLoadState('domcontentloaded', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
});
Given('I visit {string}', async ({ page }, url) => {
    await page.goto(url, { timeout: constants_1.TIMEOUTS.NAVIGATION });
    await page.waitForLoadState('domcontentloaded', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
});
When('I reload the page', async ({ page }) => {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: constants_1.TIMEOUTS.NAVIGATION });
});
When('I go back', async ({ page }) => {
    await page.goBack({ waitUntil: 'domcontentloaded', timeout: constants_1.TIMEOUTS.NAVIGATION });
});
When('I go forward', async ({ page }) => {
    await page.goForward({ waitUntil: 'domcontentloaded', timeout: constants_1.TIMEOUTS.NAVIGATION });
});
//# sourceMappingURL=navigation.steps.js.map