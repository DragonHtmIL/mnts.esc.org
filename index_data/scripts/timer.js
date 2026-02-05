setInterval(() => {
  document.querySelectorAll(".countdown").forEach(el => {
    const diff = new Date(el.dataset.date) - new Date();
    if (diff <= 0) {
      el.textContent = "Started!";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    el.textContent = "Started in: " + `${d}d ${h}h ${m}m ${s}s`;
  });
}, 1000);