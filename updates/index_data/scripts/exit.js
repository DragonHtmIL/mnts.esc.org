function exitApp() {
    if (window.Android && window.Android.closeApp) {
        window.Android.closeApp();
    } else {
        window.close();
    }
}