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
  var a016 = document.getElementById("importantLabel");
  var a017 = document.getElementById("exitAppBtn");
  const dateInput = document.getElementById("eventDate");
  const a000_set = document.getElementsByClassName("close-text");
  const a001_set = document.getElementsByClassName("cancel-text");
  const a002_set = document.getElementsByClassName("save-text");
  const a003_set = document.getElementsByClassName("apply-text");
  const a004_set = document.getElementsByClassName("yes-text");
  const a005_set = document.getElementsByClassName("no-text");
  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = "en";
    localStorage.setItem("lang", "en");
  }
  if(lang === "en") {
    if (a000) a000.innerHTML = "Event Creator";
    if (a001) a001.innerHTML = "Export Events in File";
    if (a002) a002.innerHTML = "Settings";
    if (a003) a003.innerHTML = "Languages";
    if (a004) a004.innerHTML = "English";
    if (a005) a005.innerHTML = "Russian<br>(Русский)";
    if (a006) a006.innerHTML = "Hebrew<br>(עברית)";
    if (a007) a007.innerHTML = "(required)";
    if (dateInput) dateInput.style.width = "calc(100% - 96px)";
    if (a008) a008.placeholder = "Title";
    if (a009) a009.placeholder = "Description (optional)";
    if (a010) a010.placeholder = "Anime/Game/Manga/Manhua/Company Name (optional)";
    if (a011) {
        a011.innerHTML = "About this site:<br>";
        a011.innerHTML += "This site allows you to create and manage countdown events for your favorite games or anime releases. You can add events with titles, descriptions, dates, and associated game or anime names. The events will be displayed with a live countdown timer.<br>";
        a011.innerHTML += "This project is gen by AI and is open source. You can find the source code on <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
        a011.innerHTML += "<hr><p><strong>Note:</strong> Events are stored in your browser's local storage, so they will persist until you clear it or delete them manually.<br> and removed events cannot be recovered.</p>";
    }
    if (a012) a012.innerHTML = "Import Events from File";
    if (a013) a013.innerHTML = "No events yet";
    if (a014) a014.innerHTML = "Create your event to get started";
    if (a015) a015.innerHTML = "Create Event";
    if (a016) a016.innerHTML = "Important Alert (Bypass Silence/DND)";
    if (a017) a017.innerHTML = "Exit";
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
    if (a004) a004.classList.add("active");
  }else
  if(lang === "ru") {
    if (a000) a000.innerHTML = "Создатель событий";
    if (a001) a001.innerHTML = "Экспорт событий в файл";
    if (a002) a002.innerHTML = "Настройки";
    if (a003) a003.innerHTML = "Языки";
    if (a004) a004.innerHTML = "Английский<br>(English)";
    if (a005) a005.innerHTML = "Русский";
    if (a006) a006.innerHTML = "Иврит<br>(עברית)";
    if (a007) a007.innerHTML = "(обязательно)";
    if (dateInput) dateInput.style.width = "calc(100% - 130px)";
    if (a008) a008.placeholder = "Название";
    if (a009) a009.placeholder = "Описание (необязательно)";
    if (a010) a010.placeholder = "Название аниме/игры/Манга/Манхуа/Компания (необязательно)";
    if (a011) {
        a011.innerHTML = "О сайте:<br>";
        a011.innerHTML += "Этот сайт позволяет создавать и управлять событиями обратного отсчета для ваших любимых игр или релизов аниме. Вы можете добавлять события с названиями, описаниями, датами и связанными названиями игр или аниме. События будут отображаться с живым таймером обратного отсчета.<br>";
        a011.innerHTML += "Этот проект сгенерирован ИИ и является открытым исходным кодом. Вы можете найти исходный код на <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
        a011.innerHTML += "<hr><p><strong>Примечание:</strong> События хранятся в локальном хранилище вашего браузера, поэтому они будут сохраняться, пока вы не очистите его или не удалите их вручную.<br> и удаленные события не могут быть восстановлены.</p>";
    }
    if (a012) a012.innerHTML = "Импорт событий из файла";
    if (a013) a013.innerHTML = "Пока нет событий";
    if (a014) a014.innerHTML = "Создайте свое событие, чтобы начать";
    if (a015) a015.innerHTML = "Создать событие";
    if (a016) a016.innerHTML = "Важное оповещение (обход беззвучного режима/DND)";
    if (a017) a017.innerHTML = "Выйти";
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
    if (a005) a005.classList.add("active");
  }else
  if(lang === "he") {
    if (a000) a000.innerHTML = "יוצר אירועים";
     const header = document.getElementsByTagName("header")[0];
     if (header) {
        header.style.direction = "rtl";
        header.style.paddingRight = "20px";
        header.style.paddingLeft = "0px";
     }
    if (a001) a001.innerHTML = "יצוא אירועים בקובץ";
    if (a002) {
        a002.innerHTML = "הגדרות";
        a002.style.textAlign = "right";
    }
    if (a003) {
        a003.innerHTML = "שפות";
        a003.style.textAlign = "right";
    }
    if (a004) {
        a004.innerHTML = "אנגלית<br>(English)";
        a004.style.direction = "rtl";
    }
    if (a005) {
        a005.innerHTML = "רוסית<br>(Русский)";
        a005.style.direction = "rtl";
    }
    if (a006) a006.innerHTML = "עברית";
    if (a007) a007.innerHTML = "(נדרש)";
    if (dateInput) dateInput.style.width = "calc(100% - 70px)";
    if (a008) {
        a008.placeholder = "כותרת";
        a008.style.textAlign = "right";
    }
    if (a009) {
        a009.placeholder = "תיאור (אופציונלי)";
        a009.style.textAlign = "right";
    }
    if (a010) {
        a010.placeholder = "שם אנימה/משחק/מנגה/מנחואה/חברה (אופציונלי)";
        a010.style.textAlign = "right";
    }
    if (a011) {
        a011.innerHTML = "על האתר הזה:<br>";
        a011.innerHTML += "אתר זה מאפשר לכם ליצור ולנהל אירועי ספירה לאחור למשחקים האהובים עליכם או להוצאות אנימה. אתם יכולים להוסיף אירועים עם כותרות, תיאורים, תאריכים ושמות משחקים או אנימה קשורים. האירועים יוצגו עם טיימר ספירה לאחור חי.<br>";
        a011.innerHTML += "פרויקט זה נוצר על ידי AI והוא קוד פתוח. אתם יכולים למצוא את קוד המקור ב- <a href=\"https://github.com/DragonHTMIL/mnts.esc.org/\">GitHub</a>";
        a011.innerHTML += "<hr><p><strong>הערה:</strong> אירועים מאוחסנים באחסון המקומי של הדפדפן שלכם, כך שהם יישארו עד שתנקו אותו או תמחקו אותם ידנית.<br> ואירועים שנמחקו לא ניתן לשחזר.</p>";
        a011.style.textAlign = "right";
        a011.style.direction = "rtl";
    }
    if (a012) a012.innerHTML = "יבוא אירועים מקובץ";
    if (a013) a013.innerHTML = "עדיין אין אירועים";
    if (a014) a014.innerHTML = "צרו את האירוע שלכם כדי להתחיל";
    if (a015) {
        a015.innerHTML = "יצירת אירוע";
        a015.style.textAlign = "right";
    }
    if (a016) {
        a016.innerHTML = "התראה חשובה (עקיפת שקט/DND)";
        a016.style.textAlign = "right";
        a016.style.direction = "rtl";
    }
    if (a017) {
        a017.innerHTML = "יציאה";
    }
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
    if (a006) a006.classList.add("active");
  }
  if (a000) document.title = a000.innerHTML;
}