"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const playwright_bdd_1 = require("playwright-bdd");
const LoginPage_1 = require("../pages/drupal/LoginPage");
const LoginPage_2 = require("../pages/wordpress/LoginPage");
const ElasticPressPage_1 = require("../pages/wordpress/ElasticPressPage");
exports.test = playwright_bdd_1.test.extend({
    drupalLoginPage: async ({ page }, use) => {
        await use(new LoginPage_1.LoginPage(page));
    },
    wpLoginPage: async ({ page }, use) => {
        await use(new LoginPage_2.LoginPage(page));
    },
    elasticPressPage: async ({ page }, use) => {
        await use(new ElasticPressPage_1.ElasticPressPage(page));
    },
});
var test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
//# sourceMappingURL=customFixtures.js.map