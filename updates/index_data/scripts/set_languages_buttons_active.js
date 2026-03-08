function setActiveEn() {
  document.getElementById("english").classList.add("active");
  document.getElementById("russian").classList.remove("active");
  document.getElementById("hebrew").classList.remove("active");
}
function setActiveRu() {
  document.getElementById("english").classList.remove("active");
  document.getElementById("russian").classList.add("active");
  document.getElementById("hebrew").classList.remove("active");
}
function setActiveHe() {
  document.getElementById("english").classList.remove("active");
  document.getElementById("russian").classList.remove("active");
  document.getElementById("hebrew").classList.add("active");
}

function setThemeLight() {
  document.getElementById("lightTheme").classList.add("active");
  document.getElementById("darkTheme").classList.remove("active");
}
function setThemeDark() {
  document.getElementById("lightTheme").classList.remove("active");
  document.getElementById("darkTheme").classList.add("active");
}
