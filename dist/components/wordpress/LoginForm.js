"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const constants_1 = require("../../config/constants");
/**
 * WordPress login form component
 * The standard login form at /wp-login.php
 */
class LoginForm {
    page;
    constructor(page) {
        this.page = page;
    }
    get form() {
        return this.page.locator('#loginform');
    }
    get usernameInput() {
        return this.page.locator('#user_login');
    }
    get passwordInput() {
        return this.page.locator('#user_pass');
    }
    get submitButton() {
        return this.page.locator('#wp-submit');
    }
    get errorMessage() {
        return this.page.locator('#login_error');
    }
    get rememberMe() {
        return this.page.locator('#rememberme');
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