function openEditModal(ev, key) {
  editingKey = key;
  eventTitle.value = ev.title;
  eventDesc.value = ev.desc || "";
  eventDate.value = ev.date;
  eventGame.value = ev.game || "";
  saveEvent.textContent = "Save Changes";
  modal.style.display = "block";
};
closeModal.onclick = () => {
  editingKey = null;
  saveEvent.textContent = "Save";
  modal.style.display = "none";
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventGame.value = "";
};