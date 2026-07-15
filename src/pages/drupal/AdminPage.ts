import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Toolbar } from '../../components/drupal/Toolbar';

/**
 * Drupal Admin Page
 * Represents the Drupal admin interface opened directly via its admin URL.
 * Operates on a separate browser tab from the dashboard.
 */
export class AdminPage extends BasePage {
  readonly toolbar: Toolbar;

  constructor(page: Page) {
    super(page);
    this.toolbar = new Toolbar(page);
  }

  /** The page title element in the admin content area */
  get pageTitle() {
    return this.page.locator('h1.page-title');
  }

  /** The main admin content area */
  get contentArea() {
    return this.page.locator('main, #content, .layout-content');
  }

  /**
   * Verify the Drupal admin UI is fully loaded
   * Checks that the admin toolbar and content area are visible
   * @returns true if the admin page is loaded
   */
  async isAdminLoaded(): Promise<boolean> {
    try {
      const toolbarVisible = await this.toolbar.isToolbarVisible();
      await this.contentArea.waitFor({ state: 'visible', timeout: 10000 });
      return toolbarVisible;
    } catch {
      return false;
    }
  }
}
