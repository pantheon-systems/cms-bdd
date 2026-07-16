import { Page } from '@playwright/test';
export declare class ElasticPressAutosuggest {
    readonly page: Page;
    constructor(page: Page);
    get container(): import("playwright-core").Locator;
    get suggestionsList(): import("playwright-core").Locator;
    get suggestionItems(): import("playwright-core").Locator;
    waitForSuggestions(): Promise<boolean>;
    getSuggestionTexts(): Promise<string[]>;
    hasSuggestion(text: string): Promise<boolean>;
    clickSuggestion(text: string): Promise<void>;
}
//# sourceMappingURL=ElasticPressAutosuggest.d.ts.map