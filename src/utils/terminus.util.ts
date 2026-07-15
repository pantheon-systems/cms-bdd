import { ENV } from '../config/environment';

/**
 * Parse the Pantheon site.env from a pantheonsite.io URL.
 * Uses SITE_NAME env var (or the provided siteName) to correctly split
 * the env prefix from the site name, even for multidev names with hyphens.
 *
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.dev
 * e.g. https://ci-abc12-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.ci-abc12
 */
export function getSiteEnv(url?: string, siteName?: string): string {
  url = url || ENV.DRUPAL_URL;
  siteName = siteName || process.env.SITE_NAME;

  if (siteName) {
    const match = url.match(new RegExp(`https?://(.+)-${siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.pantheonsite\\.io`));
    if (match) return `${siteName}.${match[1]}`;
  }

  // Fallback for simple env names (dev, test, live) without hyphens
  const match = url.match(/https?:\/\/(\w+)-(.+)\.pantheonsite\.io/);
  if (!match) throw new Error(`Cannot parse site env from URL: ${url}`);
  return `${match[2]}.${match[1]}`;
}

/**
 * Parse just the site name from a pantheonsite.io URL
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal
 */
export function getSiteName(url?: string): string {
  url = url || ENV.DRUPAL_URL;
  const siteName = process.env.SITE_NAME;
  if (siteName) return siteName;

  // Fallback: assume first segment before hyphen is the env
  const match = url.match(/https?:\/\/\w+-(.+)\.pantheonsite\.io/);
  if (!match) throw new Error(`Cannot parse site name from URL: ${url}`);
  return match[1];
}

/**
 * Ensure the site is in the desired connection mode (sftp or git).
 * Checks current mode first — no-op if already correct.
 * Includes retry logic for Integrated Composer builds.
 */
export async function ensureConnectionMode(mode: 'sftp' | 'git', url?: string): Promise<void> {
  const { execSync } = await import('child_process');
  const env = getSiteEnv(url);

  let currentMode = '';
  try {
    currentMode = execSync(`terminus env:info ${env} --field=connection_mode 2>&1`, {
      encoding: 'utf-8',
      timeout: 30000,
    }).trim().toLowerCase();
  } catch {
    // If we can't determine mode, try to set it anyway
  }

  if (currentMode === mode) return;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      execSync(`terminus connection:set ${env} ${mode}`, {
        encoding: 'utf-8',
        timeout: 60000,
      });
      return;
    } catch {
      await new Promise(r => setTimeout(r, 15000));
    }
  }
  throw new Error(`Failed to switch ${env} to ${mode} mode after 3 attempts`);
}

/**
 * Execute a terminus command and return the output
 */
export function terminusExec(command: string, timeoutMs = 120000): string {
  const { execSync } = require('child_process');
  return execSync(`terminus ${command}`, {
    encoding: 'utf-8',
    timeout: timeoutMs,
  }).trim();
}

/**
 * Generate a random multidev name: ci- + 5 lowercase chars
 */
export function generateMultidevName(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let suffix = '';
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ci-${suffix}`;
}

/**
 * Get the git clone URL for a Pantheon site environment
 */
export function getGitUrl(siteEnv: string): string {
  const output = terminusExec(`connection:info ${siteEnv} --field=git_url`);
  return output;
}

/**
 * Poll terminus workflow:list until no workflows are running for the given site.
 * Polls every 15s, up to maxWaitMs (default 5 minutes).
 */
export async function waitForWorkflows(siteName: string, maxWaitMs = 300000): Promise<void> {
  const start = Date.now();
  const pollInterval = 15000;

  while (Date.now() - start < maxWaitMs) {
    try {
      const output = terminusExec(
        `workflow:list ${siteName} --fields=workflow,status --format=json`,
        30000
      );
      const workflows = JSON.parse(output);
      const running = Object.values(workflows).find(
        (w: any) => w.status === 'running'
      );
      if (!running) {
        console.log(`[waitForWorkflows] No running workflows on ${siteName}`);
        return;
      }
      console.log(`[waitForWorkflows] Workflow still running: ${(running as any).workflow}`);
    } catch {
      // parse failure or terminus error — keep waiting
    }
    await new Promise(r => setTimeout(r, pollInterval));
  }
  throw new Error(`Timed out waiting for workflows on ${siteName}`);
}
