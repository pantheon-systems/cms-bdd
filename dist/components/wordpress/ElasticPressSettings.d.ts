import { Page } from '@playwright/test';
export declare class ElasticPressSettings {
    readonly page: Page;
    constructor(page: Page);
    get pageHeading(): import("playwright-core").Locator;
    get hostUrlInput(): import("playwright-core").Locator;
    get hostUrlHelperText(): import("playwright-core").Locator;
    get subscriptionIdInput(): import("playwright-core").Locator;
    get subscriptionTokenInput(): import("playwright-core").Locator;
    get elasticsearchVersionText(): import("playwright-core").Locator;
    get saveChangesButton(): import("playwright-core").Locator;
    isSettingsPageLoaded(): Promise<boolean>;
    getHostUrl(): Promise<string>;
    isHostUrlPopulated(): Promise<boolean>;
    isHostUrlUsingProxy(): Promise<boolean>;
    isHostDefinedInConfig(): Promise<boolean>;
    getSubscriptionId(): Promise<string>;
    getSubscriptionToken(): Promise<string>;
}
//# sourceMappingURL=ElasticPressSettings.d.ts.map