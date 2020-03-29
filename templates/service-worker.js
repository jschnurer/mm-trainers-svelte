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
      if (r) {
        console.log('Service Worker Returning resource from cache: ' + e.request.url);
        return r;
      }

      // if not found in cache, return default offline content (only if this is a navigation request)
      if (e.request.mode === 'navigate') {
        console.log('Navigate request not in cache. Return index.html');
        return caches.match('./index.html');
      }

      // fetch as normal
      console.log('Service Worker Fetching resource: ' + e.request.url);
      return fetch(e.request);
    })
  );
});