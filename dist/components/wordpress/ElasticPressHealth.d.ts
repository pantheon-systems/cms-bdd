import { Page } from '@playwright/test';
export declare class ElasticPressHealth {
    readonly page: Page;
    constructor(page: Page);
    get pageHeading(): import("playwright-core").Locator;
    get indexListSection(): import("playwright-core").Locator;
    get statusCircle(): import("playwright-core").Locator;
    isHealthPageLoaded(): Promise<boolean>;
    getFirstIndexHealth(): Promise<string>;
    hasIndices(): Promise<boolean>;
}
//# sourceMappingURL=ElasticPressHealth.d.ts.map