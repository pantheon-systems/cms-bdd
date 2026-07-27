# Setting up a new test repo against `cms-bdd`

`cms-bdd` is a page-objects/components/fixtures/utils library for Playwright-BDD
testing of Drupal and WordPress sites. It intentionally ships **no** `.feature`
files and **no** step definitions — those live in the test repo that consumes
it (see `cms-bdd`'s main README, "Where step definitions live"). This doc
walks through setting up a new consumer repo from scratch, with every gotcha
we hit already baked into the steps below, plus a troubleshooting section in
case something still goes sideways.

There's no npm registry for `cms-bdd` — it's consumed as a local `file:`
dependency, so this whole guide assumes the test repo lives as a sibling
folder next to `cms-bdd` (e.g. `~/code/cms-bdd` and `~/code/<your-test-repo>`).

## Prerequisites

- Node.js
- A local checkout of `cms-bdd`, with `dist/` present and up to date (`npm
  install && npm run build` inside `cms-bdd` if you're not sure)

## 1. Scaffold the repo

```bash
mkdir ~/code/<your-test-repo>
cd ~/code/<your-test-repo>
git init
npm init -y
```

## 2. `.npmrc` — do this before installing anything

```
install-links=true
```

This is the single most important step in this whole guide. `cms-bdd` is
consumed via `"cms-bdd": "file:../cms-bdd"`. By default, npm installs a local
`file:` dependency as a **symlink**. Node resolves `require()` calls through a
symlink to its *real* target path, not the symlink's location — so anything
`cms-bdd`'s own compiled code requires at runtime (`playwright-bdd`,
`@playwright/test`) gets looked up starting from `cms-bdd`'s own directory
tree, not your test repo's `node_modules`. Two ways this goes wrong without
this setting:

- If `cms-bdd` doesn't have its own copy of those packages installed:
  `Error: Cannot find module 'playwright-bdd'`
- If you "fix" that by installing `playwright-bdd`/`@playwright/test` inside
  `cms-bdd` itself, you now have **two separate copies** of `@playwright/test`
  loaded in one process, and Playwright's own internal guard throws:
  `Error: Requiring @playwright/test second time`

`install-links=true` makes npm **copy** `cms-bdd` into your `node_modules`
instead of symlinking it. The copy has no nested `node_modules` of its own, so
its `require()` calls naturally resolve up to your test repo's single shared
copy. Both problems above disappear.

## 3. Install dependencies — pin these exact versions

```bash
npm install --save-dev @playwright/test@1.60.0 playwright@1.60.0 playwright-bdd@8.5.1 allure-playwright typescript @types/node
npm install cms-bdd@file:../cms-bdd
npx playwright install --with-deps
```

Then in `package.json`, make sure these three have **no `^` or `~`**:

```json
"devDependencies": {
  "@playwright/test": "1.60.0",
  "playwright": "1.60.0",
  "playwright-bdd": "8.5.1"
}
```

Why this matters, specifically:

- `cms-bdd`'s peer dependency range for `playwright-bdd` is `^8.5.1`.
  `playwright-bdd@9.x` has breaking changes from v8 — installing a caret range
  will eventually resolve to a v9 patch and hit an `ERESOLVE` conflict (or
  worse, get force-installed into a broken state).
- `@playwright/test` and `playwright` (the raw package, separate from
  `@playwright/test`) **must match each other exactly**. A mismatch (e.g.
  `@playwright/test@1.60.0` with `playwright@1.61.1`) breaks
  `playwright-bdd`'s ESM loader with a cryptic destructure crash:
  `TypeError: Cannot destructure property 'registerESMLoader' of ...`
- Caret ranges will silently re-drift back to a mismatched state the next
  time someone runs a fresh `npm install` (e.g. after cloning the repo, or
  after `rm -rf node_modules && npm install`) — pin them with no `^`/`~` so
  this can't happen again.

## 4. `playwright.config.ts`

```typescript
import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts', 'node_modules/cms-bdd/dist/fixtures/customFixtures.js'],
});

export default defineConfig({
  testDir,
  timeout: 30000,
  retries: 2,
  workers: 4,
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'on-first-retry', // use 'on' instead while actively debugging a failure
  },
});
```

Note `cms-bdd/dist/fixtures/customFixtures.js` is included directly in the
`steps` array. `playwright-bdd` needs to detect which custom `test` instance
(the one produced by `base.extend()`) your steps are using. Its auto-detection
traces relative-path re-exports, but `test` here comes from a package,
re-exported through `cms-bdd`'s `index.ts` → `customFixtures.ts` — auto-detect
doesn't follow that chain. Including the actual fixtures file in `steps`
fixes it. (There's an older `importTestFrom` config option for this same
problem — don't use it, current `playwright-bdd` warns it's unnecessary and
to do this instead.)

## 5. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "types": ["node", "@playwright/test"]
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", ".features-gen"]
}
```

## 6. `.gitignore`

```
node_modules/
.features-gen/
test-results/
playwright-report/
allure-results/
allure-report/
.env
package-lock.json
```


## 7. Directory structure and your first feature

```bash
mkdir features steps
```

`features/login.feature`:

```gherkin
Feature: Drupal CMS Admin
  As a Drupal user
  I want to access the Drupal admin
  So that I can manage my Drupal site

  Scenario: Login to Drupal site admin
    When I log in to the Drupal site
    Then the Drupal admin should be loaded
