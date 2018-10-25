declare namespace CookieInterceptor {
  const version: string;
  const readEnabled: boolean;
  const writeEnabled: boolean;

  function isReadEnabled(): boolean;
  function isWriteEnabled(): boolean;
  function enableRead(): any;
  function disableRead(): any;
  function enableWrite(): any;
  function disableWrite(): any;
}

declare namespace CookieInterceptor.read {
  const enabled: boolean;
  function enable(): void;
  function disable(): void;
  function use(callback: (value: string) => string): void;
}

declare namespace CookieInterceptor.write {
  const enabled: boolean;
  function enable(): void;
  function disable(): void;
  function use(callback: (value: string) => string): void;
}

declare module 'cookie-interceptor' {
  export = CookieInterceptor;
}
