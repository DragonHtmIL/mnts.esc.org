function searchEvents() {
  var input, filter, container, cards, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  container = document.getElementById("eventsContainer");
  cards = container.getElementsByClassName("event-card");
  for (i = 0; i < cards.length; i++) {
    txtValue = cards[i].textContent || cards[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}