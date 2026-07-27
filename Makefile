MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
.SHELLFLAGS := -u -c

.PHONY:: help deps lint build clean format check-format

help: ## print list of tasks and descriptions
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | uniq | awk 'BEGIN {FS = ":.*?##"}; { printf "\033[36m%-30s\033[0m %s \n", $$1, $$2}'
.DEFAULT_GOAL := help

deps:: ## install build and test dependencies
	@echo "Checking required tools..."
	@command -v node >/dev/null 2>&1 || { echo "[ERROR] (deps) -> node not found"; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "[ERROR] (deps) -> npm not found"; exit 1; }
	@echo "[INFO] (deps) -> node $$(node -v)"
	@echo "[INFO] (deps) -> npm $$(npm -v)"
	@command -v terminus >/dev/null 2>&1 && echo "[INFO] (deps) -> terminus $$(terminus --version 2>/dev/null)" || echo "[WARN] (deps) -> terminus not found (optional — only needed for CLI-backed steps)"
	npm install

lint:: ## run all linters
	npx eslint src/
	npx prettier --check src/

build:: ## run all build
	npm run build

format:: ## auto-fix code style issues
	npx eslint --fix src/
	npx prettier --write src/

check-format: format ## error if format produces changes
	@s=$$(git status --porcelain); if [ -z "$$s" ]; then \
		echo "workdir is clean"; \
	else \
		echo "The following files have changed on disk"; \
		echo "$$s"; \
		git diff; \
		exit 1; \
	fi

clean:: ## clean up build artifacts
	rm -rf dist/
