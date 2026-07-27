import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../config/constants';

export class ElasticPressFeatures {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageHeading() {
    return this.page.locator('h2:text-is("Features")');
  }

  get saveChangesButton() {
    return this.page.locator('button:text-is("Save changes")');
  }

  categoryLink(name: string) {
    return this.page
      .locator(`.ep-feature-nav a:text-is("${name}"), nav a:text-is("${name}")`)
      .first();
  }

  featureTab(name: string) {
    return this.page.locator(`a:text-is("${name}"), button:text-is("${name}")`).first();
  }

  get featureTitle() {
    return this.page.locator('.ep-feature-title, h3').first();
  }

  get enableToggle() {
    return this.page
      .locator('button[role="switch"], .components-form-toggle, input[type="checkbox"]')
      .first();
  }

  async isFeaturesPageLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: TIMEOUTS.NAVIGATION });
      return true;
    } catch {
      return false;
    }
  }

  async navigateToCategory(category: string): Promise<void> {
    await this.categoryLink(category).click();
    await this.page.waitForLoadState('load', { timeout: TIMEOUTS.LOAD_STATE });
  }

  async navigateToFeature(category: string, feature: string): Promise<void> {
    await this.categoryLink(category).click();
    await this.featureTab(feature).waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    await this.featureTab(feature).click();
  }

  async isFeatureEnabled(): Promise<boolean> {
    const toggle = this.enableToggle;
    await toggle.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
    const isChecked = await toggle.isChecked().catch(() => false);
    if (isChecked) return true;
    const ariaChecked = await toggle.getAttribute('aria-checked');
    if (ariaChecked === 'true') return true;
    const classes = (await toggle.getAttribute('class')) || '';
    return classes.includes('is-checked') || classes.includes('active');
  }

  async enableFeature(): Promise<void> {
    if (!(await this.isFeatureEnabled())) {
      await this.enableToggle.click();
      await this.saveChangesButton.click();
      await this.page.waitForLoadState('load', { timeout: TIMEOUTS.LOAD_STATE });
    }
  }
}
