import { Page } from '@playwright/test';
export declare class ElasticPressSync {
    readonly page: Page;
    constructor(page: Page);
    get pageHeading(): import("playwright-core").Locator;
    get startSyncButton(): import("playwright-core").Locator;
    get syncCompleteText(): import("playwright-core").Locator;
    get progressBar(): import("playwright-core").Locator;
    get deleteAndResyncCheckbox(): import("playwright-core").Locator;
    get syncHistorySection(): import("playwright-core").Locator;
    get latestSyncEntry(): import("playwright-core").Locator;
    isSyncPageLoaded(): Promise<boolean>;
    isSyncComplete(): Promise<boolean>;
    runSync(): Promise<void>;
    hasSyncHistory(): Promise<boolean>;
    getLatestSyncStatus(): Promise<string>;
}
//# sourceMappingURL=ElasticPressSync.d.ts.map