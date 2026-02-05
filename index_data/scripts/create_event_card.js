function createEventCard(ev, key) {
  const div = document.createElement("div");
  div.className = "event-card";
  div.innerHTML = `
    <h3>${ev.title}</h3>
    <p>${ev.desc || ""}</p>
    <small>Game: ${ev.game || "-"}</small>
    <div class="countdown" data-date="${ev.date}">Calculating...</div>
    <button class="delete-btn">Delete</button>
  `;
  div.querySelector(".delete-btn").onclick = () => {
    if (confirm("Delete this event?")) {
      localStorage.removeItem(key);
      renderEvents();
    }
  };
  return div;
}