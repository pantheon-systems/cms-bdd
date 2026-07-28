import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

/**
 * Drupal login form component
 * The standard login form at /user/login
 */
export class LoginForm {
  readonly page: Page;

  constructor(page: Page) {
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

  async isFormVisible(): Promise<boolean> {
    try {
      await this.form.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
