import { Page } from '@playwright/test';
/**
 * Search API Index overview/status page
 * Route: /admin/config/search/search-api/index/{id}
 */
export declare class IndexOverview {
    readonly page: Page;
    constructor(page: Page);
    get indexNowButton(): import("playwright-core").Locator;
    get indexStatus(): import("playwright-core").Locator;
    get statusMessage(): import("playwright-core").Locator;
    get pageTitle(): import("playwright-core").Locator;
    /**
     * Get the text showing indexing progress (e.g. "100% indexed" or "X/Y items indexed")
     */
    get indexingProgress(): import("playwright-core").Locator;
    clickIndexNow(): Promise<void>;
    /**
     * Check if the index is fully indexed by looking for status text
     */
    isFullyIndexed(): Promise<boolean>;
}
//# sourceMappingURL=IndexOverview.d.ts.map