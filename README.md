# cookie-interceptor

[![npm version](https://img.shields.io/npm/v/cookie-interceptor.svg)](https://www.npmjs.com/package/cookie-interceptor)

> A simple JavaScript utility library for intercepting browser cookies

Live demo available at [here](https://rawgit.com/keqingrong/cookie-interceptor/master/example/).

## Installation

```sh
$ npm install cookie-interceptor
```

The CDN build is also available on unpkg:

- [unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.js](https://unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.js)
- [unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.min.js](https://unpkg.com/cookie-interceptor/dist/cookie-interceptor.umd.min.js)

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

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## License

MIT
