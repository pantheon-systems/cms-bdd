import { APIRequestContext, request } from '@playwright/test';

export class APIHelper {
  private context: APIRequestContext | null = null;

  async init(baseURL: string): Promise<void> {
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async get(endpoint: string, headers?: Record<string, string>) {
    if (!this.context) throw new Error('API context not initialized');
    return await this.context.get(endpoint, { headers });
  }

  async post(endpoint: string, data?: any, headers?: Record<string, string>) {
    if (!this.context) throw new Error('API context not initialized');
    return await this.context.post(endpoint, { data, headers });
  }

  async put(endpoint: string, data?: any, headers?: Record<string, string>) {
    if (!this.context) throw new Error('API context not initialized');
    return await this.context.put(endpoint, { data, headers });
  }

  async delete(endpoint: string, headers?: Record<string, string>) {
    if (!this.context) throw new Error('API context not initialized');
    return await this.context.delete(endpoint, { headers });
  }

  async dispose(): Promise<void> {
    if (this.context) {
      await this.context.dispose();
    }
  }
}
