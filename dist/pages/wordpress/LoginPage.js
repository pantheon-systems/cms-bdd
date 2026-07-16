"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const BasePage_1 = require("../BasePage");
const LoginForm_1 = require("../../components/wordpress/LoginForm");
const AdminBar_1 = require("../../components/wordpress/AdminBar");
const environment_1 = require("../../config/environment");
const constants_1 = require("../../config/constants");
/**
 * WordPress Login Page
 * Handles direct login via the WordPress /wp-login.php form.
 */
class LoginPage extends BasePage_1.BasePage {
    loginForm;
    adminBar;
    constructor(page) {
        super(page);
        this.loginForm = new LoginForm_1.LoginForm(page);
        this.adminBar = new AdminBar_1.AdminBar(page);
    }
    /**
     * Log in to a WordPress site via /wp-login.php
     * @param username - Defaults to ENV.WP_USER
     * @param password - Defaults to ENV.WP_PASSWORD
     * @param url - Base URL of the WordPress site. Defaults to ENV.WP_URL
     */
    async login(username, password, url) {
        const baseUrl = url || environment_1.ENV.WP_URL;
        const user = username || environment_1.ENV.WP_USER;
        const pass = password || environment_1.ENV.WP_PASSWORD;
        if (!baseUrl)
            throw new Error('WP_URL is not configured');
        if (!user || !pass)
            throw new Error('WP_USER or WP_PASSWORD is not configured');
        await this.page.goto(`${baseUrl}/wp-login.php`, {
            waitUntil: 'domcontentloaded',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
        await this.loginForm.usernameInput.fill(user);
        await this.loginForm.passwordInput.fill(pass);
        await this.loginForm.submitButton.click();
        await this.page.waitForLoadState('load', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    /**
     * Check whether the user is logged in by verifying the admin bar is visible
     */
    async isLoggedIn() {
        return this.adminBar.isAdminBarVisible();
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map