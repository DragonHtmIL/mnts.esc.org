window.addEventListener("load", function() {
  if(localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", "en");
  };
  loadTexts();
});