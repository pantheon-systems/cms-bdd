import { Page } from '@playwright/test';
export declare class WordPressSearch {
    readonly page: Page;
    private readonly baseUrl;
    constructor(page: Page, baseUrl: string);
    get searchInput(): import("playwright-core").Locator;
    get searchSubmitButton(): import("playwright-core").Locator;
    get searchResultsHeading(): import("playwright-core").Locator;
    get searchResultItems(): import("playwright-core").Locator;
    submitSearch(term: string): Promise<void>;
    submitSearchViaForm(term: string): Promise<void>;
    typeSearchField(term: string): Promise<void>;
    hasResults(): Promise<boolean>;
    getResultCount(): Promise<number>;
    hasResultsHeading(): Promise<boolean>;
    measureSearchLatency(term: string): Promise<number>;
}
//# sourceMappingURL=WordPressSearch.d.ts.map