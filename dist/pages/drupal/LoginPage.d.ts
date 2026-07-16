import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginForm } from '../../components/drupal/LoginForm';
import { Toolbar } from '../../components/drupal/Toolbar';
/**
 * Drupal Login Page
 * Handles direct login via the Drupal /user/login form.
 */
export declare class LoginPage extends BasePage {
    readonly loginForm: LoginForm;
    readonly toolbar: Toolbar;
    constructor(page: Page);
    /**
     * Log in to a Drupal site via /user/login
     * @param username - Defaults to ENV.DRUPAL_USER
     * @param password - Defaults to ENV.DRUPAL_PASSWORD
     * @param url - Base URL of the Drupal site. Defaults to ENV.DRUPAL_URL
     */
    login(username?: string, password?: string, url?: string): Promise<void>;
    /**
     * Check whether the user is logged in by verifying the admin toolbar is visible
     */
    isLoggedIn(): Promise<boolean>;
}
//# sourceMappingURL=LoginPage.d.ts.map