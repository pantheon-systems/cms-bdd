import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressHealth {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageHeading() {
    return this.page.locator('h1:text-is("Index Health")');
  }

  get indexListSection() {
    return this.page.locator('text=Index list').locator('..');
  }

  get statusCircle() {
    return this.page.locator('span.status-circle').first();
  }

  async isHealthPageLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async getFirstIndexHealth(): Promise<string> {
    await this.statusCircle.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
    const text = (await this.statusCircle.innerText()).trim().toLowerCase();
    if (text === 'green') return 'Green';
    if (text === 'yellow') return 'Yellow';
    if (text === 'red') return 'Red';
    throw new Error(`Unexpected index health status: "${text}"`);
  }

  async hasIndices(): Promise<boolean> {
    try {
      await this.statusCircle.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }
}
