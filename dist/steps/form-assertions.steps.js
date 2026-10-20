"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_bdd_1 = require("playwright-bdd");
const customFixtures_1 = require("../fixtures/customFixtures");
const constants_1 = require("../config/constants");
const field_locator_1 = require("../utils/field-locator");
const test_1 = require("@playwright/test");
const { Then } = (0, playwright_bdd_1.createBdd)(customFixtures_1.test);
Then('the {string} field should contain {string}', async ({ page }, field, value) => {
    await (0, test_1.expect)((0, field_locator_1.fieldLocator)(page, field)).toHaveValue(value, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('the {string} field should not contain {string}', async ({ page }, field, value) => {
    await (0, test_1.expect)((0, field_locator_1.fieldLocator)(page, field)).not.toHaveValue(value, {
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('the {string} checkbox should be checked', async ({ page }, label) => {
    await (0, test_1.expect)((0, field_locator_1.fieldLocator)(page, label)).toBeChecked({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
Then('the {string} checkbox should not be checked', async ({ page }, label) => {
    await (0, test_1.expect)((0, field_locator_1.fieldLocator)(page, label)).not.toBeChecked({
        timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
    });
});
//# sourceMappingURL=form-assertions.steps.js.map