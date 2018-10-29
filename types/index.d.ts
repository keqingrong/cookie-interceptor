declare const CookieInterceptor: {
  version: string;
  readEnabled: boolean;
  writeEnabled: boolean;
  isReadEnabled: () => boolean;
  isWriteEnabled: () => boolean;
  enableRead: () => any;
  disableRead: () => any;
  enableWrite: () => any;
  disableWrite: () => any;
  read: {
      enabled: boolean;
      enable: () => void;
      disable: () => void;
      use: (callback: (cookie: string) => string) => void;
  };
  write: {
      enabled: boolean;
      enable: () => void;
      disable: () => void;
      use: (callback: (val: string) => string) => void;
  };
};

export default CookieInterceptor;
