import { Page } from '@playwright/test';
export declare class ElasticPressFeatures {
    readonly page: Page;
    constructor(page: Page);
    get pageHeading(): import("playwright-core").Locator;
    get saveChangesButton(): import("playwright-core").Locator;
    categoryLink(name: string): import("playwright-core").Locator;
    featureTab(name: string): import("playwright-core").Locator;
    get featureTitle(): import("playwright-core").Locator;
    get enableToggle(): import("playwright-core").Locator;
    isFeaturesPageLoaded(): Promise<boolean>;
    navigateToCategory(category: string): Promise<void>;
    navigateToFeature(category: string, feature: string): Promise<void>;
    isFeatureEnabled(): Promise<boolean>;
    enableFeature(): Promise<void>;
}
//# sourceMappingURL=ElasticPressFeatures.d.ts.map