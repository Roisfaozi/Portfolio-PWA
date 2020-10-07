const CACHE_NAME = "fristpwa-v4";
let urlToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/sw-register.js",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/services.html",
    "/pages/portofolio.html",
    "/css/materialize.min.css",
    "/css/custom.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/font/Roboto-Black.ttf",
    "/font/Roboto-Bold.ttf",
    "/font/Roboto-Italic.ttf",
    "/font/Roboto-Light.ttf",
    "/font/Roboto-Medium.ttf",
    "/font/Roboto-Regular.ttf",
    "/font/Roboto-Thin.ttf",
    "/img/camera.png",
    "/img/icons.png",
    "/img/graphic-design.png",
    "/img/space.jpg",
    "/img/web.png",
    "/img/Tumbnanil.jpg",
    "/img/communication.png",
    "/img/weather.png",
    "/img/jumbotron.jpg",
    "/img/medical.jpg",
    "/img/profile.jpg",
    "/icon-512.png",
    "/icon-192.png",
    "/icon-384.png",
    "/icon-256.png",
    "/manifest.json"
];

self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then((response) => {
                if (response) {
                    console.log("ServiceWorker: Gunakan dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: ", event.request.url);
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("serviceWorker: cache" + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});