import { Page } from '@playwright/test';
/**
 * Search API Add/Edit Server form
 * Route: /admin/config/search/search-api/add-server
 */
export declare class ServerForm {
    readonly page: Page;
    constructor(page: Page);
    get nameInput(): import("playwright-core").Locator;
    get backendGroup(): import("playwright-core").Locator;
    get saveButton(): import("playwright-core").Locator;
    /**
     * The Solr Connector radio group appears after choosing the Solr backend.
     * Drupal dynamically loads backend-specific settings via AJAX.
     */
    get connectorGroup(): import("playwright-core").Locator;
    /**
     * Connection details area — auto-populated when a managed connector is selected
     */
    get connectionDetails(): import("playwright-core").Locator;
    get statusMessage(): import("playwright-core").Locator;
    isFormVisible(): Promise<boolean>;
    /**
     * Fill and save the Add Server form
     * @param name - Server name (e.g. "My Solr Server")
     * @param backend - Backend value to select (e.g. "search_api_solr")
     * @param connector - Connector plugin value (e.g. "solr_connector_standard")
     */
    /**
     * Select a backend by clicking its radio button
     */
    selectBackend(value: string): Promise<void>;
    /**
     * Select a connector — may be a select dropdown or radio buttons depending on the backend
     */
    /**
     * Select a connector by its visible label text (e.g. "Standard")
     */
    selectConnector(label: string): Promise<void>;
    /**
     * Fill the server form without saving — allows verification before submit
     */
    fill(name: string, backend: string, connector: string): Promise<void>;
    save(): Promise<void>;
}
//# sourceMappingURL=ServerForm.d.ts.map