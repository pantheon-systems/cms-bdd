import { Page } from '@playwright/test';
/**
 * WordPress login form component
 * The standard login form at /wp-login.php
 */
export declare class LoginForm {
    readonly page: Page;
    constructor(page: Page);
    get form(): import("playwright-core").Locator;
    get usernameInput(): import("playwright-core").Locator;
    get passwordInput(): import("playwright-core").Locator;
    get submitButton(): import("playwright-core").Locator;
    get errorMessage(): import("playwright-core").Locator;
    get rememberMe(): import("playwright-core").Locator;
    isFormVisible(): Promise<boolean>;
}
//# sourceMappingURL=LoginForm.d.ts.map