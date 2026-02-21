window.addEventListener("error", function() {
  modalNotify.style.display = "block";
  if(localStorage.getItem("lang") === "en") {
    document.getElementById("notificationTitle").textContent = "Error";
    document.getElementById("notificationMessage").textContent = "Something went wrong!";
  } else if(localStorage.getItem("lang") === "ru") {
    document.getElementById("notificationTitle").textContent = "Ошибка";
    document.getElementById("notificationMessage").textContent = "Что-то пошло не так!";
  } else if(localStorage.getItem("lang") === "he") {
    document.getElementById("notificationTitle").textContent = "שגיאה";
    document.getElementById("notificationMessage").textContent = "משהו השתבש!";
     document.getElementById("notificationTitle").style.textAlign = "right";
     document.getElementById("notificationTitle").style.direction = "rtl";
     document.getElementById("notificationMessage").style.textAlign = "right";
     document.getElementById("notificationMessage").style.direction = "rtl";
  }
});