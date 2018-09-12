
deleteAllCookies();

document.cookie = ('time=' + new Date().getTime());
printCookieStatus();

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

function printCookieStatus() {
  console.log(
    '[cookie  status] read: ' + CookieInterceptor.isReadEnabled() +
    ', write: ' + CookieInterceptor.isWriteEnabled()
  );
  console.log('[cookie content] ' + document.cookie);
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
