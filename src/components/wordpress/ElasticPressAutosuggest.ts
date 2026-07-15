import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressAutosuggest {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get container() {
    return this.page.locator('div.ep-autosuggest');
  }

  get suggestionsList() {
    return this.page.locator('ul.autosuggest-list[role="listbox"]');
  }

  get suggestionItems() {
    return this.suggestionsList.locator('li');
  }

  async waitForSuggestions(): Promise<boolean> {
    try {
      await this.suggestionItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }

  async getSuggestionTexts(): Promise<string[]> {
    await this.suggestionItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    return await this.suggestionItems.allInnerTexts();
  }

  async hasSuggestion(text: string): Promise<boolean> {
    const suggestions = await this.getSuggestionTexts();
    return suggestions.some(s => s.trim().toLowerCase().includes(text.toLowerCase()));
  }

  async clickSuggestion(text: string): Promise<void> {
    await this.suggestionsList.locator('li', { hasText: text }).click();
  }
}
