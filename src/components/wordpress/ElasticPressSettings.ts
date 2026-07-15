import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressSettings {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageHeading() {
    return this.page.locator('h2:text-is("Settings")');
  }

  get hostUrlInput() {
    return this.page.locator('#ep_host');
  }

  get hostUrlHelperText() {
    return this.page.locator('text=Host already defined in wp-config.php');
  }

  get subscriptionIdInput() {
    return this.page.locator('input[name="ep_subscription_id"]');
  }

  get subscriptionTokenInput() {
    return this.page.locator('input[name="ep_token"]');
  }

  get elasticsearchVersionText() {
    return this.page.locator('td:has-text("ElasticPress.io Managed Platform")');
  }

  get saveChangesButton() {
    return this.page.locator('input[type="submit"][value="Save Changes"], button:text-is("Save Changes")');
  }

  async isSettingsPageLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async getHostUrl(): Promise<string> {
    await this.hostUrlInput.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    return (await this.hostUrlInput.inputValue()).trim();
  }

  async isHostUrlPopulated(): Promise<boolean> {
    const hostUrl = await this.getHostUrl();
    return hostUrl.length > 0;
  }

  async isHostUrlUsingProxy(): Promise<boolean> {
    const hostUrl = await this.getHostUrl();
    return hostUrl.includes('mtlsproxyhost');
  }

  async isHostDefinedInConfig(): Promise<boolean> {
    try {
      await this.hostUrlHelperText.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }

  async getSubscriptionId(): Promise<string> {
    await this.subscriptionIdInput.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    return (await this.subscriptionIdInput.inputValue()).trim();
  }

  async getSubscriptionToken(): Promise<string> {
    await this.subscriptionTokenInput.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    return (await this.subscriptionTokenInput.inputValue()).trim();
  }
}
