"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticPressPage = void 0;
const BasePage_1 = require("../BasePage");
const AdminBar_1 = require("../../components/wordpress/AdminBar");
const AdminMenu_1 = require("../../components/wordpress/AdminMenu");
const ElasticPressSettings_1 = require("../../components/wordpress/ElasticPressSettings");
const ElasticPressSync_1 = require("../../components/wordpress/ElasticPressSync");
const ElasticPressHealth_1 = require("../../components/wordpress/ElasticPressHealth");
const ElasticPressFeatures_1 = require("../../components/wordpress/ElasticPressFeatures");
const WordPressSearch_1 = require("../../components/wordpress/WordPressSearch");
const ElasticPressAutosuggest_1 = require("../../components/wordpress/ElasticPressAutosuggest");
const ElasticPressInstantResults_1 = require("../../components/wordpress/ElasticPressInstantResults");
const environment_1 = require("../../config/environment");
const constants_1 = require("../../config/constants");
class ElasticPressPage extends BasePage_1.BasePage {
    adminBar;
    adminMenu;
    settings;
    sync;
    health;
    features;
    search;
    autosuggest;
    instantResults;
    constructor(page) {
        super(page);
        this.adminBar = new AdminBar_1.AdminBar(page);
        this.adminMenu = new AdminMenu_1.AdminMenu(page);
        this.settings = new ElasticPressSettings_1.ElasticPressSettings(page);
        this.sync = new ElasticPressSync_1.ElasticPressSync(page);
        this.health = new ElasticPressHealth_1.ElasticPressHealth(page);
        this.features = new ElasticPressFeatures_1.ElasticPressFeatures(page);
        this.search = new WordPressSearch_1.WordPressSearch(page, this.wpUrl);
        this.autosuggest = new ElasticPressAutosuggest_1.ElasticPressAutosuggest(page);
        this.instantResults = new ElasticPressInstantResults_1.ElasticPressInstantResults(page);
    }
    get wpUrl() {
        const url = environment_1.ENV.WP_URL;
        if (!url)
            throw new Error('WP_URL is not configured');
        return url;
    }
    async gotoSettings() {
        await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-settings`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    async gotoSync() {
        await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-sync`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    async gotoHealth() {
        await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress-health`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    async gotoFeatures() {
        await this.page.goto(`${this.wpUrl}/wp-admin/admin.php?page=elasticpress#/search`, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
    async gotoFrontend() {
        await this.page.goto(this.wpUrl, {
            waitUntil: 'load',
            timeout: constants_1.TIMEOUTS.NAVIGATION,
        });
    }
}
exports.ElasticPressPage = ElasticPressPage;
//# sourceMappingURL=ElasticPressPage.js.map