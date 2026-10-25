// Tezlashtirish: statik fayllarni keshlaydi (oldin keshdan ko'rsatadi, fonda yangilaydi). index.html har doim tarmoqdan.
var C = "asmo-v46"
self.addEventListener("install", function () { self.skipWaiting() })
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== C }).map(function (k) { return caches.delete(k) })) }).then(function () { return self.clients.claim() }))
})
self.addEventListener("fetch", function (e) {
  var r = e.request
  if (r.method !== "GET") return
  var u = new URL(r.url)
  if (u.origin !== location.origin || /\.(mp3|mp4)$/i.test(u.pathname) || r.headers.has("range")) return
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(function (x) { var c = x.clone(); caches.open(C).then(function (k) { k.put(r, c) }); return x }).catch(function () { return caches.match(r) }))
    return
  }
  e.respondWith(caches.open(C).then(function (k) {
    return k.match(r).then(function (hit) {
      var net = fetch(r).then(function (x) { if (x.ok) k.put(r, x.clone()); return x }).catch(function () { return hit })
      return hit || net
    })
  }))
})
