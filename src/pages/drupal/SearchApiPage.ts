import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Toolbar } from '../../components/drupal/Toolbar';
import { ServerForm } from '../../components/drupal/searchapi/ServerForm';
import { ServerStatus } from '../../components/drupal/searchapi/ServerStatus';
import { IndexForm } from '../../components/drupal/searchapi/IndexForm';
import { IndexFieldsForm } from '../../components/drupal/searchapi/IndexFieldsForm';
import { IndexOverview } from '../../components/drupal/searchapi/IndexOverview';
import { TIMEOUTS } from '../../config/constants';

/**
 * Drupal Search API configuration page
 * Route: /admin/config/search/search-api
 */
export class SearchApiPage extends BasePage {
  readonly toolbar: Toolbar;
  readonly serverForm: ServerForm;
  readonly serverStatus: ServerStatus;
  readonly indexForm: IndexForm;
  readonly indexFieldsForm: IndexFieldsForm;
  readonly indexOverview: IndexOverview;

  constructor(page: Page) {
    super(page);
    this.toolbar = new Toolbar(page);
    this.serverForm = new ServerForm(page);
    this.serverStatus = new ServerStatus(page);
    this.indexForm = new IndexForm(page);
    this.indexFieldsForm = new IndexFieldsForm(page);
    this.indexOverview = new IndexOverview(page);
  }

  /**
   * Navigate to the Search API overview page
   */
  async navigateTo(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Navigate to the Add Server form
   */
  async navigateToAddServer(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api/add-server`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Navigate to the Add Index form
   */
  async navigateToAddIndex(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api/add-index`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Navigate to a server's status page by its machine name
   */
  async navigateToServer(baseUrl: string, serverId: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api/server/${serverId}`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Navigate to an index's overview page by its machine name
   */
  async navigateToIndex(baseUrl: string, indexId: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api/index/${indexId}`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Navigate to an index's fields page
   */
  async navigateToIndexFields(baseUrl: string, indexId: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/config/search/search-api/index/${indexId}/fields`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  /**
   * Click "Add server" link on the overview page
   */
  async clickAddServer(): Promise<void> {
    await this.page.locator('a:has-text("Add server")').click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });
  }

  /**
   * Click "Add index" link on the overview page
   */
  async clickAddIndex(): Promise<void> {
    await this.page.locator('a:has-text("Add index")').click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });
  }

  /**
   * Navigate to the Extend (modules) page
   */
  async navigateToExtend(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/admin/modules`, {
      waitUntil: 'networkidle',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }
}
