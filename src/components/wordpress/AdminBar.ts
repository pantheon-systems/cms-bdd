import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

/**
 * WordPress Admin Bar component
 * The horizontal bar at the top of the WordPress admin UI (#wpadminbar)
 */
export class AdminBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** The admin bar container */
  get adminBar() {
    return this.page.locator('#wpadminbar');
  }

  /** Site name link in the admin bar */
  get siteName() {
    return this.page.locator('#wp-admin-bar-site-name a.ab-item');
  }

  /** "Howdy, <username>" greeting / user account menu */
  get userGreeting() {
    return this.page.locator('#wp-admin-bar-my-account a.ab-item');
  }

  /** New content dropdown (+ New) */
  get newContentBtn() {
    return this.page.locator('#wp-admin-bar-new-content a.ab-item');
  }

  /**
   * Verify the WordPress admin bar is visible
   * @returns true if admin bar is visible
   */
  async isAdminBarVisible(): Promise<boolean> {
    try {
      await this.adminBar.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
