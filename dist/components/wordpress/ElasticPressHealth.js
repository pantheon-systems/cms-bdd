"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressHealth = void 0;
const constants_1 = require("../../config/constants");
class ElasticPressHealth {
    page;
    constructor(page) {
        this.page = page;
    }
    get pageHeading() {
        return this.page.locator('h1:text-is("Index Health")');
    }
    get indexListSection() {
        return this.page.locator('text=Index list').locator('..');
    }
    get statusCircle() {
        return this.page.locator('span.status-circle').first();
    }
    async isHealthPageLoaded() {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async getFirstIndexHealth() {
        await this.statusCircle.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
        const text = (await this.statusCircle.innerText()).trim().toLowerCase();
        if (text === 'green')
            return 'Green';
        if (text === 'yellow')
            return 'Yellow';
        if (text === 'red')
            return 'Red';
        throw new Error(`Unexpected index health status: "${text}"`);
    }
    async hasIndices() {
        try {
            await this.statusCircle.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.ElasticPressHealth = ElasticPressHealth;
//# sourceMappingURL=ElasticPressHealth.js.map