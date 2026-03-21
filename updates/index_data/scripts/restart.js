function restartApp() {
    if (window.Android && window.Android.restartApp) {
        window.Android.restartApp();
    } else {
        window.location.reload();
    }
}