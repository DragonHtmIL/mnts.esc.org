const homeBtn = document.getElementById("goHome");

if (homeBtn) {
    homeBtn.onclick = () => {
        // If modals are open, close them and clear search
        const modals = document.querySelectorAll(".modal");
        modals.forEach(m => {
            m.style.display = "none";
        });

        const searchBar = document.getElementById("searchBar");
        if (searchBar) {
            searchBar.value = "";
            if (typeof searchEvents === 'function') searchEvents();
        }

        document.body.style.overflow = "auto";

        // Return to main page if navigated away
        if (!window.location.href.includes("index.html") || window.location.search || window.location.hash) {
            window.location.href = "index.html";
        }
    };

    function checkHomeButtonVisibility() {
        const searchBar = document.getElementById("searchBar");
        const isSearching = searchBar && searchBar.value.trim() !== "";

        const modals = document.querySelectorAll(".modal");
        const isModalOpen = Array.from(modals).some(m => m.style.display === "flex");

        // Show if searching, modal is open, or we navigated away from base index.html
        const isNotBaseUrl = !window.location.pathname.endsWith("index.html") && window.location.pathname !== "/";

        if (isSearching || isModalOpen || isNotBaseUrl) {
            homeBtn.style.display = "flex";
        } else {
            homeBtn.style.display = "none";
        }
    }

    // Check frequently to react to modal state changes and URL changes
    setInterval(checkHomeButtonVisibility, 500);
}
