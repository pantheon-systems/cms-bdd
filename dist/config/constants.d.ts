/**
 * Framework constants - centralized immutable defaults
 * Can be overridden at runtime via environment variables
 */
/**
 * Timeout configuration for Playwright operations
 * All values in milliseconds
 *
 * Override via environment variables:
 * - TIMEOUT_ELEMENT_VISIBLE
 * - TIMEOUT_ELEMENT_OPTIONAL
 * - TIMEOUT_NAVIGATION
 * - TIMEOUT_LOAD_STATE
 * - TIMEOUT_API
 */
export declare const TIMEOUTS: {
    /**
     * Default timeout for element visibility checks (waitFor visible)
     * Used by: page objects, components for important elements
     * @default 10000 (10 seconds)
     */
    readonly ELEMENT_VISIBLE: number;
    /**
     * Timeout for optional/less critical elements
     * Used by: dialogs, banners, promotional content
     * @default 5000 (5 seconds)
     */
    readonly ELEMENT_OPTIONAL: number;
    /**
     * Timeout for navigation operations (page loads)
     * Used by: goto, navigation steps
     * @default 30000 (30 seconds)
     */
    readonly NAVIGATION: number;
    /**
     * Timeout for page load state waits
     * Used by: waitForLoadState
     * @default 15000 (15 seconds)
     */
    readonly LOAD_STATE: number;
    /**
     * Timeout for API/backend calls
     * Used by: API clients, GraphQL, CLI commands
     * @default 60000 (60 seconds)
     */
    readonly API: number;
};
//# sourceMappingURL=constants.d.ts.map