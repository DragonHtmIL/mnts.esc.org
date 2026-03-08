setInterval(() => {
  document.querySelectorAll(".countdown").forEach(el => {
    const diff = new Date(el.dataset.date) - new Date();
    if (diff <= 0) {
      if(localStorage.getItem("lang") === "en") {
        el.textContent = "Started!";
      } else if(localStorage.getItem("lang") === "ru") {
        el.textContent = "Началось!";
      } else if(localStorage.getItem("lang") === "he") {
        el.textContent = "התחיל!";
         el.style.textAlign = "right";
         el.style.direction = "rtl";
      }
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    if(localStorage.getItem("lang") === "en") {
      el.textContent = "Starts in: " + `${d}d ${h}h ${m}m ${s}s` + "\n (" + el.dataset.date + ")";
    } else if(localStorage.getItem("lang") === "ru") {
      el.textContent = "Начинается через: " + `${d}д ${h}ч ${m}м ${s}с` + "\n (" + el.dataset.date + ")";
    } else if(localStorage.getItem("lang") === "he") {
      el.textContent = "מתחיל בעוד: " + `${d} ימים ${h} שעות ${m} דקות ${s} שניות` + "\n (" + el.dataset.date + ")";
       el.style.textAlign = "right";
       el.style.direction = "rtl";
    }
  });
}, 1000);