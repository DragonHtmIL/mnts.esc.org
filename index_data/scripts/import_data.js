document.getElementById("importFile").addEventListener("change", function () {
  const file = this.files[0];
  const modalNotify = document.getElementById("modalNotify");
  const notificationTitle = document.getElementById("notificationTitle");
  const notificationMessage = document.getElementById("notificationMessage");
  const closeNotifyModal = document.getElementById("closeNotifyModal");
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);
      Object.keys(importedData).forEach(key => {
        localStorage.setItem(key, JSON.stringify(importedData[key]));
      });
      renderEvents();
      closeNotifyModal.style.display = "block";
      modalNotify.style.display = "block";
      if(localStorage.getItem("lang") === "en") {
        notificationTitle.textContent = "Import";
        notificationMessage.textContent = "Events imported successfully!";
      } else if(localStorage.getItem("lang") === "ru") {
        notificationTitle.textContent = "Импорт";
        notificationMessage.textContent = "События успешно импортированы!";
      } else if(localStorage.getItem("lang") === "he") {
        notificationTitle.textContent = "ייבוא";
         notificationTitle.style.textAlign = "right";
        notificationMessage.textContent = "האירועים הובאו בהצלחה!";
         notificationMessage.style.textAlign = "right";
         notificationMessage.style.direction = "rtl";
      }
      closeNotifyModal.onclick = () => {
        modalNotify.style.display = "none";
      }
    } catch (err) {
      closeNotifyModal.style.display = "block";
      modalNotify.style.display = "block";
      if(localStorage.getItem("lang") === "en") {
        notificationTitle.textContent = "Invalid";
        notificationMessage.textContent = "The file format is invalid .json.";
      } else if(localStorage.getItem("lang") === "ru") {
        notificationTitle.textContent = "Недопустимо";
        notificationMessage.textContent = "Формат файла .json недопустим.";
      } else if(localStorage.getItem("lang") === "he") {
        notificationTitle.textContent = "לא תקין";
         notificationTitle.style.textAlign = "right";
        notificationMessage.textContent = "פורמט הקובץ אינו .json תקין.";
         notificationMessage.style.textAlign = "right";
         notificationMessage.style.direction = "rtl";
      }
      closeNotifyModal.onclick = () => {
        modalNotify.style.display = "none";
      }
    }
  };
  reader.readAsText(file);
});