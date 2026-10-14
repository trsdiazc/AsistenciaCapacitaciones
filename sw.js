// sw.js - Permite la carga instantánea sin conexión
const CACHE_NAME = 'asistencia-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación: Descarga y guarda en la memoria interna
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación: Limpia memorias antiguas si actualizas la app
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepción: Responde desde la memoria local si no hay red
self.addEventListener('fetch', (e) => {
  // Ignora las peticiones dirigidas a Apps Script (deben ir a la red)
  if (e.request.url.includes('script.google.com')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
