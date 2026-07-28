import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

/**
 * WordPress Admin Menu component
 * The sidebar menu on the left side of the WordPress admin UI (#adminmenu)
 */
export class AdminMenu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** The admin sidebar menu container */
  get menu() {
    return this.page.locator('#adminmenu');
  }

  /** Dashboard menu item */
  get dashboardLink() {
    return this.page.locator('#menu-dashboard a.menu-top');
  }

  /** Posts menu item */
  get postsLink() {
    return this.page.locator('#menu-posts a.menu-top');
  }

  /** Media menu item */
  get mediaLink() {
    return this.page.locator('#menu-media a.menu-top');
  }

  /** Pages menu item */
  get pagesLink() {
    return this.page.locator('#menu-pages a.menu-top');
  }

  /** Appearance menu item */
  get appearanceLink() {
    return this.page.locator('#menu-appearance a.menu-top');
  }

  /** Plugins menu item */
  get pluginsLink() {
    return this.page.locator('#menu-plugins a.menu-top');
  }

  /** Users menu item */
  get usersLink() {
    return this.page.locator('#menu-users a.menu-top');
  }

  /** Settings menu item */
  get settingsLink() {
    return this.page.locator('#menu-settings a.menu-top');
  }

  /**
   * Get a menu item by its visible text
   * @param label - Menu item text (e.g., "Dashboard", "Posts", "Plugins")
   */
  getMenuItem(label: string) {
    return this.page.locator(`#adminmenu a.menu-top:has(div.wp-menu-name:text-is("${label}"))`);
  }

  /**
   * Verify the WordPress admin menu is visible
   * @returns true if admin menu is visible
   */
  async isMenuVisible(): Promise<boolean> {
    try {
      await this.menu.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
