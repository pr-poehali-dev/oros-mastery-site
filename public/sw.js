const CACHE_NAME = 'rick-morty-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg'
];

const API_CACHE_TIME = 5 * 60 * 1000; // 5 минут

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Кешируем изображения с CDN
  if (url.hostname === 'cdn.poehali.dev' && request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Кешируем API с временем жизни
  if (url.hostname === 'functions.poehali.dev') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
              const clone = response.clone();
              cache.put(request, clone);
            }
            return response;
          });

          // Если есть кеш - отдаём его, но обновляем в фоне
          if (cached) {
            const cachedDate = new Date(cached.headers.get('date')).getTime();
            const now = Date.now();
            
            // Если кеш свежий - отдаём его
            if (now - cachedDate < API_CACHE_TIME) {
              return cached;
            }
          }
          
          // Иначе ждём новые данные
          return fetchPromise;
        });
      })
    );
    return;
  }

  // Для остальных запросов - стандартная стратегия
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});
