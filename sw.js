/* Automatisch erzeugt von tools/build.py – Offline-Cache für Durak 3D */
const CACHE = 'durak-982b95e047';
const FILES = [
  "./",
  "index.html",
  "css/style.css",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "vendor/three.min.js",
  "js/assets.js",
  "js/config.js",
  "js/rules.js",
  "js/ai.js",
  "js/textures.js",
  "js/audio.js",
  "js/scene.js",
  "js/ui.js",
  "js/net.js",
  "js/main.js",
  "js/online.js",
  "js/app.js",
  "assets/table/background.jpg",
  "assets/table/felt_diffuse.jpg",
  "assets/table/wood_diffuse.jpg",
  "assets/title/logo.png"
];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Erst Netz (immer aktuell), ohne Verbindung aus dem Cache */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
