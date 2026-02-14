saveEvent.onclick = () => {
  const title = eventTitle.value.trim();
  const desc = eventDesc.value.trim();
  const date = eventDate.value;
  const name = eventName.value.trim();
  if (!title || !date) {
    modalNotify.style.display = "block";
      if(localStorage.getItem("lang") === "en") {
        document.getElementById("notificationTitle").textContent = "Requiredsements missing";
        document.getElementById("notificationMessage").textContent = "Title and date are required!";
      } else if(localStorage.getItem("lang") === "ru") {
        document.getElementById("notificationTitle").textContent = "Отсутствуют обязательные";
        document.getElementById("notificationMessage").textContent = "Требуются название и дата!";
      } else if(localStorage.getItem("lang") === "he") {
        document.getElementById("notificationTitle").textContent = "חסרים נדרשים";
        document.getElementById("notificationMessage").textContent = "נדרש כותרת ותאריך!";
         document.getElementById("notificationTitle").style.textAlign = "right";
         document.getElementById("notificationTitle").style.direction = "rtl";
         document.getElementById("notificationMessage").style.textAlign = "right";
         document.getElementById("notificationMessage").style.direction = "rtl";
      }
    return;
  }
  const selectedDate = new Date(date);
  if (selectedDate <= new Date()) {
    modalNotify.style.display = "block";
      if(localStorage.getItem("lang") === "en") {
        document.getElementById("notificationTitle").textContent = "Invalid date";
        document.getElementById("notificationMessage").textContent = "Please select a future date!";
      } else if(localStorage.getItem("lang") === "ru") {
        document.getElementById("notificationTitle").textContent = "Неверная дата";
        document.getElementById("notificationMessage").textContent = "Пожалуйста, выберите будущую дату!";
      } else if(localStorage.getItem("lang") === "he") {
        document.getElementById("notificationTitle").textContent = "תאריך לא תקין";
        document.getElementById("notificationMessage").textContent = "אנא בחרו תאריך עתידי!";
         document.getElementById("notificationTitle").style.textAlign = "right";
         document.getElementById("notificationTitle").style.direction = "rtl";
         document.getElementById("notificationMessage").style.textAlign = "right";
         document.getElementById("notificationMessage").style.direction = "rtl";
      }
    return;
  };
  const data = { title, desc, date, name };
  if (editingKey) {
    localStorage.setItem(editingKey, JSON.stringify(data));
    editingKey = null;
  } else {
    const index = getNextEventIndex();
    localStorage.setItem(`event_${index}`, JSON.stringify(data));
  }
  modal.style.display = "none";
  if(localStorage.getItem("lang") === "en") {
    saveEvent.textContent = "Save";
  } else if(localStorage.getItem("lang") === "ru") {
    saveEvent.textContent = "Сохранить";
  } else if(localStorage.getItem("lang") === "he") {
    saveEvent.textContent = "לשמור";
  }
  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventName.value = "";
  renderEvents();
};