import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { AdminBar } from '../../components/wordpress/AdminBar';
import { AdminMenu } from '../../components/wordpress/AdminMenu';
import { ElasticPressSettings } from '../../components/wordpress/ElasticPressSettings';
import { ElasticPressSync } from '../../components/wordpress/ElasticPressSync';
import { ElasticPressHealth } from '../../components/wordpress/ElasticPressHealth';
import { ElasticPressFeatures } from '../../components/wordpress/ElasticPressFeatures';
import { WordPressSearch } from '../../components/wordpress/WordPressSearch';
import { ElasticPressAutosuggest } from '../../components/wordpress/ElasticPressAutosuggest';
import { ElasticPressInstantResults } from '../../components/wordpress/ElasticPressInstantResults';
import { ENV } from '../../config/environment';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressPage extends BasePage {
  readonly adminBar: AdminBar;
  readonly adminMenu: AdminMenu;
  readonly settings: ElasticPressSettings;
  readonly sync: ElasticPressSync;
  readonly health: ElasticPressHealth;
  readonly features: ElasticPressFeatures;
  readonly search: WordPressSearch;
  readonly autosuggest: ElasticPressAutosuggest;
  readonly instantResults: ElasticPressInstantResults;

  constructor(page: Page) {
    super(page);
    this.adminBar = new AdminBar(page);
    this.adminMenu = new AdminMenu(page);
    this.settings = new ElasticPressSettings(page);
    this.sync = new ElasticPressSync(page);
    this.health = new ElasticPressHealth(page);
    this.features = new ElasticPressFeatures(page);
    this.search = new WordPressSearch(page, this.wpUrl);
    this.autosuggest = new ElasticPressAutosuggest(page);
    this.instantResults = new ElasticPressInstantResults(page);
  }

  private get wpUrl(): string {
    const url = ENV.WP_URL;
    if (!url) throw new Error('WP_URL is not configured');
    return url;
  }

  async gotoSettings(): Promise<void> {
    await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-settings`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  async gotoSync(): Promise<void> {
    await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-sync`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  async gotoHealth(): Promise<void> {
    await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-health`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  async gotoFeatures(): Promise<void> {
    await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress#/search`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  async gotoFrontend(): Promise<void> {
    await this.page.goto(this.wpUrl, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }
}
