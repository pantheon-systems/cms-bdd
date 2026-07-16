import { Page } from '@playwright/test';
/**
 * Search API Server status/view page
 * Route: /admin/config/search/search-api/server/{id}
 */
export declare class ServerStatus {
    readonly page: Page;
    constructor(page: Page);
    get serverName(): import("playwright-core").Locator;
    /**
     * Connection status indicator — Drupal shows "Connected" with a green checkmark
     * or an error indicator when the server is unreachable
     */
    get connectionStatus(): import("playwright-core").Locator;
    get serverReachable(): import("playwright-core").Locator;
    get coreAccessible(): import("playwright-core").Locator;
    get statusMessages(): import("playwright-core").Locator;
    isConnected(): Promise<boolean>;
}
//# sourceMappingURL=ServerStatus.d.ts.map