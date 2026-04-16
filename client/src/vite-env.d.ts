/// <reference types="vite/client" />
interface CookieStore {
  get(name: string): Promise<any>;
  set(name: string, value: string): Promise<void>;
  delete(name: string): Promise<void>;
  getAll(): Promise<any[]>;
}

declare var cookieStore: CookieStore;
