.PHONY: help deps build lint lint-fix clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

deps: ## Install dependencies and verify required tools
	@echo "Checking required tools..."
	@command -v node >/dev/null 2>&1 || { echo "ERROR: node not found"; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "ERROR: npm not found"; exit 1; }
	@echo "  node $$(node -v)"
	@echo "  npm $$(npm -v)"
	@command -v terminus >/dev/null 2>&1 && echo "  terminus $$(terminus --version 2>/dev/null)" || echo "  terminus not found (optional — only needed for CLI-backed steps)"
	@echo ""
	npm install

build: ## Compile TypeScript to dist/
	npm run build

lint: ## Check code style (ESLint + Prettier)
	npm run lint

lint-fix: ## Auto-fix code style issues
	npm run lint:fix

clean: ## Remove build artifacts
	rm -rf dist/
