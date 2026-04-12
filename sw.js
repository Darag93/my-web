self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('bio-v1').then((cache) => cache.addAll(['bio.html', 'manifest.json']))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
