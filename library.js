function createBaseEntry() {
    return document.createElement("div");
}

function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

async function loadEntries() {
    cachedEntries = await getEntries();

    let workingEntries = [...cachedEntries];

    if (activeGenreFilter) {
        workingEntries = workingEntries.filter(
            (entry) =>
                Array.isArray(entry.genres) &&
                entry.genres.some((g) => g === activeGenreFilter),
        );
    }

    if (searchQuery.trim() !== "") {
        workingEntries = workingEntries.filter((entry) =>
            entry.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }

    workingEntries.sort((a, b) => {
        switch (activeSort) {
            case "date_desc":
                return new Date(b.date_consumed || 0) - new Date(a.date_consumed || 0);
            case "date_asc":
                return new Date(a.date_consumed || 0) - new Date(b.date_consumed || 0);
            case "score_desc":
                return b.total_score - a.total_score;
            case "score_asc":
                return a.total_score - b.total_score;
            case "title_asc":
                return a.title.localeCompare(b.title);
            case "title_desc":
                return b.title.localeCompare(a.title);
            case "media_type_asc":
                return a.media_type.localeCompare(b.media_type);
            case "media_type_desc":
                return b.media_type.localeCompare(a.media_type);
            default:
                return 0;
        }
    });

    const container = document.getElementById("entries-container");

    container.innerHTML = "";

    if (workingEntries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="media-icon" data-lucide="folder-search"></i>
                <h3>No matching records found</h3>
                <p>Adjust archive search parameters or filters.</p>
            </div>
        `;
    } else {
        const fragment = document.createDocumentFragment();

        workingEntries.forEach((entry) => {
            const el = renderEntry(entry);

            el.dataset.id = entry.id;

            fragment.appendChild(el);
        });

        container.appendChild(fragment);

        refreshIcons();
    }

    renderActiveFilters();
}
