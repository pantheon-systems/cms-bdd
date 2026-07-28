# cms-bdd

Reusable Playwright page objects, components, fixtures, and utilities for testing Drupal and WordPress sites.

## Structure

- `src/pages/` — page objects (Drupal, WordPress)
- `src/components/` — reusable UI components used by page objects
- `src/fixtures/` — Playwright-BDD test fixtures (`drupalLoginPage`, `wpLoginPage`, `elasticPressPage`)
- `src/utils/` — stateless helpers, including `terminus.util.ts` (a thin wrapper around the [Terminus](https://pantheon.io/docs/terminus) CLI)
- `src/config/` — environment and timeout constants

Everything here is generic — no application-specific business logic, and no `.feature` files or step definitions.

## Where step definitions live

This repo intentionally does **not** ship Cucumber/Playwright-BDD step definitions. Since this is a public package, step definitions — including the Gherkin phrasing, which CUJs they cover, and any CLI orchestration built on `terminus.util.ts` — belong in the test repository that harnesses this framework, not in here. Your test repo writes steps like:

```typescript
// test-repo/steps/search-api.steps.ts
import { createBdd } from 'playwright-bdd';
import { test } from 'cms-bdd';
import { terminusExec, getSiteEnv } from 'cms-bdd';

const { When } = createBdd(test);

When('I post the Solr schema', async () => {
  const env = getSiteEnv();
  terminusExec(`drush "${env}" -- search-api-pantheon:postSchema`);
});
```

This keeps the framework reusable across test repos with different CUJs, while this package stays focused on the reusable primitives (page objects, components, fixtures, utils) those steps are built from.

**Setting up a new consumer repo?** See [`docs/setting-up-a-test-repo.md`](docs/setting-up-a-test-repo.md) for a full walkthrough, including the non-obvious `file:`-dependency gotchas (symlink resolution, exact version pinning, etc...) and a troubleshooting table for the errors you're most likely to hit.

## Dependencies

| Tool | Minimum version | Verify | Required for |
|------|----------------|--------|--------------|
| Node.js | 18+ | `node -v` | Building and running |
| npm | 9+ | `npm -v` | Ships with Node |
| [Terminus](https://pantheon.io/docs/terminus) | 3.x | `terminus --version` | Steps that use `terminus.util.ts` (multidev provisioning, drush/wp-cli commands) |

Quick check:

```bash
node -v && npm -v && terminus --version 2>/dev/null && echo "All deps OK"
```

Terminus is only needed if your test repo's step definitions call into
`terminus.util.ts` — pure UI-only test repos can skip it entirely.

### Consumer repo requirements

Your test repo (the one that imports `cms-bdd`) also needs:

- An `.npmrc` with `install-links=true` — without it, `file:` dependencies resolve as symlinks and this package's own `require()` calls break in ways that are non-obvious to debug (see the [setup doc](docs/setting-up-a-test-repo.md))
- `@playwright/test`, `playwright`, and `playwright-bdd` pinned to exact matching versions (no `^`/`~`) — e.g. `@playwright/test@1.60.0`, `playwright@1.60.0`, `playwright-bdd@8.5.1`. Mismatches between these three break in ways ranging from an ERESOLVE conflict to a cryptic ESM loader crash

## Configuring Terminus for CI

Terminus itself is a public CLI — using it doesn't require anything proprietary — but any step definitions your test repo writes against `terminus.util.ts` will assume Terminus is already authenticated and that an SSH key is registered before tests run. That setup happens once, in your test repo's CI job:

```yaml
- name: Set up SSH for Terminus
  run: |
    mkdir -p ~/.ssh
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N "" -q
    terminus ssh-key:add ~/.ssh/id_rsa.pub
    echo "StrictHostKeyChecking no" >> ~/.ssh/config
```

This generates a fresh, ephemeral SSH keypair per run and registers the public half with Pantheon via `terminus ssh-key:add`. `StrictHostKeyChecking no` disables host-key verification so `terminus remote:wp`/`terminus remote:drush` calls don't hang on a host-key prompt. Nothing here is a long-lived secret — the key is regenerated every run.

Before this step, Terminus needs to be authenticated with a machine token (e.g. `terminus auth:login --machine-token=$TERMINUS_MACHINE_TOKEN`), where the token itself is pulled from your CI secret store, not committed anywhere.

## Building

```bash
npm install
npm run build
```

Test repositories import from `dist/`, not `src/`.
