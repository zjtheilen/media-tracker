async function refreshApp() {
    await loadEntries();

    await renderMediaDistributionChart();
    await renderAverageScoreByMediaTypeChart();
    await renderMonthlyCompletionChart();
    await renderRatingDistributionChart();
    await renderGenreAverageRatingsChart();
    await renderArchiveProfileCard();

    await new Promise(resolve =>
        requestAnimationFrame(resolve)
    );

    await renderUniversalEvaluationRadar();
    await renderMediaBarCharts();

    await renderTopRatedOverall();
    await renderTopBooks();
    await renderTopMovies();
    await renderTopGames();
    await renderRecentArchiveAdditions();
    await renderArchiveHallOfFame();
}

async function loadScoringProfiles() {
    scoringProfiles = await getScoringProfiles();
}

mediaTypeSelect.addEventListener("change", () => {
    selectedGenres = [];

    renderScoreInputs(mediaTypeSelect.value, {});
    renderGenreFormSelector(mediaTypeSelect.value);
});

const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

let lastFocusedElement = null;

openBtn.addEventListener("click", () => {
    lastFocusedElement = document.activeElement;

    modal.showModal();

    document.getElementById("title").focus();
});

entryModal.addEventListener("click", (event) => {

    if (event.target === entryModal) {
        entryModal.close();
    }

});

closeBtn.addEventListener("click", () => {
    resetFormState();

    modal.close();

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
});

modal.addEventListener("close", () => {
    resetFormState();

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
});

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

deleteModal.addEventListener("click", (event) => {

    if (event.target === deleteModal) {
        deleteModal.close();
    }

});

let pendingDeleteId = null;

async function loadGenres() {
    genreRegistry = await getGenres();
    renderGenreFilters();
}

async function loadScoringRubric() {
    scoringRubrics = await getScoringRubric();
}

async function initializeApp() {
    initializeNavigation();

    await loadGenres();
    await loadScoringProfiles();
    await loadScoringRubric();

    initializeFilters();

    renderGenreFormSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value);

    await refreshApp();

    showPage("library");
    lucide.createIcons();
}

initializeApp();

async function deleteEntry(id) {
    await removeEntry(id);

    await refreshApp();
}

function openDeleteModal(id) {
    pendingDeleteId = id;
    deleteModal.showModal();
    refreshIcons();
}

confirmDeleteBtn.onclick = async () => {
    try {
        await deleteEntry(pendingDeleteId);

        deleteModal.close();
        pendingDeleteId = null;
    } catch (error) {
        alert(error.message);
    }
};

cancelDeleteBtn.onclick = () => {
    deleteModal.close();
    pendingDeleteId = null;
};
