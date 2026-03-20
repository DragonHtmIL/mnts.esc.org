function openEditModal(ev, key) {
  editingKey = key;
  eventTitle.value = ev.title;
  eventDesc.value = ev.desc || "";
  eventDate.value = ev.date || "";
  eventName.value = ev.name || "";
  eventLink.value = ev.link || "";
  document.getElementById("eventAutoDelete").value = ev.autoDelete || 0;
  document.getElementById("eventImportant").checked = ev.important || false;

  const repeatCb = document.getElementById("eventRepeat");
  repeatCb.checked = ev.repeat || false;
  document.getElementById("repeatFrequency").value = ev.repeatFrequency || "day";
  document.getElementById("repeatTime").value = ev.repeatTime || "00:00";
  document.getElementById("repeatDay").value = ev.repeatDay || 1;
  document.getElementById("repeatMonth").value = ev.repeatMonth || 1;

  if (typeof toggleRepeatOptions === 'function') toggleRepeatOptions();

  modal.style.display = "flex";
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
  document.body.style.overflow = "hidden";
};

closeModal.onclick = () => {
  editingKey = null;
  modal.style.display = "none";
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventName.value = "";
  eventLink.value = "";
  document.getElementById("eventAutoDelete").value = 0;
  document.getElementById("eventImportant").checked = false;
  document.getElementById("eventRepeat").checked = false;
  document.getElementById("repeatFrequency").value = "day";
  document.getElementById("repeatTime").value = "00:00";
  document.getElementById("repeatDay").value = 1;
  document.getElementById("repeatMonth").value = 1;

  if (typeof toggleRepeatOptions === 'function') toggleRepeatOptions();

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
  document.body.style.overflow = "auto";
};