# cookie-interceptor

[![npm version](https://img.shields.io/npm/v/cookie-interceptor.svg)](https://www.npmjs.com/package/cookie-interceptor)

> A simple JavaScript utility library for intercepting browser cookies

Live demo available at [here](https://rawgit.com/keqingrong/cookie-interceptor/master/example/).

## Installation

```sh
$ npm install cookie-interceptor
```

The CDN build is also available on unpkg:

- [unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.min.js](https://unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.min.js)
- [unpkg.com/cookie-interceptor/dist/cookie-interceptor.esm.min.js](https://unpkg.com/cookie-interceptor/dist/cookie-interceptor.esm.min.js)

## Usage

```js
import CookieInterceptor from 'cookie-interceptor';

CookieInterceptor.disableRead();

CookieInterceptor.disableWrite();
```

## API

### isReadEnabled()

### isWriteEnabled()

### enableRead()

### disableRead()

### enableWrite()

### disableWrite()

## License

MIT