```

`steps/login.steps.ts`:

```typescript
import { createBdd } from 'playwright-bdd';
import { test, expect, DrupalAdminPage } from 'cms-bdd';

const { When, Then } = createBdd(test);

When('I log in to the Drupal site', async ({ drupalLoginPage }) => {
  await drupalLoginPage.login();
});

Then('the Drupal admin should be loaded', async ({ page }) => {
  const adminPage = new DrupalAdminPage(page);
  expect(await adminPage.isAdminLoaded()).toBe(true);
});
```

`drupalLoginPage` is a ready-made fixture from `cms-bdd` (see its
`customFixtures.ts`) — `.login()` navigates to `/user/login`, fills
credentials from `.env`, submits, and waits for network idle, all in one call.

If you write a `.feature` file before its steps exist, run `npx bddgen` — it
prints ready-to-paste step stubs for anything undefined, generated from the
exact Gherkin text (keep exact wording/typos in sync between the `.feature`
and the step definition string; Cucumber-style matching is exact-text, though
`Given`/`When`/`Then` themselves are interchangeable by default).

## 8. `package.json` scripts

```json
"scripts": {
  "test": "bddgen && playwright test",
  "test:headed": "bddgen && playwright test --headed",
  "allure:serve": "allure serve allure-results"
}
```

## 9. Run it

```bash
npm test
```

## Debugging a failing test

- `npx playwright show-report` — opens the HTML report for the most recent
  run; click into a failed test for screenshots and a link to its trace, no
  need to hunt for file paths.
- `npx playwright show-trace <path-to-trace.zip>` — full step-by-step replay
  (DOM, screenshots, network) if you need to see exactly what the browser saw.
  `test-results/` is cleared and regenerated each run, with a folder name
  deterministic per test title (plus `-retry1`/`-retry2` suffixes if it
  failed and retried) — the trace lives *inside* that per-test folder.
- If a locator like `page.locator('main, #content, .layout-content')` throws
  under Playwright's strict mode (matches more than one element), a
  try/catch around it can silently swallow the error and make an assertion
  look like a false negative rather than an exception. Worth checking traces
  for this pattern if a check fails despite everything visibly looking
  correct.

## Terminus-backed (CLI) steps — optional

`cms-bdd` ships `terminus.util.ts` as a utility, but no steps use it directly
— write your own in your test repo if you need CLI-driven setup (schema
posting, seeding content, etc.) alongside your UI steps. See `cms-bdd`'s
README for the CI SSH setup Terminus needs.


## Commands to run after editing things

What you need to run depends on *which* repo you touched.

### Editing `cms-bdd-test` itself (features, steps, `playwright.config.ts`)

Nothing to reinstall — these are plain source files in the test repo, not
anything npm manages. Just rerun:

```bash
npm test
```

`bddgen` regenerates `.features-gen/` from your current `.feature`/`.steps.ts`
files every time it runs, so there's no separate "rebuild" step here.

### Editing `cms-bdd` (the framework) — normal case

The framework has to be rebuilt, and the consumer repo has to pick up the new
`dist/`:

```bash
# in cms-bdd
npm run build

