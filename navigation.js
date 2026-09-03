let libraryTab;
let analyticsTab;
let listsTab;
let archiveProfileTab;
let recommendationsTab;

function initializeNavigation() {
    libraryTab = document.getElementById("library-tab");
    analyticsTab = document.getElementById("analytics-tab");
    listsTab = document.getElementById("lists-tab");
    archiveProfileTab = document.getElementById("archive-profile-tab");
    recommendationsTab = document.getElementById("recommendations-tab");

    libraryTab.addEventListener("click", () => {
        showPage("library");
    });

    analyticsTab.addEventListener("click", () => {
        showPage("analytics");
    });

    listsTab.addEventListener("click", () => {
        showPage("lists");
    });

    archiveProfileTab.addEventListener("click", () => {
        showPage("archive-profile");
    });

    recommendationsTab.addEventListener("click", () => {
        showPage("recommendations");
    });
}

function showPage(page) {
    const libraryPage = document.getElementById("library-page");
    const analyticsPage = document.getElementById("analytics-page");
    const listsPage = document.getElementById("lists-page");
    const archiveProfilePage = document.getElementById("archive-profile-page");
    const recommendationsPage = document.getElementById("recommendations-page");

    libraryPage.hidden = true;
    analyticsPage.hidden = true;
    listsPage.hidden = true;
    archiveProfilePage.hidden = true;
    recommendationsPage.hidden = true;

    libraryTab?.classList.remove("active");
    analyticsTab?.classList.remove("active");
    listsTab?.classList.remove("active");
    archiveProfileTab?.classList.remove("active");
    recommendationsTab?.classList.remove("active");

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

        case "archive-profile":
            archiveProfilePage.hidden = false;
            archiveProfileTab.classList.add("active");
            break;

        case "recommendations":
            recommendationsPage.hidden = false;
            recommendationsTab.classList.add("active");
            break;
    }
}