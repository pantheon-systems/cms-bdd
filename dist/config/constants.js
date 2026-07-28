"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEOUTS = void 0;
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
dotenv_flow_1.default.config();
/**
 * Framework constants - centralized immutable defaults
 * Can be overridden at runtime via environment variables
 */
/**
 * Timeout configuration for Playwright operations
 * All values in milliseconds
 *
 * Override via environment variables:
 * - TIMEOUT_ELEMENT_VISIBLE
 * - TIMEOUT_ELEMENT_OPTIONAL
 * - TIMEOUT_NAVIGATION
 * - TIMEOUT_LOAD_STATE
 * - TIMEOUT_API
 */
exports.TIMEOUTS = {
    /**
     * Default timeout for element visibility checks (waitFor visible)
     * Used by: page objects, components for important elements
     * @default 10000 (10 seconds)
     */
    ELEMENT_VISIBLE: parseInt(process.env.TIMEOUT_ELEMENT_VISIBLE || '10000'),
    /**
     * Timeout for optional/less critical elements
     * Used by: dialogs, banners, promotional content
     * @default 5000 (5 seconds)
     */
    ELEMENT_OPTIONAL: parseInt(process.env.TIMEOUT_ELEMENT_OPTIONAL || '5000'),
    /**
     * Timeout for navigation operations (page loads)
     * Used by: goto, navigation steps
     * @default 30000 (30 seconds)
     */
    NAVIGATION: parseInt(process.env.TIMEOUT_NAVIGATION || '30000'),
    /**
     * Timeout for page load state waits
     * Used by: waitForLoadState
     * @default 15000 (15 seconds)
     */
    LOAD_STATE: parseInt(process.env.TIMEOUT_LOAD_STATE || '15000'),
    /**
     * Timeout for API/backend calls
     * Used by: API clients, GraphQL, CLI commands
     * @default 60000 (60 seconds)
     */
    API: parseInt(process.env.TIMEOUT_API || '60000'),
};
//# sourceMappingURL=constants.js.map