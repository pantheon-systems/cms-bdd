"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("../BasePage");
const LoginForm_1 = require("../../components/drupal/LoginForm");
const Toolbar_1 = require("../../components/drupal/Toolbar");
const environment_1 = require("../../config/environment");
const constants_1 = require("../../config/constants");
/**
 * Drupal Login Page
 * Handles direct login via the Drupal /user/login form.
 */
class LoginPage extends BasePage_1.BasePage {
    loginForm;
    toolbar;
    constructor(page) {
        super(page);
        this.loginForm = new LoginForm_1.LoginForm(page);
        this.toolbar = new Toolbar_1.Toolbar(page);
    }
    /**
     * Log in to a Drupal site via /user/login
     * @param username - Defaults to ENV.DRUPAL_USER
     * @param password - Defaults to ENV.DRUPAL_PASSWORD
     * @param url - Base URL of the Drupal site. Defaults to ENV.DRUPAL_URL
     */
    async login(username, password, url) {
        const baseUrl = url || environment_1.ENV.DRUPAL_URL;
        const user = username || environment_1.ENV.DRUPAL_USER;
        const pass = password || environment_1.ENV.DRUPAL_PASSWORD;
        if (!baseUrl)
            throw new Error('DRUPAL_URL is not configured');
        if (!user || !pass)
            throw new Error('DRUPAL_USER or DRUPAL_PASSWORD is not configured');
        await this.page.goto(`${baseUrl}/user/login`, {
            waitUntil: 'domcontentloaded',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
        await this.loginForm.usernameInput.fill(user);
        await this.loginForm.passwordInput.fill(pass);
        await this.loginForm.submitButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    /**
     * Check whether the user is logged in by verifying the admin toolbar is visible
     */
    async isLoggedIn() {
        try {
            await this.toolbar.toolbarBar.waitFor({
                state: 'visible',
                timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
            });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map