function checkSettingsChanges() {
  let settingsChanged = false;
  function checkSettingCategory(elementsMap, localStorageKey) {
    const storedValue = localStorage.getItem(localStorageKey);
    let activeValue = null;
    for (const item of elementsMap) {
      const element = document.getElementById(item.id);
      if (!element) continue;
      if (element.classList.contains("active")) {
        activeValue = item.localStorageValue;
        break;
      }
    }
    if (activeValue !== storedValue) {
      settingsChanged = true;
    }
  }
  checkSettingCategory(
    [
      { id: "english", localStorageValue: "en" },
      { id: "russian", localStorageValue: "ru" },
      { id: "hebrew", localStorageValue: "he" }
    ],
    "lang"
  );
  checkSettingCategory(
    [
      { id: "lightTheme", localStorageValue: "light" },
      { id: "darkTheme", localStorageValue: "dark" }
    ],
    "theme"
  );
  document.getElementById("settingsApplyer").style.display =
    settingsChanged ? "block" : "none";
}