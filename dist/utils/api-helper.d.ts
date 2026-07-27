export declare class APIHelper {
    private context;
    init(baseURL: string): Promise<void>;
    get(endpoint: string, headers?: Record<string, string>): Promise<import("playwright-core").APIResponse>;
    post(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<import("playwright-core").APIResponse>;
    put(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<import("playwright-core").APIResponse>;
    delete(endpoint: string, headers?: Record<string, string>): Promise<import("playwright-core").APIResponse>;
    dispose(): Promise<void>;
}
//# sourceMappingURL=api-helper.d.ts.map