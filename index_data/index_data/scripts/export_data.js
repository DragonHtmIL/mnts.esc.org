document.getElementById("exportEvents").onclick = () => {
  const events = {};
  Object.keys(localStorage)
    .filter(key => key.startsWith("event_"))
    .forEach(key => {
      events[key] = JSON.parse(localStorage.getItem(key));
    });
  const blob = new Blob(
    [JSON.stringify(events, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "events_backup.json";
  a.click();
  URL.revokeObjectURL(url);
};