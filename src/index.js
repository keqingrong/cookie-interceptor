import { version } from '../package.json';

var isInitialized = false;
var readEnabled = true;
var writeEnabled = true;
var readHandlers = [];
var writeHandlers = [];

/**
 * Hijack the `document.cookie` object
 */
function hijackCookie() {
  // IE8
  if (typeof Document === 'undefined') {
    if (typeof console !== 'undefined') {
      console.error('Your browser does not support intercept document.cookie.');
    }
    return;
  }

  // Check whether or not the cookies is enabled.
  if (!navigator.cookieEnabled) {
    console.error(
      'Your browser does not support or is blocking cookies from being set.'
    );
    return;
  }

  // In Chrome, Safari, Opera, Edge and IE9+ the cookie property is defined on
  // `Document.prototype`, whereas in Firefox it is defined on
  // `HTMLDocument.prototype`.
  var originalCookieDescriptor =
    Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
    Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
  var cookieDescriptor = Object.getOwnPropertyDescriptor(document, 'cookie');
  var getter = function getter() {
    if (!readEnabled) {
      return '';
    }
    if (readHandlers.length) {
      return readHandlers.reduce(function (prevOutput, currentFn) {
        return currentFn(prevOutput);
      }, originalCookieDescriptor.get.call(document));
    }
    return originalCookieDescriptor.get.call(document);
  };
  var setter = function setter(val) {
    if (!writeEnabled) {
      return;
    }
    if (writeHandlers.length) {
      var output = writeHandlers.reduce(function (prevOutput, currentFn) {
        return currentFn(prevOutput);
      }, val);
      originalCookieDescriptor.set.call(document, output);
      return;
    }
    originalCookieDescriptor.set.call(document, val);
  }

  if (cookieDescriptor && cookieDescriptor.configurable === false) {
    if (cookieDescriptor.set && cookieDescriptor.get._cookieInterceptor) {
      console.error(
        '"cookie-interceptor" is loaded more than once on this page, ' +
        'it may not work as expected.'
        );
    } else {
      console.error('Cannot redefine non-configurable property "cookie"');
    }
    return;
  }

  Object.defineProperty(document, 'cookie', {
    configurable: false,
    get: getter,
    set: setter
  });
  getter._cookieInterceptor = true;
}

var api = {
  version: version,
  init: function () {
    if (!isInitialized) {
      hijackCookie();
    }
  },
  isReadEnabled: function () {
    return readEnabled;
  },
  isWriteEnabled: function () {
    return writeEnabled;
  },
  enableRead: function () {
    readEnabled = true;
    return this;
  },
  disableRead: function () {
    readEnabled = false;
    return this;
  },
  enableWrite: function () {
    writeEnabled = true;
    return this;
  },
  disableWrite: function () {
    writeEnabled = false;
    return this;
  },
  read: {
    enable: function () {
      readEnabled = true;
    },
    disable: function () {
      readEnabled = false;
    },
    use: function (callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
      }
      readHandlers.push(callback);
    }
  },
  write: {
    enable: function () {
      writeEnabled = true;
    },
    disable: function () {
      writeEnabled = false;
    },
    use: function (callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
      }
      writeHandlers.push(callback);
    }
  }
};

if (Object.defineProperties && Object.defineProperty) {
  Object.defineProperties(api, {
    readEnabled: {
      get: function () {
        return api.isReadEnabled();
      }
    },
    writeEnabled: {
      get: function () {
        return api.isWriteEnabled();
      }
    }
  });

  Object.defineProperty(api.read, 'enabled', {
    get: function () {
      return api.isReadEnabled();
    }
  });

  Object.defineProperty(api.write, 'enabled', {
    get: function () {
      return api.isWriteEnabled();
    }
  });
}

export default api;
