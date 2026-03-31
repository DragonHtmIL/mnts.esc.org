function mobileCheck() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  const body = document.getElementById("subBudy");

  if (toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  })) {
    body.classList.add('mobile');
  }
}