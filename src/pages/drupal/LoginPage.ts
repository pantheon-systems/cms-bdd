import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LoginForm } from '../../components/drupal/LoginForm';
import { Toolbar } from '../../components/drupal/Toolbar';
import { ENV } from '../../config/environment';
import { TIMEOUTS } from '../../config/constants';

/**
 * Drupal Login Page
 * Handles direct login via the Drupal /user/login form.
 */
export class LoginPage extends BasePage {
  readonly loginForm: LoginForm;
  readonly toolbar: Toolbar;

  constructor(page: Page) {
    super(page);
    this.loginForm = new LoginForm(page);
    this.toolbar = new Toolbar(page);
  }

  /**
   * Log in to a Drupal site via /user/login
   * @param username - Defaults to ENV.DRUPAL_USER
   * @param password - Defaults to ENV.DRUPAL_PASSWORD
   * @param url - Base URL of the Drupal site. Defaults to ENV.DRUPAL_URL
   */
  async login(username?: string, password?: string, url?: string): Promise<void> {
    const baseUrl = url || ENV.DRUPAL_URL;
    const user = username || ENV.DRUPAL_USER;
    const pass = password || ENV.DRUPAL_PASSWORD;

    if (!baseUrl) throw new Error('DRUPAL_URL is not configured');
    if (!user || !pass) throw new Error('DRUPAL_USER or DRUPAL_PASSWORD is not configured');

    await this.page.goto(`${baseUrl}/user/login`, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUTS.NAVIGATION,
    });

    await this.loginForm.usernameInput.fill(user);
    await this.loginForm.passwordInput.fill(pass);
    await this.loginForm.submitButton.click();

    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.LOAD_STATE });
  }

  /**
   * Check whether the user is logged in by verifying the admin toolbar is visible
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.toolbar.toolbarBar.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
