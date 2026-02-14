function loadTexts() {
  var a000 = document.getElementById("title");
  var a001 = document.getElementById("exportEvents");
  var a002 = document.getElementById("settingsHeaderTitle");
  var a003 = document.getElementById("langs");
  var a004 = document.getElementById("english");
  var a005 = document.getElementById("russian");
  var a006 = document.getElementById("hebrew");
  var a007 = document.getElementById("requiredText");
  var a008 = document.getElementById("eventTitle");
  var a009 = document.getElementById("eventDesc");
  var a010 = document.getElementById("eventName");
  var a011 = document.getElementById("useInfoText");
  var a012 = document.getElementById("importButton");
  var a013 = document.getElementById("emptyTextp");
  var a014 = document.getElementById("emptyTextSmall");
  var a015 = document.getElementById("modalTitle");
  // consts //
  const dateInput = document.getElementById("eventDate");
  // Sets//
  const a000_set = document.getElementsByClassName("close-text");
  const a001_set = document.getElementsByClassName("cancel-text");
  const a002_set = document.getElementsByClassName("save-text");
  const a003_set = document.getElementsByClassName("apply-text");
  const a004_set = document.getElementsByClassName("yes-text");
  const a005_set = document.getElementsByClassName("no-text");
  if(localStorage.getItem("lang") === "en") {
    a000.innerHTML = "Event Creator";
    a001.innerHTML = "Export Events in File";
    a002.innerHTML = "Settings";
    a003.innerHTML = "Languages";
    a004.innerHTML = "English";
    a005.innerHTML = "Russian<br>(Русский)";
    a006.innerHTML = "Hebrew<br>(עברית)";
    a007.innerHTML = "(required)";
     eventDate.style.width = "calc(100% - 96px)";
    a008.placeholder = "Title";
    a009.placeholder = "Description (optional)";
    a010.placeholder = "Anime/Game/Manga/Manhua/Company Name (optional)";
    a011.innerHTML = "About this site:<br>";
    a011.innerHTML += "This site allows you to create and manage countdown events for your favorite games or anime releases. You can add events with titles, descriptions, dates, and associated game or anime names. The events will be displayed with a live countdown timer.<br>";
    a011.innerHTML += "This project is gen by AI and is open source. You can find the source code on <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
    a011.innerHTML += "<hr><p><strong>Note:</strong> Events are stored in your browser's local storage, so they will persist until you clear it or delete them manually.<br> and removed events cannot be recovered.</p>";
    a012.innerHTML = "Import Events from File";
    a013.innerHTML = "No events yet";
    a014.innerHTML = "Create your event to get started";
    a015.innerHTML = "Create Event";
    /////////////////////////////////Sets/////////////////////////////////
    for (let i = 0; i < a000_set.length; i++) {
      a000_set[i].textContent = "Close";
    }
    for (let i = 0; i < a001_set.length; i++) {
      a001_set[i].textContent = "Cancel";
    }
    for (let i = 0; i < a002_set.length; i++) {
      a002_set[i].textContent = "Save";
    }
    for (let i = 0; i < a003_set.length; i++) {
      a003_set[i].textContent = "Apply";
    }
    for (let i = 0; i < a004_set.length; i++) {
      a004_set[i].textContent = "Yes";
    }
    for (let i = 0; i < a005_set.length; i++) {
      a005_set[i].textContent = "No";
    }
    a004.classList.add("active");
  }else
  if(localStorage.getItem("lang") === "ru") {
    a000.innerHTML = "Создатель событий";
    a001.innerHTML = "Экспорт событий в файл";
    a002.innerHTML = "Настройки";
    a003.innerHTML = "Языки";
    a004.innerHTML = "Английский<br>(English)";
    a005.innerHTML = "Русский";
    a006.innerHTML = "Иврит<br>(עברית)";
    a007.innerHTML = "(обязательно)";
     eventDate.style.width = "calc(100% - 130px)";
    a008.placeholder = "Название";
    a009.placeholder = "Описание (необязательно)";
    a010.placeholder = "Название аниме/игры/Манга/Манхуа/Компания (необязательно)";
    a011.innerHTML = "О сайте:<br>";
    a011.innerHTML += "Этот сайт позволяет создавать и управлять событиями обратного отсчета для ваших любимых игр или релизов аниме. Вы можете добавлять события с названиями, описаниями, датами и связанными названиями игр или аниме. События будут отображаться с живым таймером обратного отсчета.<br>";
    a011.innerHTML += "Этот проект сгенерирован ИИ и является открытым исходным кодом. Вы можете найти исходный код на <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
    a011.innerHTML += "<hr><p><strong>Примечание:</strong> События хранятся в локальном хранилище вашего браузера, поэтому они будут сохраняться, пока вы не очистите его или не удалите их вручную.<br> и удаленные события не могут быть восстановлены.</p>";
    a012.innerHTML = "Импорт событий из файла";
    a013.innerHTML = "Пока нет событий";
    a014.innerHTML = "Создайте свое событие, чтобы начать";
    a015.innerHTML = "Создать событие";
    /////////////////////////////////Sets/////////////////////////////////
    for (let i = 0; i < a000_set.length; i++) {
      a000_set[i].textContent = "Закрыть";
    }
    for (let i = 0; i < a001_set.length; i++) {
      a001_set[i].textContent = "Отменить";
    }
    for (let i = 0; i < a002_set.length; i++) {
      a002_set[i].textContent = "Сохранить";
    }
    for (let i = 0; i < a003_set.length; i++) {
      a003_set[i].textContent = "Применить";
    }
    for (let i = 0; i < a004_set.length; i++) {
      a004_set[i].textContent = "Да";
    }
    for (let i = 0; i < a005_set.length; i++) {
      a005_set[i].textContent = "Нет";
    }
    a005.classList.add("active");
  }else
  if(localStorage.getItem("lang") === "he") {
    a000.innerHTML = "יוצר אירועים";
     document.getElementsByTagName("header")[0].style.direction = "rtl";
     document.getElementsByTagName("header")[0].style.paddingRight = "20px";
     document.getElementsByTagName("header")[0].style.paddingLeft = "0px";
    a001.innerHTML = "ייצוא אירועים בקובץ";
    a002.innerHTML = "הגדרות";
     a002.style.textAlign = "right";
    a003.innerHTML = "שפות";
     a003.style.textAlign = "right";
    a004.innerHTML = "אנגלית<br>(English)";
     a004.style.direction = "rtl";
    a005.innerHTML = "רוסית<br>(Русский)";
     a005.style.direction = "rtl";
    a006.innerHTML = "עברית";
    a007.innerHTML = "(נדרש)";
     eventDate.style.width = "calc(100% - 70px)";
    a008.placeholder = "כותרת";
     a008.style.textAlign = "right";
    a009.placeholder = "תיאור (אופציונלי)";
     a009.style.textAlign = "right";
    a010.placeholder = "שם אנימה/משחק/מנגה/מנחואה/חברה (אופציונלי)";
     a010.style.textAlign = "right";
    a011.innerHTML = "על האתר הזה:<br>";
    a011.innerHTML += "אתר זה מאפשר לכם ליצור ולנהל אירועי ספירה לאחור למשחקים האהובים עליכם או להוצאות אנימה. אתם יכולים להוסיף אירועים עם כותרות, תיאורים, תאריכים ושמות משחקים או אנימה קשורים. האירועים יוצגו עם טיימר ספירה לאחור חי.<br>";
    a011.innerHTML += "פרויקט זה נוצר על ידי AI והוא קוד פתוח. אתם יכולים למצוא את קוד המקור ב- <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
    a011.innerHTML += "<hr><p><strong>הערה:</strong> אירועים מאוחסנים באחסון המקומי של הדפדפן שלכם, כך שהם יישארו עד שתנקו אותו או תמחקו אותם ידנית.<br> ואירועים שנמחקו לא ניתן לשחזר.</p>";
     a011.style.textAlign = "right";
     a011.style.direction = "rtl";
    a012.innerHTML = "ייבוא ​​אירועים מקובץ";
    a013.innerHTML = "עדיין אין אירועים";
    a014.innerHTML = "צרו את האירוע שלכם כדי להתחיל";
    a015.innerHTML = "יצירת אירוע";
     a015.style.textAlign = "right";
    /////////////////////////////////Sets/////////////////////////////////
    for (let i = 0; i < a000_set.length; i++) {
      a000_set[i].textContent = "לסגור";
    }
    for (let i = 0; i < a001_set.length; i++) {
      a001_set[i].textContent = "לבטל";
    }
    for (let i = 0; i < a002_set.length; i++) {
      a002_set[i].textContent = "לשמור";
    }
    for (let i = 0; i < a003_set.length; i++) {
      a003_set[i].textContent = "להחל";
    }
    for (let i = 0; i < a004_set.length; i++) {
      a004_set[i].textContent = "כן";
    }
    for (let i = 0; i < a005_set.length; i++) {
      a005_set[i].textContent = "לא";
    }
    a006.classList.add("active");
  }
  document.title = a000.innerHTML;
}