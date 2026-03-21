const CURRENT_VERSION_KEY = "app_version";
const MANIFEST_URL = "https://raw.githubusercontent.com/DragonHTMIL/mnts.esc.org/main/update_manifest.json";

async function checkForUpdatesManual() {
    try {
        console.log("Checking for updates...");
        const response = await fetch(MANIFEST_URL + "?t=" + new Date().getTime());
        if (!response.ok) {
            alert("Could not reach update server.");
            return;
        }

        const manifest = await response.json();
        const localVersion = localStorage.getItem(CURRENT_VERSION_KEY) || "1.0.0";

        if (manifest.version !== localVersion) {
            const lang = localStorage.getItem("lang") || "en";
            let description = "";

            if (lang === "en") description = manifest.descriptionEn || "";
            else if (lang === "ru") description = manifest.descriptionRu || "";
            else if (lang === "he") description = manifest.descriptionHe || "";

            let confirmMsg = `New update available (v${manifest.version}).`;
            if (description) {
                confirmMsg += `\n\nWhat's new:\n${description}`;
            }
            confirmMsg += `\n\nDo you want to update now?`;

            if (confirm(confirmMsg)) {
                console.log("Updating to version " + manifest.version);

                // 1. Download/Update new files
                for (const filePath of manifest.files) {
                    try {
                        const fileUrl = manifest.baseUrl + filePath + "?t=" + new Date().getTime();
                        const fileResponse = await fetch(fileUrl);
                        const content = await fileResponse.text();

                        if (window.Android && window.Android.updateInternalFile) {
                            window.Android.updateInternalFile(filePath, content);
                        }
                    } catch (fileErr) {
                        console.error("Failed to download " + filePath, fileErr);
                    }
                }

                // 2. Delete unused files
                if (manifest.deleteFiles && Array.isArray(manifest.deleteFiles)) {
                    for (const filePath of manifest.deleteFiles) {
                        if (window.Android && window.Android.deleteInternalFile) {
                            window.Android.deleteInternalFile(filePath);
                        }
                    }
                }

                localStorage.setItem(CURRENT_VERSION_KEY, manifest.version);
                alert("Updates downloaded successfully. The app will now reload.");

                if (window.Android && window.Android.reloadApp) {
                    window.Android.reloadApp();
                } else {
                    window.location.reload();
                }
            }
        } else {
            alert("App is already up to date.");
        }
    } catch (error) {
        console.error("Update check failed:", error);
        alert("Update check failed. Please check your internet connection.");
    }
}
