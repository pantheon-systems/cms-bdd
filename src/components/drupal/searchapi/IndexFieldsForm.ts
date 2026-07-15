import { Page } from '@playwright/test';
import { TIMEOUTS } from '../../../config/constants';

/**
 * Search API Index Fields management page
 * Route: /admin/config/search/search-api/index/{id}/fields
 */
export class IndexFieldsForm {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get addFieldsButton() {
    return this.page.locator('a:has-text("Add fields"), input[value="Add fields"]');
  }

  get saveButton() {
    return this.page.locator('#edit-submit');
  }

  get fieldsTable() {
    return this.page.locator('table.search-api-index-fields, #search-api-index-fields');
  }

  get statusMessage() {
    return this.page.locator('.messages--status');
  }

  /**
   * Add a field by finding its row in the fields table and clicking "Add"
   * @param fieldName - The field label to add (e.g. "Title", "Body")
   */
  async addField(fieldName: string): Promise<void> {
    const row = this.page.locator('tr').filter({ hasText: fieldName });
    const addButton = row.getByRole('button', { name: 'Add' }).or(row.getByRole('link', { name: 'Add' }));
    await addButton.first().click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.LOAD_STATE });
  }

  async saveChanges(): Promise<void> {
    // After adding fields, navigate back to the Fields tab which has the save button
    const fieldsTab = this.page.getByRole('link', { name: 'Fields' });
    const doneLink = this.page.getByRole('link', { name: 'Done' }).or(this.page.getByRole('link', { name: 'Back to fields' }));

    // Try "Done" or "Back to fields" first, fall back to Fields tab
    if (await doneLink.first().isVisible().catch(() => false)) {
      await doneLink.first().click();
    } else if (await fieldsTab.isVisible().catch(() => false)) {
      await fieldsTab.click();
    }
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });

    // Now click Save changes on the fields management page
    const saveBtn = this.page.getByRole('button', { name: 'Save changes' }).or(this.page.locator('#edit-submit'));
    await saveBtn.first().click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUTS.NAVIGATION });
  }

  async isFormVisible(): Promise<boolean> {
    try {
      await this.addFieldsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_VISIBLE });
      return true;
    } catch {
      return false;
    }
  }
}
