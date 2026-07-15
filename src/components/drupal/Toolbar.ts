import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

/**
 * Drupal Admin Toolbar component
 * The horizontal toolbar at the top of the Drupal admin UI (#toolbar-administration)
 */
export class Toolbar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** The toolbar container */
  get toolbar() {
    return this.page.locator('#toolbar-administration');
  }

  /** The toolbar menu bar (Manage, Shortcuts, admin account) */
  get toolbarBar() {
    return this.page.locator('#toolbar-bar');
  }

  /** Home icon / back to site button */
  get homeBtn() {
    return this.page.locator('#toolbar-bar a.toolbar-icon-home');
  }

  /** "Manage" menu link */
  get manageLink() {
    return this.page.locator('#toolbar-bar a.toolbar-icon-menu');
  }

  /** Admin tray (expandable menu area below the toolbar bar) */
  get adminTray() {
    return this.page.locator('#toolbar-item-administration-tray');
  }

  /**
   * Get a top-level admin menu item by label
   * @param label - Menu item text (e.g., "Content", "Structure", "Configuration")
   */
  getMenuItem(label: string) {
    return this.page.locator(`#toolbar-item-administration-tray a:text-is("${label}")`);
  }

  /**
   * Verify the Drupal admin toolbar is fully loaded
   * @returns true if toolbar elements are visible
   */
  async isToolbarVisible(): Promise<boolean> {
    try {
      await this.toolbarBar.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
