import { version } from '../package.json';

var readEnabled = true;
var writeEnabled = true;

var property = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
  Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

if (property && property.configurable) {
  Object.defineProperty(document, 'cookie', {
    get: function () {
      if (readEnabled) {
        return property.get.call(document);
      }
      return '';
    },
    set: function (val) {
      if (writeEnabled) {
        property.set.call(document, val);
      }
    }
  });
} else {
  console.error('Your browser does not support intercept document.cookie.');
}

var api = {
  version: version,
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
  }
};

export default api;
