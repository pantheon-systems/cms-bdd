# cms-bdd-public

Reusable Playwright-BDD step definitions, page objects, and utilities for testing Drupal and WordPress sites.

## Structure

- `src/pages/` — page objects (Drupal, WordPress)
- `src/components/` — reusable UI components used by page objects
- `src/steps/ui/` — Playwright-driven UI step definitions
- `src/steps/backend/terminus/` — CLI-driven step definitions that use [Terminus](https://pantheon.io/docs/terminus) to drive WP-CLI/drush against a Pantheon-hosted environment (schema posting, seeding test content, toggling search on/off, etc.)
- `src/utils/terminus.util.ts` — thin wrapper around the `terminus` CLI

Everything here is generic — no application-specific business logic. Test repositories import this framework and bring their own `.feature` files.

## Requirements

- Node.js and a Playwright/Playwright-BDD test repo that imports this package
- For the `backend/terminus` steps: the [Terminus CLI](https://pantheon.io/docs/terminus) installed and authenticated, and SSH access configured for the target site environment (see below)

## Configuring Terminus for CI

Terminus itself is a public CLI — using it doesn't require anything proprietary — but the steps in `src/steps/backend/terminus/` assume it's already authenticated and that an SSH key is registered before tests run. That setup happens once, outside this framework, in your CI job:

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
