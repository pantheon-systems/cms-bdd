import { Page } from '@playwright/test';

/**
 * BasePage provides the base structure for all page objects.
 * It exposes the Playwright Page instance, allowing page objects to use
 * the readonly locator pattern: `readonly loginBtn = this.page.locator(...)`
 *
 * Page objects should call Playwright methods directly rather than through wrappers.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
