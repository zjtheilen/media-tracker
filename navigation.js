let libraryTab;
let analyticsTab;
let listsTab;

function initializeNavigation() {
    libraryTab = document.getElementById("library-tab");
    analyticsTab = document.getElementById("analytics-tab");
    listsTab = document.getElementById("lists-tab");

    libraryTab.addEventListener("click", () => {
        showPage("library");
    });

    analyticsTab.addEventListener("click", () => {
        showPage("analytics");
    });

    listsTab.addEventListener("click", () => {
        showPage("lists");
    });
}

function showPage(page) {
    const libraryPage = document.getElementById("library-page");
    const analyticsPage = document.getElementById("analytics-page");
    const listsPage = document.getElementById("lists-page");

    libraryPage.hidden = true;
    analyticsPage.hidden = true;
    listsPage.hidden = true;

    libraryTab?.classList.remove("active");
    analyticsTab?.classList.remove("active");
    listsTab?.classList.remove("active");

    switch (page) {
        case "library":
            libraryPage.hidden = false;
            libraryTab.classList.add("active");
            break;

        case "analytics":
            analyticsPage.hidden = false;
            analyticsTab.classList.add("active");
            break;

        case "lists":
            listsPage.hidden = false;
            listsTab.classList.add("active");
            break;
    }
}
