"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const { When } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
When('I fill in {string} with {string}', async ({ page }, field, value) => {
    await page.getByLabel(field).fill(value);
});
When('I fill in the following:', async ({ page }, dataTable) => {
    for (const [field, value] of Object.entries(dataTable.rowsHash())) {
        await page.getByLabel(field).fill(value);
    }
});
When('I press {string}', async ({ page }, buttonName) => {
    await page.getByRole('button', { name: buttonName }).click();
});
When('I follow {string}', async ({ page }, linkText) => {
    await page.getByRole('link', { name: linkText }).click();
});
When('I select {string} from {string}', async ({ page }, option, field) => {
    await page.getByLabel(field).selectOption({ label: option });
});
When('I check {string}', async ({ page }, label) => {
    await page.getByLabel(label).check();
});
When('I uncheck {string}', async ({ page }, label) => {
    await page.getByLabel(label).uncheck();
});
When('I attach the file {string} to {string}', async ({ page }, filePath, field) => {
    await page.getByLabel(field).setInputFiles(filePath);
});
//# sourceMappingURL=form.steps.js.map