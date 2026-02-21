var GHPATH = '/mnts.esc.org';
var APP_PREFIX = 'gppwa_';
var VERSION = "0.1.0-21022026";
var URLS = [
  `${GHPATH}/index_data/scripts`,
  `${GHPATH}/index_data/scripts/apply_settings.js`,
  `${GHPATH}/index_data/scripts/check_settings_changes.js`,
  `${GHPATH}/index_data/scripts/create_event_card.js`,
  `${GHPATH}/index_data/scripts/export_data.js`,
  `${GHPATH}/index_data/scripts/get_next_event_index.js`,
  `${GHPATH}/index_data/scripts/import_data.js`,
  `${GHPATH}/index_data/scripts/languages_text_loader.js`,
  `${GHPATH}/index_data/scripts/mask_clicked.js`,
  `${GHPATH}/index_data/scripts/modal_edit.js`,
  `${GHPATH}/index_data/scripts/modals_closers.js`,
  `${GHPATH}/index_data/scripts/modals_openers.js`,
  `${GHPATH}/index_data/scripts/notifications.js`,
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
self.addEventListener('message', event => {
  const data = event.data;
  if (data && data.type === 'SHOW_NOTIFICATION') {
    const options = {
      body: data.body,
      icon: data.icon || `${GHPATH}/index_data/textures/system/freepik_7477497.png`,
      tag: data.tag || 'event-notif'
    };
    self.registration.showNotification(data.title, options);
  }
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({type: 'window'}).then(clientList => {
    if (clientList.length > 0) {
      clientList[0].focus();
    } else {
      clients.openWindow('/');
    }
  }));
});