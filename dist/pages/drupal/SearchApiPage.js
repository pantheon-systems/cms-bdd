"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchApiPage = void 0;
const BasePage_1 = require("../BasePage");
const Toolbar_1 = require("../../components/drupal/Toolbar");
const ServerForm_1 = require("../../components/drupal/searchapi/ServerForm");
const ServerStatus_1 = require("../../components/drupal/searchapi/ServerStatus");
const IndexForm_1 = require("../../components/drupal/searchapi/IndexForm");
const IndexFieldsForm_1 = require("../../components/drupal/searchapi/IndexFieldsForm");
const IndexOverview_1 = require("../../components/drupal/searchapi/IndexOverview");
const constants_1 = require("../../config/constants");
/**
 * Drupal Search API configuration page
 * Route: /admin/config/search/search-api
 */
class SearchApiPage extends BasePage_1.BasePage {
    toolbar;
    serverForm;
    serverStatus;
    indexForm;
    indexFieldsForm;
    indexOverview;
    constructor(page) {
        super(page);
        this.toolbar = new Toolbar_1.Toolbar(page);
        this.serverForm = new ServerForm_1.ServerForm(page);
        this.serverStatus = new ServerStatus_1.ServerStatus(page);
        this.indexForm = new IndexForm_1.IndexForm(page);
        this.indexFieldsForm = new IndexFieldsForm_1.IndexFieldsForm(page);
        this.indexOverview = new IndexOverview_1.IndexOverview(page);
    }
    /**
     * Navigate to the Search API overview page
     */
    async navigateTo(baseUrl) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Navigate to the Add Server form
     */
    async navigateToAddServer(baseUrl) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api/add-server`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Navigate to the Add Index form
     */
    async navigateToAddIndex(baseUrl) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api/add-index`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Navigate to a server's status page by its machine name
     */
    async navigateToServer(baseUrl, serverId) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api/server/${serverId}`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Navigate to an index's overview page by its machine name
     */
    async navigateToIndex(baseUrl, indexId) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api/index/${indexId}`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Navigate to an index's fields page
     */
    async navigateToIndexFields(baseUrl, indexId) {
        await this.page.goto(`${baseUrl}/admin/config/search/search-api/index/${indexId}/fields`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    /**
     * Click "Add server" link on the overview page
     */
    async clickAddServer() {
        await this.page.locator('a:has-text("Add server")').click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
    /**
     * Click "Add index" link on the overview page
     */
    async clickAddIndex() {
        await this.page.locator('a:has-text("Add index")').click();
        await this.page.waitForLoadState('networkidle', { timeout: constants_1.TIMEOUTS.NAVIGATION });
    }
    /**
     * Navigate to the Extend (modules) page
     */
    async navigateToExtend(baseUrl) {
        await this.page.goto(`${baseUrl}/admin/modules`, {
            waitUntil: 'networkidle',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
}
exports.SearchApiPage = SearchApiPage;
//# sourceMappingURL=SearchApiPage.js.map