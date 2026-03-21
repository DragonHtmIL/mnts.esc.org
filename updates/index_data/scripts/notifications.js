const notifTextMap = {
  en: { title: "Event started!", body: "Your event is happening now:" },
  ru: { title: "Событие началось!", body: "Ваше событие начинается сейчас:" },
  he: { title: "האירוע התחיל!", body: "האירוע שלך מתחיל עכשיו:" }
};

function getNextOccurrence(ev) {
  const now = new Date();
  const [hours, minutes] = ev.repeatTime.split(':').map(Number);
  let target = new Date(now);
  target.setHours(hours, minutes, 0, 0);

  if (ev.repeatFrequency === 'day') {
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }
  } else if (ev.repeatFrequency === 'month') {
    target.setDate(ev.repeatDay);
    if (target <= now) {
      target.setMonth(target.getMonth() + 1);
    }
  } else if (ev.repeatFrequency === 'year') {
    target.setMonth(ev.repeatMonth - 1);
    target.setDate(ev.repeatDay);
    if (target <= now) {
      target.setFullYear(target.getFullYear() + 1);
    }
  }
  return target.getTime();
}

function scheduleNotificationsForEvent(ev) {
  const now = Date.now();
  let eventTime;

  if (ev.repeat) {
    eventTime = getNextOccurrence(ev);
  } else {
    eventTime = new Date(ev.date).getTime();
  }

  const timeout = eventTime - now;
  if (timeout > 0) {
    if (window.Android) {
      const lang = localStorage.getItem("lang") || "en";
      const t = notifTextMap[lang];
      window.Android.scheduleNotification(t.title, `${t.body} ${ev.title}`, eventTime, !!ev.important);
      console.log("Scheduled:", ev.title, "at", new Date(eventTime).toLocaleString());
    } else {
      setTimeout(() => {
        const lang = localStorage.getItem("lang") || "en";
        const t = notifTextMap[lang];
        if (Notification.permission === "granted") {
          new Notification(t.title, { body: `${t.body} ${ev.title}` });
        }
      }, timeout);
    }
  }
}

function scheduleExistingEvents() {
  const keys = Object.keys(localStorage).filter(key => key.startsWith("event_"));
  keys.forEach(key => {
    try {
      const ev = JSON.parse(localStorage.getItem(key));
      scheduleNotificationsForEvent(ev);
    } catch (e) {
      console.error("Error scheduling:", key, e);
    }
  });
}

function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

requestNotificationPermission();
scheduleExistingEvents();
