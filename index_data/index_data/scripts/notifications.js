const notifTextMap = {
  en: { title: "Event started!", body: "Your event is happening now:" },
  ru: { title: "Событие началось!", body: "Ваше событие начинается сейчас:" },
  he: { title: "האירוע התחיל!", body: "האירוע שלך מתחיל עכשיו:" }
};
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      console.log("Notification permission:", permission);
    });
  }
}
function showEventNotification(ev) {
  const lang = localStorage.getItem("lang") || "en";
  const t = notifTextMap[lang];

  if (Notification.permission === "granted") {
    new Notification(t.title, {
      body: `${t.body} ${ev.title}`,
      icon: "index_data/textures/system/freepik_7477497.png",
    });
  }
  if (navigator.serviceWorker && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(reg => {
      if (reg.active) {
        reg.active.postMessage({
          type: 'SHOW_NOTIFICATION',
          title: t.title,
          body: `${t.body} ${ev.title}`,
          icon: 'icon.png',
          tag: `event-${ev.id || Math.random()}`
        });
      }
    });
  }
}
function scheduleNotificationsForEvent(ev) {
  const now = Date.now();
  let nextTime;
  nextTime = ev.date;
  const timeout = nextTime - now;
  if (timeout > 0) {
    setTimeout(() => {
      showEventNotification(ev);
    }, timeout);
  }
}
function scheduleAllNotifications(events) {
  events.forEach(ev => scheduleNotificationsForEvent(ev));
}
requestNotificationPermission();
scheduleAllNotifications(events);