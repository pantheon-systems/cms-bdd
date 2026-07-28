import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../../config/constants';

/**
 * Search API Server status/view page
 * Route: /admin/config/search/search-api/server/{id}
 */
export class ServerStatus {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get serverName() {
    return this.page.locator('h1.page-title');
  }

  /**
   * Connection status indicator — Drupal shows "Connected" with a green checkmark
   * or an error indicator when the server is unreachable
   */
  get connectionStatus() {
    return this.page.locator('.search-api-server-summary, .system-status-report');
  }

  get serverReachable() {
    return this.page.getByText('The Solr server could be reached.');
  }

  get coreAccessible() {
    return this.page.getByText('The Solr core could be accessed');
  }

  get statusMessages() {
    return this.page.locator('.messages--status');
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.serverReachable.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
