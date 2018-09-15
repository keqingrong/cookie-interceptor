# cookie-interceptor

[![npm version](https://img.shields.io/npm/v/cookie-interceptor.svg)](https://www.npmjs.com/package/cookie-interceptor)

> A simple JavaScript utility library for intercepting browser cookies

Live demo available at [here](https://rawgit.com/keqingrong/cookie-interceptor/master/example/).

## Installation

```sh
$ npm install cookie-interceptor
```

The CDN build is also available on unpkg:

- [unpkg.com/cookie-interceptor@0.0.1/dist/cookie-interceptor.umd.js](https://unpkg.com/cookie-interceptor@0.0.1/dist/cookie-interceptor.umd.js)
- [unpkg.com/cookie-interceptor@0.0.1/dist/cookie-interceptor.umd.min.js](https://unpkg.com/cookie-interceptor@0.0.1/dist/cookie-interceptor.umd.min.js)

## Usage

```js
import CookieInterceptor from 'cookie-interceptor';

CookieInterceptor.disableRead().disableWrite();

document.cookie = 'date=20180915';
console.log(document.cookie); // => ''

CookieInterceptor.enableRead().enableWrite();

document.cookie = 'name=john';
console.log(document.cookie); // => 'name=john'
```

## API

### isReadEnabled()

Check if the cookie is readable.

### isWriteEnabled()

Check if the cookie is writable.

### enableRead()

Enable READ flag.

You can read all cookies with `document.cookie` property.

### disableRead()

Disable READ flag.

`document.cookie` will return an empty string.

### enableWrite()

Enable WRITE flag.

You can write a new cookie or update an existing cookie.

### disableWrite()

Disable WRITE flag.

`document.cookie="key=value"` will not write a new cookie or update an existing cookie.

## License

MIT
