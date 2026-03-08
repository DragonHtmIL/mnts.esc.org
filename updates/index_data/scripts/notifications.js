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
  if (window.Android) {
    const eventTime = new Date(ev.date).getTime();
    window.Android.scheduleNotification(t.title, `${t.body} ${ev.title}`, eventTime, !!ev.important);
  } else {
    if (Notification.permission === "granted") {
      new Notification(t.title, {
        body: `${t.body} ${ev.title}`,
        icon: "index_data/textures/system/freepik_7477497.png",
      });
    }
  }
}
function scheduleNotificationsForEvent(ev) {
  const now = Date.now();
  const eventTime = new Date(ev.date).getTime();
  const timeout = eventTime - now;
  if (timeout > 0) {
    if (window.Android) {
      const lang = localStorage.getItem("lang") || "en";
      const t = notifTextMap[lang];
      window.Android.scheduleNotification(t.title, `${t.body} ${ev.title}`, eventTime, !!ev.important);
      console.log("Scheduled via Android:", ev.title, "at", ev.date, "Important:", !!ev.important);
    } else {
      setTimeout(() => {
        showEventNotification(ev);
      }, timeout);
    }
  }
}
function scheduleAllNotifications(events) {
  if (!events) return;
  events.forEach(ev => scheduleNotificationsForEvent(ev));
}
function scheduleExistingEvents() {
  const keys = Object.keys(localStorage).filter(key => key.startsWith("event_"));
  keys.forEach(key => {
    try {
      const ev = JSON.parse(localStorage.getItem(key));
      scheduleNotificationsForEvent(ev);
    } catch (e) {
      console.error("Error parsing event for scheduling:", key, e);
    }
  });
}
requestNotificationPermission();
scheduleExistingEvents();
