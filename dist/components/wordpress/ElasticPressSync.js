"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressSync = void 0;
const constants_1 = require("../../config/constants");
const SYNC_TIMEOUT = 300000;
class ElasticPressSync {
    page;
    constructor(page) {
        this.page = page;
    }
    get pageHeading() {
        return this.page.locator('h2:text-is("Sync Settings")');
    }
    get startSyncButton() {
        return this.page.locator('button:text-is("Start sync")');
    }
    get syncCompleteText() {
        return this.page.locator('strong:text-is("Sync complete")');
    }
    get progressBar() {
        return this.page.locator('.ep-sync-progress-bar, progress');
    }
    get deleteAndResyncCheckbox() {
        return this.page
            .locator('label:has-text("Delete all data and start fresh sync"), input[type="checkbox"]')
            .first();
    }
    get syncHistorySection() {
        return this.page.locator('text=Sync history');
    }
    get latestSyncEntry() {
        return this.page.locator('.ep-sync-history li, .ep-sync-history .ep-sync-log-item').first();
    }
    async isSyncPageLoaded() {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.NAVIGATION });
            return true;
        }
        catch {
            return false;
        }
    }
    async isSyncComplete() {
        try {
            await this.syncCompleteText.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    async runSync() {
        await this.startSyncButton.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        await this.startSyncButton.click();
        await this.syncCompleteText.waitFor({ state: 'visible', timeout: SYNC_TIMEOUT });
    }
    async hasSyncHistory() {
        try {
            await this.syncHistorySection.waitFor({
                state: 'visible',
                timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE,
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async getLatestSyncStatus() {
        await this.latestSyncEntry.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
        return (await this.latestSyncEntry.innerText()).trim();
    }
}
exports.ElasticPressSync = ElasticPressSync;
//# sourceMappingURL=ElasticPressSync.js.map