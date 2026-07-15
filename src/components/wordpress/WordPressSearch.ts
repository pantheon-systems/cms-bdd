import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class WordPressSearch {
  readonly page: Page;
  private readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  get searchInput() {
    return this.page.locator('input[type="search"]').first();
  }

  get searchSubmitButton() {
    return this.page.locator('button:text-is("Search"), input[type="submit"][value="Search"]').first();
  }

  get searchResultsHeading() {
    return this.page.locator('h1').filter({ hasText: 'Search results for' });
  }

  get searchResultItems() {
    return this.page.locator('main article, .search-results article, .hentry');
  }

  async submitSearch(term: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}/?s=${encodeURIComponent(term)}`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
  }

  async submitSearchViaForm(term: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}/?s=`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
    await this.searchInput.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    await this.searchInput.clear();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async typeSearchField(term: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    await this.searchInput.clear();
    await this.searchInput.pressSequentially(term, { delay: 100 });
  }

  async hasResults(): Promise<boolean> {
    try {
      await this.searchResultItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async getResultCount(): Promise<number> {
    await this.searchResultItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
    return await this.searchResultItems.count();
  }

  async hasResultsHeading(): Promise<boolean> {
    try {
      await this.searchResultsHeading.waitFor({
        state: 'visible',
        timeout: TIMEOUTS.NAVIGATION,
      });
      return true;
    } catch {
      return false;
    }
  }

  async measureSearchLatency(term: string): Promise<number> {
    const start = Date.now();
    await this.page.goto(`${this.baseUrl}/?s=${encodeURIComponent(term)}`, {
      waitUntil: 'load',
      timeout: TIMEOUTS.NAVIGATION,
    });
    await this.searchResultsHeading.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
    return Date.now() - start;
  }
}
