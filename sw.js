self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('bio-vlk-v2').then((cache) => cache.addAll(['bio.html', 'manifest.json']))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
