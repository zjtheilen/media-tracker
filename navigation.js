function showPage(page) {
    const library = document.getElementById("library-page");
    const analytics = document.getElementById("analytics-page");
    const lists = document.getElementById("lists-page");

    library.hidden = true;
    analytics.hidden = true;
    lists.hidden = true;

    switch (page) {
        case "library":
            library.hidden = false;
            break;

        case "analytics":
            analytics.hidden = false;
            break;
        case "lists":
            lists.hidden = false;
            break;
    }

    const libraryTab = document.getElementById("library-tab");
    const analyticsTab = document.getElementById("analytics-tab");
    const listsTab = document.getElementById("lists-tab");

    libraryTab.addEventListener("click", () => {
        showPage("library");
    });

    analyticsTab.addEventListener("click", () => {
        showPage("analytics");
    });

    listsTab.addEventListener("click", () => {
        showPage("lists");
    })
}