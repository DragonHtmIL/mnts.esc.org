function renderEvents() {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";
  Object.keys(localStorage)
    .filter(key => key.startsWith("event_"))
    .sort((a,b) => Number(a.split("_")[1]) - Number(b.split("_")[1]))
    .forEach(key => {
      const ev = JSON.parse(localStorage.getItem(key));
      container.appendChild(createEventCard(ev, key));
    });
}