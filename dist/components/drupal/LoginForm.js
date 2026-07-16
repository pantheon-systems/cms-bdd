"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const constants_1 = require("../../config/constants");
/**
 * Drupal login form component
 * The standard login form at /user/login
 */
class LoginForm {
    page;
    constructor(page) {
        this.page = page;
    }
    get form() {
        return this.page.locator('#user-login-form');
    }
    get usernameInput() {
        return this.form.locator('#edit-name');
    }
    get passwordInput() {
        return this.form.locator('#edit-pass');
    }
    get submitButton() {
        return this.form.locator('#edit-submit');
    }
    get errorMessage() {
        return this.page.locator('.messages--error');
    }
    async isFormVisible() {
        try {
            await this.form.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.LoginForm = LoginForm;
//# sourceMappingURL=LoginForm.js.map