# Step Definitions

This directory contains all reusable step definitions for the framework.

## Structure

```
steps/
└── ui/                      # UI (Playwright) step definitions
    ├── common/              # Common steps used across all tests
    │   ├── navigation.steps.ts
    │   └── assertions.steps.ts
    ├── authentication/      # Authentication steps
    │   └── cms-login.steps.ts
    ├── drupal/              # Drupal-specific steps
    │   ├── extend.steps.ts
    │   └── search-api.steps.ts
    └── wordpress/           # WordPress-specific steps
        └── elasticpress.steps.ts
```

This framework is UI-focused — there are intentionally no backend/CLI step
definitions (no GraphQL, REST, or CLI-driven steps). All steps drive the
browser through Playwright.

## Organization Guidelines

### UI Steps (`ui/`)
All Playwright-based UI test steps, organized by feature/page:

**Common Steps (`ui/common/`)**
- Generic navigation (goto, back, forward)
- Assertions
- Page interactions

**Authentication Steps (`ui/authentication/`)**
- Drupal and WordPress login

**CMS-Specific Steps**
- `ui/drupal/` - Drupal admin, extend/modules, Search API
- `ui/wordpress/` - WordPress admin, ElasticPress

## Adding New Steps

1. Determine the category (common, authentication, drupal, wordpress)
2. Create or edit the appropriate file
3. Follow naming conventions
4. Add JSDoc comments
5. Build the framework: `npm run build`
6. Test in examples/: `cd examples && npm test`

## Step Definition Best Practices

✅ **DO**:
- Use parameterization: `When I click on {string}`
- Keep steps atomic and reusable
- Add JSDoc documentation
- Use Logger for important actions
- Make steps framework-agnostic (generic)

❌ **DON'T**:
- Create duplicate steps
- Make steps application-specific
- Combine multiple actions in one step
