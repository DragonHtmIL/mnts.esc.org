function openEditModal(ev, key) {
  editingKey = key;
  eventTitle.value = ev.title;
  eventDesc.value = ev.desc || "";
  eventDate.value = ev.date;
  eventName.value = ev.name || "";
  modal.style.display = "block";
  if(localStorage.getItem("lang") === "en") {
    saveEvent.textContent = "Save Changes";
    modalTitle.textContent = "Edit Event";
  } else if(localStorage.getItem("lang") === "ru") {
    saveEvent.textContent = "Сохранить изменения";
    modalTitle.textContent = "Редактировать событие";
  } else if(localStorage.getItem("lang") === "he") {
    saveEvent.textContent = "לשמור שינויים";
    modalTitle.textContent = "לערוך אירוע";
  }
};
closeModal.onclick = () => {
  editingKey = null;
  modal.style.display = "none";
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventName.value = "";
  if(localStorage.getItem("lang") === "en") {
    saveEvent.textContent = "Save";
    modalTitle.textContent = "Create Event";
  } else if(localStorage.getItem("lang") === "ru") {
    saveEvent.textContent = "Сохранить";
    modalTitle.textContent = "Создать событие";
  } else if(localStorage.getItem("lang") === "he") {
    saveEvent.textContent = "לשמור";
    modalTitle.textContent = "לצור אירוע";
  }
};