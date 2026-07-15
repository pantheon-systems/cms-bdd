import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

const SYNC_TIMEOUT = 300000;

export class ElasticPressSync {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageHeading() {
    return this.page.locator('h2:text-is("Sync Settings")');
  }

  get startSyncButton() {
    return this.page.locator('button:text-is("Start sync")');
  }

  get syncCompleteText() {
    return this.page.locator('strong:text-is("Sync complete")');
  }

  get progressBar() {
    return this.page.locator('.ep-sync-progress-bar, progress');
  }

  get deleteAndResyncCheckbox() {
    return this.page.locator('label:has-text("Delete all data and start fresh sync"), input[type="checkbox"]').first();
  }

  get syncHistorySection() {
    return this.page.locator('text=Sync history');
  }

  get latestSyncEntry() {
    return this.page.locator('.ep-sync-history li, .ep-sync-history .ep-sync-log-item').first();
  }

  async isSyncPageLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async isSyncComplete(): Promise<boolean> {
    try {
      await this.syncCompleteText.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }

  async runSync(): Promise<void> {
    await this.startSyncButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    await this.startSyncButton.click();
    await this.syncCompleteText.waitFor({ state: 'visible', timeout: SYNC_TIMEOUT });
  }

  async hasSyncHistory(): Promise<boolean> {
    try {
      await this.syncHistorySection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }

  async getLatestSyncStatus(): Promise<string> {
    await this.latestSyncEntry.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    return (await this.latestSyncEntry.innerText()).trim();
  }
}
