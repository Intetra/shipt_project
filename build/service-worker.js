"use strict";var precacheConfig=[["/index.html","dbba080f7a2b9fbff29f1796e2c47446"],["/static/css/main.ec3a26b4.css","b75b9bcd95c7e7680cc42ae1f0e76e2f"],["/static/js/main.5b2540a6.js","122aa05afdce379dbcaec1087d53e3f1"],["/static/media/Scandia-Bold.9db5e1d9.woff","9db5e1d9ffb1abbc736797a90fe8ee55"],["/static/media/Scandia-Bold.b9d58221.ttf","b9d58221f5fe8fbdd599cfede089851c"],["/static/media/Scandia-Bold.bf4cce7c.svg","bf4cce7c2367bafec10499cb0a2adb79"],["/static/media/Scandia-Bold.c8c45b53.otf","c8c45b53146ed3e1e1d92bb71074d3b6"],["/static/media/Scandia-Regular.1a15cb83.otf","1a15cb8365b24476255fa08b2234c178"],["/static/media/Scandia-Regular.21fdab51.svg","21fdab5197a343388ebc086ecaa70eaf"],["/static/media/Scandia-Regular.3568b672.ttf","3568b6724fafcae79e87c7e009f99501"],["/static/media/Scandia-Regular.827bf172.woff","827bf172c176151eb4e382e78e09b52a"],["/static/media/back-mob.778e6dd7.svg","778e6dd7175f31c4160695bd643679d6"],["/static/media/back.ef78b150.svg","ef78b150ad54bdeaa7d0295f6158d0f1"],["/static/media/badge0.aa663ce9.png","aa663ce9335a179c473218257e6b4556"],["/static/media/badge1.d3a55954.png","d3a55954a6f61a0ea7c3d1d2005cee88"],["/static/media/badge2.8743f37f.png","8743f37fc1a4c9bc3a46b78525325214"],["/static/media/shipt-logo.78ce0b1b.svg","78ce0b1bd791dd05cf34b34ade2808fd"],["/static/media/zip.c5dde4cd.svg","c5dde4cdfbe007f3ea715189305dfb51"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var c="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});