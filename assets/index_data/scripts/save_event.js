saveEvent.onclick = () => {
  const title = eventTitle.value.trim();
  const desc = eventDesc.value.trim();
  const date = eventDate.value;
  const name = eventName.value.trim();
  const link = eventLink.value.trim();
  const autoDelete = parseInt(document.getElementById("eventAutoDelete").value) || 0;
  const important = document.getElementById("eventImportant").checked;
  const repeat = document.getElementById("eventRepeat").checked;
  const repeatFrequency = document.getElementById("repeatFrequency").value;
  const repeatTime = document.getElementById("repeatTime").value;
  const repeatDay = parseInt(document.getElementById("repeatDay").value) || 1;
  const repeatMonth = parseInt(document.getElementById("repeatMonth").value) || 1;

  if (!title || (!repeat && !date)) {
    modalNotify.style.display = "flex";
    const lang = localStorage.getItem("lang");
    if(lang === "en") {
      document.getElementById("notificationTitle").textContent = "Required fields missing";
      document.getElementById("notificationMessage").textContent = "Title and date are required!";
    } else if(lang === "ru") {
      document.getElementById("notificationTitle").textContent = "Отсутствуют обязательные поля";
      document.getElementById("notificationMessage").textContent = "Требуются название и дата!";
    } else if(lang === "he") {
      document.getElementById("notificationTitle").textContent = "חסרים שדות חובה";
      document.getElementById("notificationMessage").textContent = "נדרש כותרת ותאריך!";
       document.getElementById("notificationTitle").style.textAlign = "right";
       document.getElementById("notificationTitle").style.direction = "rtl";
       document.getElementById("notificationMessage").style.textAlign = "right";
       document.getElementById("notificationMessage").style.direction = "rtl";
    }
    return;
  }

  if (!repeat) {
    const selectedDate = new Date(date);
    if (selectedDate <= new Date()) {
      modalNotify.style.display = "flex";
      const lang = localStorage.getItem("lang");
      if(lang === "en") {
        document.getElementById("notificationTitle").textContent = "Invalid date";
        document.getElementById("notificationMessage").textContent = "Please select a future date!";
      } else if(lang === "ru") {
        document.getElementById("notificationTitle").textContent = "Неверная дата";
        document.getElementById("notificationMessage").textContent = "Пожалуйста, выберите будущую дату!";
      } else if(lang === "he") {
        document.getElementById("notificationTitle").textContent = "תאריך לא תקין";
        document.getElementById("notificationMessage").textContent = "אנא בחרו תאריך עתידי!";
         document.getElementById("notificationTitle").style.textAlign = "right";
         document.getElementById("notificationTitle").style.direction = "rtl";
         document.getElementById("notificationMessage").style.textAlign = "right";
         document.getElementById("notificationMessage").style.direction = "rtl";
      }
      return;
    };
  }

  const data = {
    title, desc, date: repeat ? "" : date, name, link, autoDelete, important,
    repeat, repeatFrequency, repeatTime, repeatDay, repeatMonth
  };

  if (editingKey) {
    localStorage.setItem(editingKey, JSON.stringify(data));
    editingKey = null;
  } else {
    const index = getNextEventIndex();
    localStorage.setItem(`event_${index}`, JSON.stringify(data));
  }

  if (typeof scheduleNotificationsForEvent === 'function' && !repeat) {
    scheduleNotificationsForEvent(data);
  }

  modal.style.display = "none";
  document.body.style.overflow = "auto";

  const lang = localStorage.getItem("lang");
  if(lang === "en") {
    saveEvent.textContent = "Save";
  } else if(lang === "ru") {
    saveEvent.textContent = "Сохранить";
  } else if(lang === "he") {
    saveEvent.textContent = "לשמור";
  }

  eventTitle.value = "";
  eventDesc.value = "";
  eventDate.value = "";
  eventName.value = "";
  eventLink.value = "";
  document.getElementById("eventAutoDelete").value = 0;
  document.getElementById("eventImportant").checked = false;
  document.getElementById("eventRepeat").checked = false;
  document.getElementById("repeatTime").value = "00:00";
  document.getElementById("repeatDay").value = 1;
  document.getElementById("repeatMonth").value = 1;
  if (typeof toggleRepeatOptions === 'function') toggleRepeatOptions();
  renderEvents();
};