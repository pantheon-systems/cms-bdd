import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Toolbar } from '../../components/drupal/Toolbar';
import { ServerForm } from '../../components/drupal/searchapi/ServerForm';
import { ServerStatus } from '../../components/drupal/searchapi/ServerStatus';
import { IndexForm } from '../../components/drupal/searchapi/IndexForm';
import { IndexFieldsForm } from '../../components/drupal/searchapi/IndexFieldsForm';
import { IndexOverview } from '../../components/drupal/searchapi/IndexOverview';
/**
 * Drupal Search API configuration page
 * Route: /admin/config/search/search-api
 */
export declare class SearchApiPage extends BasePage {
    readonly toolbar: Toolbar;
    readonly serverForm: ServerForm;
    readonly serverStatus: ServerStatus;
    readonly indexForm: IndexForm;
    readonly indexFieldsForm: IndexFieldsForm;
    readonly indexOverview: IndexOverview;
    constructor(page: Page);
    /**
     * Navigate to the Search API overview page
     */
    navigateTo(baseUrl: string): Promise<void>;
    /**
     * Navigate to the Add Server form
     */
    navigateToAddServer(baseUrl: string): Promise<void>;
    /**
     * Navigate to the Add Index form
     */
    navigateToAddIndex(baseUrl: string): Promise<void>;
    /**
     * Navigate to a server's status page by its machine name
     */
    navigateToServer(baseUrl: string, serverId: string): Promise<void>;
    /**
     * Navigate to an index's overview page by its machine name
     */
    navigateToIndex(baseUrl: string, indexId: string): Promise<void>;
    /**
     * Navigate to an index's fields page
     */
    navigateToIndexFields(baseUrl: string, indexId: string): Promise<void>;
    /**
     * Click "Add server" link on the overview page
     */
    clickAddServer(): Promise<void>;
    /**
     * Click "Add index" link on the overview page
     */
    clickAddIndex(): Promise<void>;
    /**
     * Navigate to the Extend (modules) page
     */
    navigateToExtend(baseUrl: string): Promise<void>;
}
//# sourceMappingURL=SearchApiPage.d.ts.map