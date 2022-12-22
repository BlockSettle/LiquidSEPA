const serviceWorker = {};

const staticCacheName = 's-cache_data_2';
const dynamicCacheName = 'd-cache_data_2';

const assetsUrls = [
  'index.html',
  'favicon.ico',
  'brand.svg',
  'brand-dark.png',
  'static/fonts/Rubik-Bold.ttf',
  'static/fonts/Rubik-Light.ttf',
  'static/fonts/Rubik-Medium.ttf',
  'static/fonts/Rubik-Regular.ttf',
  'static/js/bundle.js',
  'static/js/main.chunk.js',
  'static/js/vendors~main.chunk.js',
  'static/media/app-icon-100-100.png',
  'static/media/app-icon-96-96.png',
  'static/media/app-icon-144-144.png',
  'static/media/app-icon-256-256.png',
  'static/media/app-icon-512-512.png',
  'static/media/home-background.png',
  'static/logo.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(assetsUrls);
      })
      .catch((error) => console.error(error))
  );
});

self.addEventListener('activate', async (event) => {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter((name) => name !== staticCacheName)
        .map((name) => caches.delete(name))
    );
  } catch (error) {
    console.error(error);
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (location.origin === url.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(req) {
  try {
    const cached = await caches.match(req);
    return cached ?? (await fetch(req));
  } catch (error) {
    console.error(error);
  }
}

async function networkFirst(req) {
  let cache;
  caches
    .open(dynamicCacheName)
    .then((c) => (cache = c))
    .catch((error) => console.log(`Error: ${error}`));

  try {
    const response = await fetch(req.url);
    await cache.put(req, response.clone());

    return response;
  } catch (error) {
    try {
      const cached = await cache.match(req.url);
    } catch (err) {
      console.error(err);
    }
    // or create offline html file?
    return cached ?? caches.match('/index.html');
  }
}
