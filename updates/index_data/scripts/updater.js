const CURRENT_VERSION_KEY = "app_version";
const MANIFEST_URL = "https://raw.githubusercontent.com/DragonHtmIL/mnts.esc.org/refs/heads/main/update_manifest.json";

async function checkForUpdates() {
    try {
        console.log("Checking for updates...");
        const response = await fetch(MANIFEST_URL + "?t=" + new Date().getTime()); // Avoid cache
        if (!response.ok) return;

        const manifest = await response.json();
        const localVersion = localStorage.getItem(CURRENT_VERSION_KEY) || "0.0.0";

        if (manifest.version !== localVersion) {
            console.log("Updating to version " + manifest.version);

            // Download each file in the manifest
            for (const filePath of manifest.files) {
                try {
                    const fileUrl = manifest.baseUrl + filePath + "?t=" + new Date().getTime();
                    const fileResponse = await fetch(fileUrl);
                    const content = await fileResponse.text();

                    // Save to Android internal storage
                    if (window.Android && window.Android.updateInternalFile) {
                        window.Android.updateInternalFile(filePath, content);
                    }
                } catch (fileErr) {
                    console.error("Failed to download " + filePath, fileErr);
                }
            }

            localStorage.setItem(CURRENT_VERSION_KEY, manifest.version);

            // Notify user and reload
            if (confirm("New update (v" + manifest.version + ") installed. Restart app now?")) {
                if (window.Android && window.Android.reloadApp) {
                    window.Android.reloadApp();
                } else {
                    window.location.reload();
                }
            }
        }
    } catch (error) {
        console.error("Update check failed:", error);
    }
}

// Start update check
checkForUpdates();
