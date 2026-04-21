const cacheName = 'bio-vlk-v3-final-v2';
const filesToCache = [
  './bio-vlk-v3.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/2829/2829824.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
