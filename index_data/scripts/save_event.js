saveEvent.onclick = () => {
  const title = eventTitle.value.trim();
  const desc = eventDesc.value.trim();
  const date = eventDate.value;
  const game = eventGame.value.trim();
  if (!title || !date) {
    alert("Title and date required");
    return;
  }
  const selectedDate = new Date(date);
  if (selectedDate <= new Date()) {
    alert("Please select a future date");
    return;
  };
  if (editingKey) {
    localStorage.setItem(editingKey, JSON.stringify(data));
    editingKey = null;
  } else {
    const index = getNextEventIndex();
    localStorage.setItem(`event_${index}`, JSON.stringify(data));
  }
  const index = getNextEventIndex();
  localStorage.setItem(
    `event_${index}`,
    JSON.stringify({ title, desc, date, game })
  );
  modal.style.display = "none";
  saveEvent.textContent = "Save";
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventGame.value = "";
  renderEvents();
};