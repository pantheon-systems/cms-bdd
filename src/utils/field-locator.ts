import { Locator, Page } from '@playwright/test';

/**
 * Locate a form field by its accessible label, falling back to its `name` attribute.
 * Some CMS admin screens render controls without an associated label (for example
 * selects built through a filter), which `getByLabel` cannot reach.
 */
export function fieldLocator(page: Page, field: string): Locator {
  const name = field.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return page.getByLabel(field).or(page.locator(`[name="${name}"]`));
}

/**
 * Fill a text-like field, or choose the matching option when the field is a `<select>`
 * (`fill()` rejects selects).
 */
export async function fillField(locator: Locator, value: string): Promise<void> {
  const tag = await locator.evaluate((el) => el.tagName.toLowerCase());
  if (tag === 'select') {
    await locator.selectOption(value);
  } else {
    await locator.fill(value);
  }
}
