const CACHE_NAME = 'blocknode-cache-v1'

const CACHED_URLS = [
  '/',
  '/dashboard',
  '/static/fonts/',
  '/static/images/',
]

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHED_URLS)
    })
  )
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
}) 