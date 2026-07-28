/**
 * Parse the Pantheon site.env from a pantheonsite.io URL.
 * Uses SITE_NAME env var (or the provided siteName) to correctly split
 * the env prefix from the site name, even for multidev names with hyphens.
 *
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.dev
 * e.g. https://ci-abc12-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.ci-abc12
 */
export declare function getSiteEnv(url?: string, siteName?: string): string;
/**
 * Parse just the site name from a pantheonsite.io URL
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal
 */
export declare function getSiteName(url?: string): string;
/**
 * Ensure the site is in the desired connection mode (sftp or git).
 * Checks current mode first — no-op if already correct.
 * Includes retry logic for Integrated Composer builds.
 */
export declare function ensureConnectionMode(mode: 'sftp' | 'git', url?: string): Promise<void>;
/**
 * Execute a terminus command and return the output
 */
export declare function terminusExec(command: string, timeoutMs?: number): string;
/**
 * Generate a random multidev name: ci- + 5 lowercase chars
 */
export declare function generateMultidevName(): string;
/**
 * Get the git clone URL for a Pantheon site environment
 */
export declare function getGitUrl(siteEnv: string): string;
/**
 * Poll terminus workflow:list until no workflows are running for the given site.
 * Polls every 15s, up to maxWaitMs (default 5 minutes).
 */
export declare function waitForWorkflows(siteName: string, maxWaitMs?: number): Promise<void>;
//# sourceMappingURL=terminus.util.d.ts.map