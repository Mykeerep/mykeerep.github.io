const CACHE_NAME = 'offline-site-v1';
const CACHE_ASSETS = [
    
    './line.html', // Fallback offline page
];

// Install Service Worker and Cache Assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching assets...');
            return cache.addAll(CACHE_ASSETS);
        })
    );
    self.skipWaiting(); // Activate the Service Worker immediately
});

// Activate Service Worker and Remove Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache...');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control of all tabs immediately
});

// Fetch Requests and Serve Cache or Fallback
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Serve cached response if available or fetch the request
            return response || fetch(event.request).catch(() => {
                // If both fail, serve the offline page
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
        })
    );
});
