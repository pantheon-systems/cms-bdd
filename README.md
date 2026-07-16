# cms-bdd-public

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
import { test } from 'cms-bdd-public';
import { terminusExec, getSiteEnv } from 'cms-bdd-public';

const { When } = createBdd(test);

When('I post the Solr schema', async () => {
  const env = getSiteEnv();
  terminusExec(`drush "${env}" -- search-api-pantheon:postSchema`);
});
```

This keeps the framework reusable across test repos with different CUJs, while this package stays focused on the reusable primitives (page objects, components, fixtures, utils) those steps are built from.

## Requirements

- Node.js and a Playwright/Playwright-BDD test repo that imports this package
- If your test repo's step definitions call into `terminus.util.ts`: the [Terminus CLI](https://pantheon.io/docs/terminus) installed and authenticated, and SSH access configured for the target site environment (see below)

## Configuring Terminus for CI

Terminus itself is a public CLI — using it doesn't require anything proprietary — but any step definitions your test repo writes against `terminus.util.ts` will assume Terminus is already authenticated and that an SSH key is registered before tests run. That setup happens once, in your test repo's CI job:

```yaml
- name: Set up SSH for Terminus
  run: |
    mkdir -p ~/.ssh
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N "" -q
    terminus ssh-key:add ~/.ssh/id_rsa.pub
    ssh-keyscan -p 2222 codeserver.dev.*.drush.in appserver.dev.*.drush.in >> ~/.ssh/known_hosts 2>/dev/null || true
    echo "StrictHostKeyChecking no" >> ~/.ssh/config
```

This generates a fresh, ephemeral SSH keypair per run and registers the public half with Pantheon via `terminus ssh-key:add`, then pre-populates `known_hosts` so `terminus remote:wp`/`terminus remote:drush` calls don't hang on a host-key prompt. Nothing here is a long-lived secret — the key is regenerated every run.

Before this step, Terminus needs to be authenticated with a machine token (e.g. `terminus auth:login --machine-token=$TERMINUS_MACHINE_TOKEN`), where the token itself is pulled from your CI secret store, not committed anywhere.

## Building

```bash
npm install
npm run build
```

Test repositories import from `dist/`, not `src/`.
