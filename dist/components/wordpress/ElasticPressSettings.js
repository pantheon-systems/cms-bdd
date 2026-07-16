"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressSettings = void 0;
const constants_1 = require("../../config/constants");
class ElasticPressSettings {
    page;
    constructor(page) {
        this.page = page;
    }
    get pageHeading() {
        return this.page.locator('h2:text-is("Settings")');
    }
    get hostUrlInput() {
        return this.page.locator('#ep_host');
    }
    get hostUrlHelperText() {
        return this.page.locator('text=Host already defined in wp-config.php');
    }
    get subscriptionIdInput() {
        return this.page.locator('input[name="ep_subscription_id"]');
    }
    get subscriptionTokenInput() {
        return this.page.locator('input[name="ep_token"]');
    }
    get elasticsearchVersionText() {
        return this.page.locator('td:has-text("ElasticPress.io Managed Platform")');
    }
    get saveChangesButton() {
        return this.page.locator('input[type="submit"][value="Save Changes"], button:text-is("Save Changes")');
    }
    async isSettingsPageLoaded() {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async getHostUrl() {
        await this.hostUrlInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        return (await this.hostUrlInput.inputValue()).trim();
    }
    async isHostUrlPopulated() {
        const hostUrl = await this.getHostUrl();
        return hostUrl.length > 0;
    }
    async isHostUrlUsingProxy() {
        const hostUrl = await this.getHostUrl();
        return hostUrl.includes('mtlsproxyhost');
    }
    async isHostDefinedInConfig() {
        try {
            await this.hostUrlHelperText.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    async getSubscriptionId() {
        await this.subscriptionIdInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        return (await this.subscriptionIdInput.inputValue()).trim();
    }
    async getSubscriptionToken() {
        await this.subscriptionTokenInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        return (await this.subscriptionTokenInput.inputValue()).trim();
    }
}
exports.ElasticPressSettings = ElasticPressSettings;
//# sourceMappingURL=ElasticPressSettings.js.map