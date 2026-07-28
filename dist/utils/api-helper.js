"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIHelper = void 0;
const test_1 = require("@playwright/test");
class APIHelper {
    context = null;
    async init(baseURL) {
        this.context = await test_1.request.newContext({
            baseURL,
            extraHTTPHeaders: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }
    async get(endpoint, headers) {
        if (!this.context)
            throw new Error('API context not initialized');
        return await this.context.get(endpoint, { headers });
    }
    async post(endpoint, data, headers) {
        if (!this.context)
            throw new Error('API context not initialized');
        return await this.context.post(endpoint, { data, headers });
    }
    async put(endpoint, data, headers) {
        if (!this.context)
            throw new Error('API context not initialized');
        return await this.context.put(endpoint, { data, headers });
    }
    async delete(endpoint, headers) {
        if (!this.context)
            throw new Error('API context not initialized');
        return await this.context.delete(endpoint, { headers });
    }
    async dispose() {
        if (this.context) {
            await this.context.dispose();
        }
    }
}
exports.APIHelper = APIHelper;
//# sourceMappingURL=api-helper.js.map