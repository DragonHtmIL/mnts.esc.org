saveEvent.onclick = () => {
  const title = eventTitle.value.trim();
  const desc = eventDesc.value.trim();
  const date = eventDate.value;
  const game = eventGame.value.trim();
  if (!title || !date) {
    alert("Title and date required");
    return;
  }
  const index = getNextEventIndex();
  localStorage.setItem(
    `event_${index}`,
    JSON.stringify({ title, desc, date, game })
  );
  modal.style.display = "none";
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventGame.value = "";
  renderEvents();
};