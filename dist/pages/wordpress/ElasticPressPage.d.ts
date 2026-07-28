import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { AdminBar } from '../../components/wordpress/AdminBar';
import { AdminMenu } from '../../components/wordpress/AdminMenu';
import { ElasticPressSettings } from '../../components/wordpress/ElasticPressSettings';
import { ElasticPressSync } from '../../components/wordpress/ElasticPressSync';
import { ElasticPressHealth } from '../../components/wordpress/ElasticPressHealth';
import { ElasticPressFeatures } from '../../components/wordpress/ElasticPressFeatures';
import { WordPressSearch } from '../../components/wordpress/WordPressSearch';
import { ElasticPressAutosuggest } from '../../components/wordpress/ElasticPressAutosuggest';
import { ElasticPressInstantResults } from '../../components/wordpress/ElasticPressInstantResults';
export declare class ElasticPressPage extends BasePage {
    readonly adminBar: AdminBar;
    readonly adminMenu: AdminMenu;
    readonly settings: ElasticPressSettings;
    readonly sync: ElasticPressSync;
    readonly health: ElasticPressHealth;
    readonly features: ElasticPressFeatures;
    readonly search: WordPressSearch;
    readonly autosuggest: ElasticPressAutosuggest;
    readonly instantResults: ElasticPressInstantResults;
    constructor(page: Page);
    private get wpUrl();
    gotoSettings(): Promise<void>;
    gotoSync(): Promise<void>;
    gotoHealth(): Promise<void>;
    gotoFeatures(): Promise<void>;
    gotoFrontend(): Promise<void>;
}
//# sourceMappingURL=ElasticPressPage.d.ts.map