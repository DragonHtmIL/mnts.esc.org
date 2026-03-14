function createEventCard(ev, key) {
  const div = document.createElement("div");
  div.className = "event-card";

  let sourceBtn = "";
  if (ev.link) {
    if(localStorage.getItem("lang") === "en") {
      sourceBtn = `<button class="source-btn" onclick="window.open('${ev.link}', '_blank')">Open Source</button>`;
    } else if(localStorage.getItem("lang") === "ru") {
      sourceBtn = `<button class="source-btn" onclick="window.open('${ev.link}', '_blank')">Открыть источник</button>`;
    } else if(localStorage.getItem("lang") === "he") {
      sourceBtn = `<button class="source-btn" onclick="window.open('${ev.link}', '_blank')">פתח מקור</button>`;
    }
  }

  const id = key.split('_')[1] || "";
  const posClass = localStorage.getItem("lang") === "he" ? "left" : "right";
  const idHtml = `<div class="event-id ${posClass}">${id}</div>`;

  if(localStorage.getItem("lang") === "en") {
  div.innerHTML = `
    ${idHtml}
    <h3>${ev.title}</h3>
    <p>${ev.desc || ""}</p>
    <small>For: ${ev.name || "-"}</small>
    <div class="countdown" data-date="${ev.date}">Calculating...</div>
      <div class="btns-container">
        ${sourceBtn}
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
  `;
  } else if(localStorage.getItem("lang") === "ru") {
    div.innerHTML = `
    ${idHtml}
    <h3>${ev.title}</h3>
    <p>${ev.desc || ""}</p>
    <small>Для: ${ev.name || "-"}</small>
    <div class="countdown" data-date="${ev.date}">Считаеца...</div>
      <div class="btns-container">
        ${sourceBtn}
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn">Удалить</button>
      </div>
  `;
  } else if(localStorage.getItem("lang") === "he") {
    div.innerHTML = `
    ${idHtml}
    <h3>${ev.title}</h3>
    <p>${ev.desc || ""}</p>
    <small>עבור: ${ev.name || "-"}</small>
    <div class="countdown" data-date="${ev.date}">מחשב...</div>
      <div class="btns-container">
        ${sourceBtn}
        <button class="edit-btn">לערוך</button>
        <button class="delete-btn">למחוק</button>
      </div>
  `;
   div.style.textAlign = "right";
   div.style.direction = "rtl";
  }
  div.querySelector(".edit-btn").onclick = () => {
    openEditModal(ev, key);
    document.body.style.overflow = "hidden";
  };
  div.querySelector(".delete-btn").onclick = () => {
    const confirmButtons = document.getElementById("confirmYes");
    const confirmNoButton = document.getElementById("confirmNo");
    const modalNotify = document.getElementById("modalNotify");
    const confirmButtonsContainer = document.querySelector(".confirm-buttons");
    const notificationTitle = document.getElementById("notificationTitle");
    const notificationMessage = document.getElementById("notificationMessage");
    const closeNotifyModal = document.getElementById("closeNotifyModal");

    div.classList.add("predelete");

    closeNotifyModal.style.display = "none";
    confirmButtonsContainer.style.display = "block";
    modalNotify.style.display = "block";
    document.body.style.overflow = "hidden";
    if(localStorage.getItem("lang") === "en") {
      notificationTitle.textContent = "Event Deletion";
      notificationMessage.textContent = "Delete this event?";
    } else if(localStorage.getItem("lang") === "ru") {
      notificationTitle.textContent = "Удаление события";
      notificationMessage.textContent = "Удалить это событие?";
    } else if(localStorage.getItem("lang") === "he") {
      notificationTitle.textContent = "מחיקת אירוע";
       notificationTitle.style.textAlign = "right";
      notificationMessage.textContent = "האם למחוק את האירוע הזה?";
       notificationMessage.style.textAlign = "right";
       notificationMessage.style.direction = "rtl";
    }
    confirmButtons.classList.add("red");
    confirmButtons.onclick = () => {
      localStorage.removeItem(key);
      renderEvents();
      confirmButtonsContainer.style.display = "none";
      modalNotify.style.display = "none";
      closeNotifyModal.style.display = "block";
      document.body.style.overflow = "auto";
      confirmButtons.classList.remove("red");
    }
    confirmNoButton.onclick = () => {
      div.classList.remove("predelete");
      confirmButtonsContainer.style.display = "none";
      modalNotify.style.display = "none";
      closeNotifyModal.style.display = "block";
      document.body.style.overflow = "auto";
      confirmButtons.classList.remove("red");
    }
  };
  return div;
}
