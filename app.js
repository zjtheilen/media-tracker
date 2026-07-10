async function refreshApp() {
    await loadEntries();

    await renderMediaDistributionChart();
    await renderAverageScoreByMediaTypeChart();
    await renderMonthlyCompletionChart();
    await renderRatingDistributionChart();
    await renderGenreAverageRatingsChart();
    await renderFavoriteMediaType();

    await renderTopRatedOverall();
    await renderTopBooks();
    await renderTopMovies();
    await renderTopGames();
    await renderMostThoughtProvoking();
    await renderBestWritingScore();
}

async function loadScoringProfiles() {
    const data = await getScoringProfiles();

    scoringProfiles = {
        video: data.categories,
        book: data.categories,
        game: data.categories,
    };
}

function renderScoreBars(scores) {
    return Object.entries(scores)
        .map(([category, value]) => {
            const max = 10;
            const percent = (value / max) * 100;

            return `
            <div class="score-row">
                <span class="score-label">${category}</span>
                <div class="score-bar-bg">
                    <div class="score-bar-fill" style="width: ${percent}%"></div>
                </div>
                <span class="score-value">${value}</span>
            </div>
        `;
        })
        .join("");
}

function renderGenreChips(genres) {
    return genres
        .map((genre) => {
            const formatted = genre
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const isActive = activeGenreFilter === genre.toLowerCase();

            return `
        <span 
          class="genre-chip ${isActive ? "active-filter" : ""}"
          onclick="toggleGenreFilter('${genre.toLowerCase()}')"
          style="cursor: pointer;"
        >
          ${formatted}
        </span>
      `;
        })
        .join("");
}

function renderGenreFilters() {
    const container = document.getElementById("genre-filters");
    container.innerHTML = "";

    const core = genreRegistry.core || [];
    const media = Object.values(genreRegistry).flat();

    const allGenres = [...new Set([...core, ...media])];

    allGenres.forEach((genre) => {
        const normalized = genre.toLowerCase();

        const btn = document.createElement("button");
        btn.textContent = genre;
        btn.className = "genre-filter-chip";

        if (activeGenreFilter === normalized) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            toggleGenreFilter(normalized);
        });

        container.appendChild(btn);
    });
}

function toggleGenreFilter(genre) {
    const normalized = genre.toLowerCase();

    if (activeGenreFilter === normalized) {
        activeGenreFilter = null;
    } else {
        activeGenreFilter = normalized;
    }

    loadEntries();
}

mediaTypeSelect.addEventListener("change", () => {
    selectedGenres = [];

    renderScoreInputs(mediaTypeSelect.value, {});
    renderGenreSelector(mediaTypeSelect.value);
});

document.getElementById("sort-select").addEventListener("change", (event) => {
    activeSort = event.target.value;
    loadEntries();
});

document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    loadEntries();
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

let pendingDeleteId = null;

async function initializeApp() {
    await loadGenres();
    await loadScoringProfiles();

    renderGenreSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value);

    await refreshApp();

    showPage("library");
}

initializeApp();

renderActiveFilters();

async function deleteEntry(id) {
    await removeEntry(id);

    await refreshApp();
}

function openDeleteModal(id) {
    pendingDeleteId = id;
    deleteModal.showModal();
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

async function loadGenres() {
    genreRegistry = await getGenres();
    renderGenreFilters();
}
