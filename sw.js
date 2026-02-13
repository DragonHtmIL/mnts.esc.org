var GHPATH = '/mnts.esc.org';
var APP_PREFIX = 'gppwa_';
var VERSION = "0.0.6-13022026-pre-1";
var URLS = [
  `${GHPATH}/index_data/scripts`,
  `${GHPATH}/index_data/scripts/apply_settings.js`,
  `${GHPATH}/index_data/scripts/check_settings_changes.js`,
  `${GHPATH}/index_data/scripts/create_event_card.js`,
  `${GHPATH}/index_data/scripts/get_next_event_index.js`,
  `${GHPATH}/index_data/scripts/languages_text_loader.js`,
  `${GHPATH}/index_data/scripts/modal_edit.js`,
  `${GHPATH}/index_data/scripts/modal_event.js`,
  `${GHPATH}/index_data/scripts/modal_infouse.js`,
  `${GHPATH}/index_data/scripts/modal_notifications.js`,
  `${GHPATH}/index_data/scripts/modal_settings.js`,
  `${GHPATH}/index_data/scripts/open_modal.js`,
  `${GHPATH}/index_data/scripts/registrations.js`,
  `${GHPATH}/index_data/scripts/render_events.js`,
  `${GHPATH}/index_data/scripts/save_event.js`,
  `${GHPATH}/index_data/scripts/set_languages_buttons_active.js`,
  `${GHPATH}/index_data/scripts/timer.js`,

  `${GHPATH}/index_data/scripts/window`,
  `${GHPATH}/index_data/scripts/window/dom_content_loaded.js`,
  `${GHPATH}/index_data/scripts/window/error.js`,
  `${GHPATH}/index_data/scripts/window/load.js`,

  `${GHPATH}/index_data/styles`,
  `${GHPATH}/index_data/styles/roots.css`,
  `${GHPATH}/index_data/styles/styles.css`,

  `${GHPATH}/index_data/textures`,
  `${GHPATH}/index_data/textures/info.png`,
  `${GHPATH}/index_data/textures/info_filled.png`,
  `${GHPATH}/index_data/textures/setting.png`,
  `${GHPATH}/index_data/textures/setting_filled.png`,

  `${GHPATH}/index_data/textures/system`,
  `${GHPATH}/index_data/textures/system/freepik_7477497.png`,

  `${GHPATH}/index_data`,
  `${GHPATH}/manifest.webmanifest`
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