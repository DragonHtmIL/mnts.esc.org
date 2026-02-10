function createEventCard(ev, key) {
  const div = document.createElement("div");
  div.className = "event-card";
  div.innerHTML = `
    <h3>${ev.title}</h3>
    <p>${ev.desc || ""}</p>
    <small>For: ${ev.game || "-"}</small>
    <div class="countdown" data-date="${ev.date}">Calculating...</div>
      <div class="btns-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
  `;
  div.querySelector(".edit-btn").onclick = () => {
    openEditModal(ev, key);
  };
  div.querySelector(".delete-btn").onclick = () => {
    if (confirm("Delete this event?")) {
      localStorage.removeItem(key);
      renderEvents();
    }
  };
  return div;
}