
function applySettings() {
  function saveActive(elements, storageKey) {
    for (const item of elements) {
      const el = document.getElementById(item.id);
      if (el && el.classList.contains("active")) {
        localStorage.setItem(storageKey, item.value);
        return;
      }
    }
  }
  saveActive([
    { id: "english", value: "en" },
    { id: "russian", value: "ru" },
    { id: "hebrew", value: "he" }
  ], "lang");
  window.location.reload();
};