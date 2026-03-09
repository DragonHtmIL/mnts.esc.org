document.getElementById("exportEvents").onclick = () => {
  const events = {};
  Object.keys(localStorage)
    .filter(key => key.startsWith("event_"))
    .forEach(key => {
      events[key] = JSON.parse(localStorage.getItem(key));
    });
  const jsonString = JSON.stringify(events, null, 2);
  if (window.Android && window.Android.saveFile) {
    window.Android.saveFile("events_backup.json", jsonString);
  } else {
    const blob = new Blob(
      [jsonString],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }
};