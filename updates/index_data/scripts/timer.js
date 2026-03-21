function updateCountdowns() {
  const now = new Date();
  const lang = localStorage.getItem("lang") || "en";

  const months_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const months_ru = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const months_he = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

  document.querySelectorAll(".event-card").forEach(card => {
    const key = card.dataset.key;
    if (!key) return;

    const evData = localStorage.getItem(key);
    if (!evData) return;

    const ev = JSON.parse(evData);
    const countdownEl = card.querySelector(".countdown");
    const deleteBtn = card.querySelector(".delete-btn");

    if (ev.repeat) {
      let repeatText = "";
      if (lang === "en") {
        if (ev.repeatFrequency === "day") {
          repeatText = `Every day at: ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "month") {
          repeatText = `Every month at: ${ev.repeatDay} ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "year") {
          repeatText = `Every year at: ${months_en[ev.repeatMonth - 1]} ${ev.repeatDay} ${ev.repeatTime}`;
        }
      } else if (lang === "ru") {
        if (ev.repeatFrequency === "day") {
          repeatText = `Каждый день в: ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "month") {
          repeatText = `Каждый месяц: ${ev.repeatDay} в ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "year") {
          repeatText = `Каждый год: ${months_ru[ev.repeatMonth - 1]} ${ev.repeatDay} в ${ev.repeatTime}`;
        }
      } else if (lang === "he") {
        if (ev.repeatFrequency === "day") {
          repeatText = `כל יום בשעה: ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "month") {
          repeatText = `כל חודש ב: ${ev.repeatDay} בשעה ${ev.repeatTime}`;
        } else if (ev.repeatFrequency === "year") {
          repeatText = `כל שנה ב: ${months_he[ev.repeatMonth - 1]} ${ev.repeatDay} בשעה ${ev.repeatTime}`;
        }
        countdownEl.style.textAlign = "right";
        countdownEl.style.direction = "rtl";
      }
      countdownEl.textContent = repeatText;

      // Repeating events don't auto-delete based on timer logic usually,
      // but we ensure the delete button has default text
      if (lang === "en") deleteBtn.textContent = "Delete";
      else if (lang === "ru") deleteBtn.textContent = "Удалить";
      else if (lang === "he") deleteBtn.textContent = "למחוק";

      return; // Skip normal countdown logic
    }

    // Normal Event Countdown Logic
    const eventDate = new Date(ev.date);
    const diff = eventDate - now;
    if (diff <= 0) {
      if(lang === "en") {
        countdownEl.textContent = "Started!";
      } else if(lang === "ru") {
        countdownEl.textContent = "Началось!";
      } else if(lang === "he") {
        countdownEl.textContent = "התחיל!";
         countdownEl.style.textAlign = "right";
         countdownEl.style.direction = "rtl";
      }
    } else {
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      if(lang === "en") {
        countdownEl.textContent = "Starts in: " + `${d}d ${h}h ${m}m ${s}s` + "\n (" + ev.date + ")";
      } else if(lang === "ru") {
        countdownEl.textContent = "Начинается через: " + `${d}д ${h}ч ${m}м ${s}с` + "\n (" + ev.date + ")";
      } else if(lang === "he") {
        countdownEl.textContent = "מתחיל בעוד: " + `${d} ימים ${h} שעות ${m} דקות ${s} שניות` + "\n (" + ev.date + ")";
         countdownEl.style.textAlign = "right";
         countdownEl.style.direction = "rtl";
      }
    }

    // Auto Delete Logic for normal events
    if (ev.autoDelete && ev.autoDelete > 0) {
      const deleteTime = new Date(eventDate.getTime() + ev.autoDelete * 3600000);
      const remainingDelete = deleteTime - now;

      if (remainingDelete <= 0) {
        localStorage.removeItem(key);
        if (typeof renderEvents === 'function') renderEvents();
        return;
      }

      let deleteText = "";
      if (lang === "en") deleteText = "Delete";
      else if (lang === "ru") deleteText = "Удалить";
      else if (lang === "he") deleteText = "למחוק";

      const rd = Math.floor(remainingDelete / 86400000);
      const rh = Math.floor(remainingDelete / 3600000);
      const rm = Math.floor(remainingDelete / 60000);

      if (rd >= 1) {
        deleteBtn.textContent = `${deleteText} (${rd}d)`;
      } else if (rh >= 1) {
        deleteBtn.textContent = `${deleteText} (${rh}h)`;
      } else {
        deleteBtn.textContent = `${deleteText} (${rm}m)`;
      }
    } else {
        const lang = localStorage.getItem("lang");
        if (lang === "en") deleteBtn.textContent = "Delete";
        else if (lang === "ru") deleteBtn.textContent = "Удалить";
        else if (lang === "he") deleteBtn.textContent = "למחוק";
    }
  });
}