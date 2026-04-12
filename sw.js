self.addEventListener('install', (e) => {
  e.waitUntil(
    // Změna na v3 - tohle je ten příkaz, který vymaže raketu
    caches.open('bio-vlk-v3').then((cache) => {
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
  // Smaže úplně všechno staré (v1 i v2 s raketou)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'bio-vlk-v3') {
            console.log('Mažu starou mezipaměť:', cacheName);
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
