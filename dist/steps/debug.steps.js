"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const logger_1 = require("../utils/logger");
const { Then } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Then('print current URL', async ({ page }) => {
    (0, logger_1.info)(`Current URL: ${page.url()}`);
});
Then('print page title', async ({ page }) => {
    const title = await page.title();
    (0, logger_1.info)(`Page title: ${title}`);
});
Then('take a screenshot', async ({ page, $testInfo }) => {
    const path = $testInfo.outputPath('debug-screenshot.png');
    await page.screenshot({ path, fullPage: true });
    await $testInfo.attach('debug-screenshot', { path, contentType: 'image/png' });
    (0, logger_1.info)(`Screenshot saved: ${path}`);
});
//# sourceMappingURL=debug.steps.js.map