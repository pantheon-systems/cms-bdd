import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressInstantResults {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get modal() {
    return this.page.locator('div.ep-search-modal[role="dialog"]');
  }

  get closeButton() {
    return this.page.locator('button.ep-search-modal__close');
  }

  get resultsContainer() {
    return this.page.locator('.ep-search-results');
  }

  get resultsTitle() {
    return this.page.locator('.ep-search-results__title');
  }

  get sidebar() {
    return this.page.locator('.ep-search-sidebar');
  }

  get resultItems() {
    return this.resultsContainer.locator('article, [class*="result"]');
  }

  async isModalVisible(): Promise<boolean> {
    try {
      await this.modal.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async hasResults(): Promise<boolean> {
    try {
      await this.resultsTitle.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      const text = await this.resultsTitle.innerText();
      return !text.toLowerCase().includes('no results');
    } catch {
      return false;
    }
  }

  async hasFilters(): Promise<boolean> {
    try {
      await this.sidebar.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }
}
