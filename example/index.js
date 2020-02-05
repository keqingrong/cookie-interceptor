var outputEl = document.getElementById('output');

deleteAllCookies();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.init();

CookieInterceptor.disableRead();
printCookieStatus();

CookieInterceptor.enableRead().disableWrite();
printCookieStatus();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.enableWrite();
printCookieStatus();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

CookieInterceptor.read.use(function (cookie) {
  log('read ' + cookie);
  return 'fake cookies';
});

CookieInterceptor.read.use(function (cookie) {
  log('read ' + cookie);
  return 'fake cookies 2';
});

printCookieStatus();

CookieInterceptor.write.use(function (val) {
  log('write ' + val);
  return 'msg=fake-writing';
});

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

function printCookieStatus() {
  log(
    '[cookie  status] readable: ' + CookieInterceptor.read.enabled +
    ', writable: ' + CookieInterceptor.write.enabled
  );
  log('[cookie content] ' + document.cookie);
}

// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

function log(msg) {
  outputEl.textContent += msg + '\n';
}
