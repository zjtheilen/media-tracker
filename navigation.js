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
}