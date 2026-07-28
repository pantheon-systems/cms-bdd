import { Page } from '@playwright/test';
export declare class ElasticPressInstantResults {
    readonly page: Page;
    constructor(page: Page);
    get modal(): import("playwright-core").Locator;
    get closeButton(): import("playwright-core").Locator;
    get resultsContainer(): import("playwright-core").Locator;
    get resultsTitle(): import("playwright-core").Locator;
    get sidebar(): import("playwright-core").Locator;
    get resultItems(): import("playwright-core").Locator;
    isModalVisible(): Promise<boolean>;
    hasResults(): Promise<boolean>;
    hasFilters(): Promise<boolean>;
    closeModal(): Promise<void>;
}
//# sourceMappingURL=ElasticPressInstantResults.d.ts.map