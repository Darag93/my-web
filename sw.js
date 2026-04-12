self.addEventListener('install', (e) => {
  e.waitUntil(
    // Změna názvu na vlk-v2 vynutí aktualizaci u všech uživatelů
    caches.open('bio-vlk-v2').then((cache) => {
      return cache.addAll([
        'bio.html',
        'manifest.json',
        'index.html',
        'styl.css'
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Tento kód smaže starou mezipaměť s raketou (bio-v1)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'bio-vlk-v2') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
