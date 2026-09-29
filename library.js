const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");

const importPreviewModal = document.getElementById("importPreviewModal");
const cancelImportBtn = document.getElementById("cancelImportBtn");
const restoreImportBtn = document.getElementById("restoreImportBtn");

const previewImportedCount = document.getElementById("previewImportedCount");
const previewUnchangedCount = document.getElementById("previewUnchangedCount");
const previewAddCount = document.getElementById("previewAddCount");
const previewReplaceCount = document.getElementById("previewReplaceCount");
const previewRemoveCount = document.getElementById("previewRemoveCount");


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

    if (activeGenreFilters.length > 0) {

        workingEntries =
            workingEntries.filter(
                (entry) => {

                    if (!Array.isArray(entry.genres)) {
                        return false;
                    }


                    return activeGenreFilters.every(
                        (selectedGenre) =>
                            entry.genres.includes(selectedGenre)
                    );

                }
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

    const totalPages = Math.max(
        1,
        Math.ceil(workingEntries.length / entriesPerPage),
    );

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedEntries = workingEntries.slice(
        startIndex,
        startIndex + entriesPerPage,
    );

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

        paginatedEntries.forEach((entry) => {
            const el = renderEntry(entry);

            el.dataset.id = entry.id;

            fragment.appendChild(el);
        });

        container.appendChild(fragment);

        refreshIcons();
    }

    renderActiveFilters();
    updatePaginationControls(workingEntries.length);
}


function updatePaginationControls(totalItems) {
    const controls = document.getElementById("pagination-controls");
    const previousButton = document.getElementById("pagination-prev");
    const nextButton = document.getElementById("pagination-next");
    const status = document.getElementById("pagination-status");

    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / entriesPerPage),
    );

    controls.hidden = totalItems <= entriesPerPage;

    previousButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;

    status.textContent = `Page ${currentPage} of ${totalPages}`;
}


document
    .getElementById("pagination-prev")
    .addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadEntries();
        }
    });

document
    .getElementById("pagination-next")
    .addEventListener("click", () => {
        currentPage += 1;
        loadEntries();
    });

exportBtn.addEventListener("click", () => {
    window.location.href = `${API_BASE_URL}/archive/export`;
});

importBtn.addEventListener("click", () => {
    importFile.click();
});

importFile.addEventListener("change", async () => {
    const file = importFile.files[0];

    if (!file) {
        return;
    }

    const jsonText = await file.text();
    pendingImportJson = jsonText;

    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}/archive/import/preview`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonText,
            },
        );
    } catch (error) {
        alert("Unable to preview the archive.");
        return;
    }

    if (!response.ok) {
        alert("The selected file is not a valid WASABI archive.");
        return;
    }

    const preview = await response.json();

    previewImportedCount.textContent = preview.imported_count;
    previewUnchangedCount.textContent = preview.unchanged_count;
    previewAddCount.textContent = preview.add_count;
    previewReplaceCount.textContent = preview.replace_count;
    previewRemoveCount.textContent = preview.remove_count;

    importPreviewModal.showModal();

    importFile.value = "";
});

cancelImportBtn.addEventListener("click", () => {
    importPreviewModal.close();
});

restoreImportBtn.addEventListener("click", async () => {
    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}/archive/import`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: pendingImportJson,
            },
        );
    } catch (error) {
        alert("Unable to restore the archive.");
        return;
    }

    if (!response.ok) {
        alert("The archive could not be restored.");
        return;
    }

    importPreviewModal.close();
    pendingImportJson = null;
    await loadEntries();
});
