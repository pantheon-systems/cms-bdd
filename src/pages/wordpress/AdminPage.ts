import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { AdminBar } from '../../components/wordpress/AdminBar';
import { AdminMenu } from '../../components/wordpress/AdminMenu';

/**
 * WordPress Admin Page
 * Represents the WordPress admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
export class AdminPage extends BasePage {
  readonly adminBar: AdminBar;
  readonly adminMenu: AdminMenu;

  constructor(page: Page) {
    super(page);
    this.adminBar = new AdminBar(page);
    this.adminMenu = new AdminMenu(page);
  }

  /** The main content wrap area */
  get contentWrap() {
    return this.page.locator('#wpbody-content');
  }

  /** The page heading in the content area */
  get pageTitle() {
    return this.page.locator('#wpbody-content h1');
  }

  /**
   * Verify the WordPress admin UI is fully loaded
   * Checks that the admin bar, admin menu, and content area are visible
   * @returns true if the admin page is loaded
   */
  async isAdminLoaded(): Promise<boolean> {
    try {
      const [barVisible, menuVisible] = await Promise.all([
        this.adminBar.isAdminBarVisible(),
        this.adminMenu.isMenuVisible(),
      ]);
      await this.contentWrap.waitFor({ state: 'visible', timeout: 10000 });
      return barVisible && menuVisible;
    } catch {
      return false;
    }
  }
}
