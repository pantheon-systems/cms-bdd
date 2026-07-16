"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressFeatures = void 0;
const constants_1 = require("../../config/constants");
class ElasticPressFeatures {
    page;
    constructor(page) {
        this.page = page;
    }
    get pageHeading() {
        return this.page.locator('h2:text-is("Features")');
    }
    get saveChangesButton() {
        return this.page.locator('button:text-is("Save changes")');
    }
    categoryLink(name) {
        return this.page.locator(`.ep-feature-nav a:text-is("${name}"), nav a:text-is("${name}")`).first();
    }
    featureTab(name) {
        return this.page.locator(`a:text-is("${name}"), button:text-is("${name}")`).first();
    }
    get featureTitle() {
        return this.page.locator('.ep-feature-title, h3').first();
    }
    get enableToggle() {
        return this.page.locator('button[role="switch"], .components-form-toggle, input[type="checkbox"]').first();
    }
    async isFeaturesPageLoaded() {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async navigateToCategory(category) {
        await this.categoryLink(category).click();
        await this.page.waitForLoadState('load', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    async navigateToFeature(category, feature) {
        await this.categoryLink(category).click();
        await this.featureTab(feature).waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        await this.featureTab(feature).click();
    }
    async isFeatureEnabled() {
        const toggle = this.enableToggle;
        await toggle.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        const isChecked = await toggle.isChecked().catch(() => false);
        if (isChecked)
            return true;
        const ariaChecked = await toggle.getAttribute('aria-checked');
        if (ariaChecked === 'true')
            return true;
        const classes = await toggle.getAttribute('class') || '';
        return classes.includes('is-checked') || classes.includes('active');
    }
    async enableFeature() {
        if (!(await this.isFeatureEnabled())) {
            await this.enableToggle.click();
            await this.saveChangesButton.click();
            await this.page.waitForLoadState('load', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
        }
    }
}
exports.ElasticPressFeatures = ElasticPressFeatures;
//# sourceMappingURL=ElasticPressFeatures.js.map