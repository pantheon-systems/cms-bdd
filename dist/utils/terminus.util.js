"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteEnv = getSiteEnv;
exports.getSiteName = getSiteName;
exports.ensureConnectionMode = ensureConnectionMode;
exports.terminusExec = terminusExec;
exports.generateMultidevName = generateMultidevName;
exports.getGitUrl = getGitUrl;
exports.waitForWorkflows = waitForWorkflows;
const environment_1 = require("../config/environment");
/**
 * Parse the Pantheon site.env from a pantheonsite.io URL.
 * Uses SITE_NAME env var (or the provided siteName) to correctly split
 * the env prefix from the site name, even for multidev names with hyphens.
 *
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.dev
 * e.g. https://ci-abc12-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal.ci-abc12
 */
function getSiteEnv(url, siteName) {
    url = url || environment_1.ENV.DRUPAL_URL;
    siteName = siteName || process.env.SITE_NAME;
    if (siteName) {
        const match = url.match(new RegExp(`https?://(.+)-${siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.pantheonsite\\.io`));
        if (match)
            return `${siteName}.${match[1]}`;
    }
    // Fallback for simple env names (dev, test, live) without hyphens
    const match = url.match(/https?:\/\/(\w+)-(.+)\.pantheonsite\.io/);
    if (!match)
        throw new Error(`Cannot parse site env from URL: ${url}`);
    return `${match[2]}.${match[1]}`;
}
/**
 * Parse just the site name from a pantheonsite.io URL
 * e.g. https://dev-cms-bdd-drupal.pantheonsite.io → cms-bdd-drupal
 */
function getSiteName(url) {
    url = url || environment_1.ENV.DRUPAL_URL;
    const siteName = process.env.SITE_NAME;
    if (siteName)
        return siteName;
    // Fallback: assume first segment before hyphen is the env
    const match = url.match(/https?:\/\/\w+-(.+)\.pantheonsite\.io/);
    if (!match)
        throw new Error(`Cannot parse site name from URL: ${url}`);
    return match[1];
}
/**
 * Ensure the site is in the desired connection mode (sftp or git).
 * Checks current mode first — no-op if already correct.
 * Includes retry logic for Integrated Composer builds.
 */
async function ensureConnectionMode(mode, url) {
    const { execSync } = await Promise.resolve().then(() => __importStar(require('child_process')));
    const env = getSiteEnv(url);
    let currentMode = '';
    try {
        currentMode = execSync(`terminus env:info ${env} --field=connection_mode 2>&1`, {
            encoding: 'utf-8',
            timeout: 30000,
        }).trim().toLowerCase();
    }
    catch {
        // If we can't determine mode, try to set it anyway
    }
    if (currentMode === mode)
        return;
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            execSync(`terminus connection:set ${env} ${mode}`, {
                encoding: 'utf-8',
                timeout: 60000,
            });
            return;
        }
        catch {
            await new Promise(r => setTimeout(r, 15000));
        }
    }
    throw new Error(`Failed to switch ${env} to ${mode} mode after 3 attempts`);
}
/**
 * Execute a terminus command and return the output
 */
function terminusExec(command, timeoutMs = 120000) {
    const { execSync } = require('child_process');
    return execSync(`terminus ${command}`, {
        encoding: 'utf-8',
        timeout: timeoutMs,
    }).trim();
}
/**
 * Generate a random multidev name: ci- + 5 lowercase chars
 */
function generateMultidevName() {
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
function getGitUrl(siteEnv) {
    const output = terminusExec(`connection:info ${siteEnv} --field=git_url`);
    return output;
}
/**
 * Poll terminus workflow:list until no workflows are running for the given site.
 * Polls every 15s, up to maxWaitMs (default 5 minutes).
 */
async function waitForWorkflows(siteName, maxWaitMs = 300000) {
    const start = Date.now();
    const pollInterval = 15000;
    while (Date.now() - start < maxWaitMs) {
        try {
            const output = terminusExec(`workflow:list ${siteName} --fields=workflow,status --format=json`, 30000);
            const workflows = JSON.parse(output);
            const running = Object.values(workflows).find((w) => w.status === 'running');
            if (!running) {
                console.log(`[waitForWorkflows] No running workflows on ${siteName}`);
                return;
            }
            console.log(`[waitForWorkflows] Workflow still running: ${running.workflow}`);
        }
        catch {
            // parse failure or terminus error — keep waiting
        }
        await new Promise(r => setTimeout(r, pollInterval));
    }
    throw new Error(`Timed out waiting for workflows on ${siteName}`);
}
//# sourceMappingURL=terminus.util.js.map