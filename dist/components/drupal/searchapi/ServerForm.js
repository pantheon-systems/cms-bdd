"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerForm = void 0;
const constants_1 = require("../../../config/constants");
/**
 * Search API Add/Edit Server form
 * Route: /admin/config/search/search-api/add-server
 */
class ServerForm {
    page;
    constructor(page) {
        this.page = page;
    }
    get nameInput() {
        return this.page.locator('#edit-name');
    }
    get backendGroup() {
        return this.page.locator('#edit-backend');
    }
    get saveButton() {
        return this.page.locator('#edit-submit');
    }
    /**
     * The Solr Connector radio group appears after choosing the Solr backend.
     * Drupal dynamically loads backend-specific settings via AJAX.
     */
    get connectorGroup() {
        return this.page.locator('#edit-backend-config-connector');
    }
    /**
     * Connection details area — auto-populated when a managed connector is selected
     */
    get connectionDetails() {
        return this.page.locator('.search-api-solr-connection-details, #edit-backend-config-connector-config');
    }
    get statusMessage() {
        return this.page.locator('.messages--status, .messages--warning, .messages--error');
    }
    async isFormVisible() {
        try {
            await this.nameInput.waitFor({ state: 'visible', timeout: constants_1.TIMEOUTS.ELEMENT_VISIBLE });
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Fill and save the Add Server form
     * @param name - Server name (e.g. "My Solr Server")
     * @param backend - Backend value to select (e.g. "search_api_solr")
     * @param connector - Connector plugin value (e.g. "solr_connector_standard")
     */
    /**
     * Select a backend by clicking its radio button
     */
    async selectBackend(value) {
        await this.backendGroup.locator(`input[type="radio"][value="${value}"]`).check();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    /**
     * Select a connector — may be a select dropdown or radio buttons depending on the backend
     */
    /**
     * Select a connector by its visible label text (e.g. "Standard")
     */
    async selectConnector(label) {
        await this.page.getByRole('radio', { name: label }).check();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.LOAD_STATE });
    }
    /**
     * Fill the server form without saving — allows verification before submit
     */
    async fill(name, backend, connector) {
        await this.nameInput.fill(name);
        await this.selectBackend(backend);
        await this.selectConnector(connector);
    }
    async save() {
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
}
exports.ServerForm = ServerForm;
//# sourceMappingURL=ServerForm.js.map