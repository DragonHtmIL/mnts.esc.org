window.addEventListener("load", function() {
  if(localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", "en");
  };

  let theme = localStorage.getItem("theme");
  if (theme === null) {
    theme = "dark";
    localStorage.setItem("theme", "dark");
  }

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (document.getElementById("darkTheme")) document.getElementById("darkTheme").classList.add("active");
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (document.getElementById("lightTheme")) document.getElementById("lightTheme").classList.add("active");
  }

  loadTexts();
});