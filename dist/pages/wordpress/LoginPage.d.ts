import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginForm } from '../../components/wordpress/LoginForm';
import { AdminBar } from '../../components/wordpress/AdminBar';
/**
 * WordPress Login Page
 * Handles direct login via the WordPress /wp-login.php form.
 */
export declare class LoginPage extends BasePage {
    readonly loginForm: LoginForm;
    readonly adminBar: AdminBar;
    constructor(page: Page);
    /**
     * Log in to a WordPress site via /wp-login.php
     * @param username - Defaults to ENV.WP_USER
     * @param password - Defaults to ENV.WP_PASSWORD
     * @param url - Base URL of the WordPress site. Defaults to ENV.WP_URL
     */
    login(username?: string, password?: string, url?: string): Promise<void>;
    /**
     * Check whether the user is logged in by verifying the admin bar is visible
     */
    isLoggedIn(): Promise<boolean>;
}
//# sourceMappingURL=LoginPage.d.ts.map