function renderEvents() {
  const container = document.getElementById("eventsContainer");
  const emptyState = document.getElementById("emptyState");
  container.innerHTML = "";
  const keys = Object.keys(localStorage)
    .filter(key => key.startsWith("event_"))
    .sort((a, b) => Number(a.split("_")[1]) - Number(b.split("_")[1]));
  if (keys.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";
  keys.forEach(key => {
    const ev = JSON.parse(localStorage.getItem(key));
    container.appendChild(createEventCard(ev, key));
  });
}