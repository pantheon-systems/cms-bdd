import { Locator, Page } from '@playwright/test';
/**
 * Locate a form field by its accessible label, falling back to its `name` attribute.
 * Some CMS admin screens render controls without an associated label (for example
 * selects built through a filter), which `getByLabel` cannot reach.
 */
export declare function fieldLocator(page: Page, field: string): Locator;
/**
 * Fill a text-like field, or choose the matching option when the field is a `<select>`
 * (`fill()` rejects selects).
 */
export declare function fillField(locator: Locator, value: string): Promise<void>;
//# sourceMappingURL=field-locator.d.ts.map