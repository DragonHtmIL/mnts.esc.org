function setActiveEn() {
  document.getElementById("english").classList.add("active");
  if (document.getElementById("russian").classList.contains("active")) {
    document.getElementById("russian").classList.remove("active");
  }
  if (document.getElementById("hebrew").classList.contains("active")) {
    document.getElementById("hebrew").classList.remove("active");
  }
}
function setActiveRu() {
  document.getElementById("russian").classList.add("active");
  if (document.getElementById("english").classList.contains("active")) {
    document.getElementById("english").classList.remove("active");
  }
  if (document.getElementById("hebrew").classList.contains("active")) {
    document.getElementById("hebrew").classList.remove("active");
  }
}
function setActiveHe() {
  document.getElementById("hebrew").classList.add("active");
  if (document.getElementById("english").classList.contains("active")) {
    document.getElementById("english").classList.remove("active");
  }
  if (document.getElementById("russian").classList.contains("active")) {
    document.getElementById("russian").classList.remove("active");
  }
}
function langCheck() {
  if(localStorage.getItem("lang") === "en") {
    document.getElementById("english").classList.add("active");
  }else
  if(localStorage.getItem("lang") === "ru") {
    document.getElementById("russian").classList.add("active");
  }else
  if(localStorage.getItem("lang") === "he") {
    document.getElementById("hebrew").classList.add("active");
  }
}
langCheck();