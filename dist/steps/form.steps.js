"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const field_locator_1 = require("../utils/field-locator");
const { When } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
When('I fill in {string} with {string}', async ({ page }, field, value) => {
    await (0, field_locator_1.fillField)((0, field_locator_1.fieldLocator)(page, field), value);
});
When('I fill in the following:', async ({ page }, dataTable) => {
    for (const [field, value] of Object.entries(dataTable.rowsHash())) {
        await (0, field_locator_1.fillField)((0, field_locator_1.fieldLocator)(page, field), value);
    }
});
When('I press {string}', async ({ page }, buttonName) => {
    await page.getByRole('button', { name: buttonName }).click();
});
When('I follow {string}', async ({ page }, linkText) => {
    await page.getByRole('link', { name: linkText }).click();
});
When('I select {string} from {string}', async ({ page }, option, field) => {
    await (0, field_locator_1.fieldLocator)(page, field).selectOption({ label: option });
});
When('I check {string}', async ({ page }, label) => {
    await (0, field_locator_1.fieldLocator)(page, label).check();
});
When('I uncheck {string}', async ({ page }, label) => {
    await (0, field_locator_1.fieldLocator)(page, label).uncheck();
});
When('I attach the file {string} to {string}', async ({ page }, filePath, field) => {
    await (0, field_locator_1.fieldLocator)(page, field).setInputFiles(filePath);
});
//# sourceMappingURL=form.steps.js.map