"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldLocator = fieldLocator;
exports.fillField = fillField;
/**
 * Locate a form field by its accessible label, falling back to its `name` attribute.
 * Some CMS admin screens render controls without an associated label (for example
 * selects built through a filter), which `getByLabel` cannot reach.
 */
function fieldLocator(page, field) {
    const name = field.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return page.getByLabel(field).or(page.locator(`[name="${name}"]`));
}
/**
 * Fill a text-like field, or choose the matching option when the field is a `<select>`
 * (`fill()` rejects selects).
 */
async function fillField(locator, value) {
    const tag = await locator.evaluate((el) => el.tagName.toLowerCase());
    if (tag === 'select') {
        await locator.selectOption(value);
    }
    else {
        await locator.fill(value);
    }
}
//# sourceMappingURL=field-locator.js.map