# in cms-bdd-test
npm install cms-bdd@file:../cms-bdd
```

`npm install cms-bdd@file:../cms-bdd` re-resolves and re-copies just that one
package (remember `install-links=true` makes it a copy, not a symlink), which
is normally enough to pick up the change.

### Editing `cms-bdd` — when the light reinstall doesn't seem to take

Sometimes npm reports `up to date` and doesn't actually refresh the copied
package, even though `dist/` changed — or you've changed something structural
(pinned versions, the dependency's name/path, moved either repo). When that
happens, force a full clean reinstall in `cms-bdd-test`:

```bash
rm -rf node_modules package-lock.json
npm install
```

This is also the right move any time you touch `cms-bdd-test`'s own
`package.json` versions/deps directly, after a rename (see below), or as a
first troubleshooting step if something's behaving inexplicably.

### Changing pinned Playwright versions

If you change `@playwright/test`/`playwright`'s pinned version in either
repo's `package.json`, reinstall *and* refresh the browser binaries — they're
tied to the exact version installed:

```bash
npm install
npx playwright install --with-deps
```

## Running in CI (GitHub Actions)

Locally, the `file:../cms-bdd` dependency resolves because the framework repo
sits right next to the test repo on your machine. In CI, there's no sibling
checkout — so the workflow needs to fetch `cms-bdd` separately and repoint the
`file:` path before `npm install` runs.

### How the dependency override works

The pattern is two steps:

1. **Fetch the framework repo** to a temporary path using
   [`pantheon-systems/action-fetch-dependency`](https://github.com/pantheon-systems/action-fetch-dependency).
   This is a GitHub App-backed action (`pantheon-dependency-fetcher`) that
   works across the `pantheon-systems` org with no per-repo secrets — it just
   needs `id-token: write` on the job for OIDC federation.

2. **Rewrite the `file:` path** in `package.json` before installing, so npm
   resolves from the fetched copy instead of a nonexistent sibling directory:

   ```yaml
   - name: Fetch framework repo
     uses: pantheon-systems/action-fetch-dependency@<pinned-sha>
     with:
       repository: pantheon-systems/cms-bdd
       destination: /tmp/cms-bdd
       validate-checksum: false

   - name: Install dependencies
     run: |
       npm pkg set dependencies.cms-bdd="file:/tmp/cms-bdd"
       npm install
   ```

   `npm pkg set` edits `package.json` in place — it changes
   `"cms-bdd": "file:../cms-bdd"` to `"cms-bdd": "file:/tmp/cms-bdd"`. Since
   `install-links=true` is in `.npmrc`, `npm install` copies the built `dist/`
   into `node_modules` the same way it does locally. No npm registry is
   involved anywhere in this flow.

### Pin the action SHA

Per org security policy, all GitHub Actions must use pinned commit SHAs, not
version tags. To get the SHA for a tag:

```bash
gh api repos/pantheon-systems/action-fetch-dependency/git/ref/tags/<tag> --jq '.object.sha'
```

### Minimal workflow skeleton

```yaml
jobs:
  tests:
    runs-on: sbx-pan-qa-ui-01
    permissions:
      contents: write
      id-token: write    # required for action-fetch-dependency OIDC
    steps:
      - uses: actions/checkout@<pinned-sha>

      - name: Fetch framework repo
        uses: pantheon-systems/action-fetch-dependency@<pinned-sha>
        with:
          repository: pantheon-systems/cms-bdd
          destination: /tmp/cms-bdd
          validate-checksum: false

      - name: Install dependencies
        run: |
          npm pkg set dependencies.cms-bdd="file:/tmp/cms-bdd"
          npm install

      - name: Install browsers
        run: npx playwright install --with-deps chromium

      - name: Run tests
        env:
          HEADLESS: 'true'
          # ... your env vars and secrets
        run: npm test
```

For a complete example with Auth0, Terminus SSH setup, Allure reporting, and
GitHub Pages deployment, see
[`cms-test-bdd-automation`'s workflow files](https://github.com/pantheon-systems/cms-test-bdd-automation/tree/main/.github/workflows).

### Why not publish to an npm registry?

The framework changes frequently during active development, and the test repos
are tightly coupled to it. A `file:` dependency with a CI fetch step means:

- No publish/version/release cycle to manage — CI always gets the latest from
  `main` (or whatever ref `action-fetch-dependency` is configured to fetch).
- Local development uses the exact same install mechanism (`file:` path +
  `install-links=true`), just pointed at a different directory.
- The only difference between local and CI is *which path* the `file:`
  dependency points to.

## Troubleshooting reference

Errors we actually hit, in the order we hit them, for quick pattern-matching:

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module 'playwright-bdd'` | `file:` dep symlinked, resolves via real path | `install-links=true` in consumer's `.npmrc` |
| `Requiring @playwright/test second time` | Two separate installed copies loaded in one process | Same fix as above — don't duplicate the packages inside `cms-bdd` itself |
| `ERESOLVE unable to resolve dependency tree` (playwright-bdd version) | Consumer has `playwright-bdd@9.x`, `cms-bdd` peer range is `^8.5.1` | Pin `playwright-bdd@8.5.1` exactly |
| `Cannot destructure property 'registerESMLoader' of ...` | `@playwright/test` and `playwright` versions don't match each other | Pin both to the identical exact version (e.g. `1.60.0`), no carets |
| `browserType.launch: Executable doesn't exist at ...chrome-headless-shell...` | Browser binaries don't match the currently-installed Playwright version | `npx playwright install` (rerun any time the pinned version changes) |
| `Can't guess test instance for: features/x.feature` | `test` fixture comes from a package via multi-hop re-export; auto-detection doesn't trace it | Add the compiled fixtures file to the `steps` array in `defineBddConfig` |
| `WARNING: Option "importTestFrom" ... is not needed anymore` | Using the older workaround for the above | Remove `importTestFrom`, use the `steps` array fix instead |
| Assertion fails (e.g. `isAdminLoaded()` false) despite everything looking right in the trace | Locator strict-mode violation silently caught by a try/catch | Check the underlying locator for a selector that can match multiple elements; scope or `.first()` it |
| `fatal: Unable to create '.../.git/index.lock': File exists` | Stale lock file from an interrupted git process | `rm .git/index.lock` (safe if nothing's actually running) |
| `git restore --staged` → `fatal: could not resolve HEAD` | No commits exist yet, so there's no HEAD to restore from | `git rm -r --cached .` instead (doesn't need HEAD) |
| Everything shows as "Untracked" despite having a `.gitignore` | The file exists but is empty (0 bytes) — easy to create by accident | Check `wc -c .gitignore`; add actual patterns |
