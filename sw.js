var GHPATH = '/mnts.esc.org';
var APP_PREFIX = 'gppwa_';
var VERSION = "0.0.3-05022026";
var URLS = [
  `${GHPATH}/index_data/scripts`,
  `${GHPATH}/index_data/scripts/create_event_card.js`,
  `${GHPATH}/index_data/scripts/get_next_event_index.js`,
  `${GHPATH}/index_data/scripts/modal_errors.js`,
  `${GHPATH}/index_data/scripts/modal_event.js`,
  `${GHPATH}/index_data/scripts/modal_infouse.js`,
  `${GHPATH}/index_data/scripts/open_modal.js`,
  `${GHPATH}/index_data/scripts/registrations.js`,
  `${GHPATH}/index_data/scripts/render_events.js`,
  `${GHPATH}/index_data/scripts/save_event.js`,
  `${GHPATH}/index_data/scripts/timer.js`,
  `${GHPATH}/index_data/scripts/timers`,
  `${GHPATH}/index_data/scripts/window`,
  `${GHPATH}/index_data/scripts/window/error.js`,
  `${GHPATH}/index_data/scripts/window/dom_content_loaded.js`,
  `${GHPATH}/index_data/styles`,
  `${GHPATH}/index_data/styles/events.css`,
  `${GHPATH}/index_data/styles/main.css`,
  `${GHPATH}/index_data/styles/modal.css`,
  `${GHPATH}/index_data/styles/roots.css`,
  `${GHPATH}/index_data/textures`,
  `${GHPATH}/index_data/textures/system`,
  `${GHPATH}/index_data/textures/system/freepik_7477497.png`,
  `${GHPATH}/index_data`,
  `${GHPATH}/index.html`
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(URLS)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    if (response) {
      return response;
    }
    return fetch(event.request);
    })
  );
});