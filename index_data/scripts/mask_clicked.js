document.getElementById("importButton").onclick = () => {
  const confirmButtons = document.getElementById("confirmYes");
  const confirmNoButton = document.getElementById("confirmNo");
  const modalNotify = document.getElementById("modalNotify");
  const confirmButtonsContainer = document.querySelector(".confirm-buttons");
  const notificationTitle = document.getElementById("notificationTitle");
  const notificationMessage = document.getElementById("notificationMessage");
  const closeNotifyModal = document.getElementById("closeNotifyModal");
  closeNotifyModal.style.display = "none";
  confirmButtonsContainer.style.display = "block";
  modalNotify.style.display = "block";
  if(localStorage.getItem("lang") === "en") {
    notificationTitle.textContent = "Before Upload";
    notificationMessage.textContent = "Are you sure?\nAll current events will replaced from the file.";
  } else if(localStorage.getItem("lang") === "ru") {
    notificationTitle.textContent = "Перед загрузкой";
    notificationMessage.textContent = "Вы уверены?\nВсе текущие события будут заменены из файла.";
  } else if(localStorage.getItem("lang") === "he") {
    notificationTitle.textContent = "לפני ההעלאה";
     notificationTitle.style.textAlign = "right";
    notificationMessage.textContent = "האם אתם בטוחים?\nכל האירועים הנוכחיים יוחלפו מהקובץ.";
     notificationMessage.style.textAlign = "right";
     notificationMessage.style.direction = "rtl";
  }
  confirmButtons.onclick = () => {
    confirmButtonsContainer.style.display = "none";
    modalNotify.style.display = "none";
    closeNotifyModal.style.display = "block";
    document.getElementById("importFile").click();
  }
  confirmNoButton.onclick = () => {
    confirmButtonsContainer.style.display = "none";
    modalNotify.style.display = "none";
    closeNotifyModal.style.display = "block";
  }  
};