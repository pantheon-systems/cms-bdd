import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

/**
 * WordPress login form component
 * The standard login form at /wp-login.php
 */
export class LoginForm {
  readonly page: Page;

  constructor(page: Page) {
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

  async isFormVisible(): Promise<boolean> {
    try {
      await this.form.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
