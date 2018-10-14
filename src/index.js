import { version } from '../package.json';

var readEnabled = true;
var writeEnabled = true;
var readHandlers = [];
var writeHandlers = [];

var property = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
  Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

if (property && property.configurable) {
  Object.defineProperty(document, 'cookie', {
    get: function () {
      if (!readEnabled) {
        return '';
      }
      if (readHandlers.length) {
        return readHandlers.reduce(function (prevOutput, currentFn) {
          return currentFn(prevOutput);
        }, property.get.call(document));
      }
      return property.get.call(document);
    },
    set: function (val) {
      if (!writeEnabled) {
        return;
      }
      if (writeHandlers.length) {
        var output = writeHandlers.reduce(function (prevOutput, currentFn) {
          return currentFn(prevOutput);
        }, val);
        property.set.call(document, output);
        return;
      }
      property.set.call(document, val);
    }
  });
} else {
  console.error('Your browser does not support intercept document.cookie.');
}

var api = {
  version: version,
  readEnabled: readEnabled,
  writeEnabled: writeEnabled,
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
    enabled: readEnabled,
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
    enabled: writeEnabled,
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

Object.defineProperties(api, {
  isReadEnabled: {
    get: function () {
      console.warn(
        'DEPRECATED: "isReadEnabled()" is deprecated. ' +
        'Use "readEnabled" property instead.'
      );
      return function () {
        return api.readEnabled;
      }
    }
  },
  isWriteEnabled: {
    get: function () {
      console.warn(
        'DEPRECATED: "isWriteEnabled()" is deprecated. ' +
        'Use "writeEnabled" property instead.'
      );
      return function () {
        return api.writeEnabled;
      }
    }
  }
});

export default api;
