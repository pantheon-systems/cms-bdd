import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginForm } from '../../components/wordpress/LoginForm';
import { AdminBar } from '../../components/wordpress/AdminBar';
import { ENV } from '../../config/environment';
import { TIMEOUTS } from '../../config/constants';

/**
 * WordPress Login Page
 * Handles direct login via the WordPress /wp-login.php form.
 */
export class LoginPage extends BasePage {
  readonly loginForm: LoginForm;
  readonly adminBar: AdminBar;

  constructor(page: Page) {
    super(page);
    this.loginForm = new LoginForm(page);
    this.adminBar = new AdminBar(page);
  }

  /**
   * Log in to a WordPress site via /wp-login.php
   * @param username - Defaults to ENV.WP_USER
   * @param password - Defaults to ENV.WP_PASSWORD
   * @param url - Base URL of the WordPress site. Defaults to ENV.WP_URL
   */
  async login(username?: string, password?: string, url?: string): Promise<void> {
    const baseUrl = url || ENV.WP_URL;
    const user = username || ENV.WP_USER;
    const pass = password || ENV.WP_PASSWORD;

    if (!baseUrl) throw new Error('WP_URL is not configured');
    if (!user || !pass) throw new Error('WP_USER or WP_PASSWORD is not configured');

    await this.page.goto(`${baseUrl}/wp-login.php`, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUTS.NAVIGATION,
    });

    await this.loginForm.usernameInput.fill(user);
    await this.loginForm.passwordInput.fill(pass);
    await this.loginForm.submitButton.click();

    await this.page.waitForLoadState('load', { timeout: TIMEOUTS.LOAD_STATE });
  }

  /**
   * Check whether the user is logged in by verifying the admin bar is visible
   */
  async isLoggedIn(): Promise<boolean> {
    return this.adminBar.isAdminBarVisible();
  }
}
