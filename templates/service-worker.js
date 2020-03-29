var cacheName = 'mm-trainers-__uid__';

var contentToCache = __fileArray__;

// Install event.
self.addEventListener('install', (e) => {
  console.log('Service Worker Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Activate event.
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

// Fetch event.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log('Service Worker Fetching resource: ' + e.request.url);
      return r || fetch(e.request).then((response) => {
        if (event.request.url.toLowerCase().indexOf('/api/') !== -1) {
          return caches.open(cacheName).then((cache) => {
            console.log('Service Worker Caching new resource: ' + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        }
        return response;
      });
    })
  );
});