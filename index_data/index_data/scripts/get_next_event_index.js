function getNextEventIndex() {
  let i = 0;
  while (localStorage.getItem(`event_${i}`)) i++;
  return i;
}