import {NavigationRoute, registerRoute, setDefaultHandler} from "workbox-routing";
import {createHandlerBoundToURL, precacheAndRoute} from "workbox-precaching";
import {CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";
import {CacheableResponsePlugin} from "workbox-cacheable-response";

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

const DEBUG = "__buildEnv__" === "dev";

const API_ROUTES_DEV = {
    auth: /\/auth\//,
    userSettings: /\/userSettings\//,
    substitutionPlan: /\/substitutionPlan\//,
    file: /\/file\//,
    fileGet: /\/file\/get/,
};

const API_ROUTES_PROD = {
    auth: /\/api\/auth\//,
    userSettings: /\/api\/userSettings\//,
    substitutionPlan: /\/api\/substitutionPlan\//,
    file: /\/api\/file\//,
    fileGet: /\/api\/file\/get/,
};

const API_ROUTES = DEBUG ? API_ROUTES_DEV : API_ROUTES_PROD;

precacheAndRoute(self.__WB_MANIFEST);

const defaultStrategy = new CacheFirst({
    cacheName: "vt-default",
    plugins: [
        new ExpirationPlugin({
            maxEntries: 128,
            maxAgeSeconds: 7 * 24 * 60 * 60,
            purgeOnQuotaError: true
        }),
        new CacheableResponsePlugin({
            statuses: [0, 200]
        })
    ],
});
setDefaultHandler(
    (args) => {
        if (args.event.request.method === 'GET') {
            return defaultStrategy.handle(args);
        }

        return fetch(args.event.request);
    }
);

const spaHandler = createHandlerBoundToURL("/index.html");
const spaNavigationRoute = new NavigationRoute(spaHandler, {
    allowlist: [],
    denylist: [API_ROUTES.auth, API_ROUTES.userSettings, API_ROUTES.substitutionPlan, API_ROUTES.file]
});
registerRoute(spaNavigationRoute);

registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
    new CacheFirst({
        cacheName: 'vt-images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);

//API Calls
registerRoute(
    API_ROUTES.auth,
    new NetworkOnly()
);
registerRoute(
    API_ROUTES.userSettings,
    new NetworkOnly()
);
registerRoute(
    API_ROUTES.substitutionPlan,
    new NetworkFirst()
);
registerRoute(
    API_ROUTES.fileGet,
    new CacheFirst({
        cacheName: 'vt-files',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 10,
                maxEntries: 30,
            }),
        ],
    })
);
registerRoute(
    API_ROUTES.file,
    new NetworkFirst()
);

//Fonts from Google
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);