const form = document.getElementById("entry-form");

const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");

const submitBtn = document.getElementById("submitBtn");

async function loadScoringProfiles() {
    const response = await fetch("http://127.0.0.1:8000/scoring-profile");
    const data = await response.json();

    scoringProfiles = {
        video: data.categories,
        book: data.categories,
        game: data.categories,
    };
}

function updateSubmitButton() {
    submitBtn.textContent = editingEntryId ? "Save Changes" : "Add Entry";
}

function resetFormState() {
    editingEntryId = null;

    form.reset();

    document.getElementById("completion-status").value = "completed";

    selectedGenres = [];
    renderGenreSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value, {});

    clearMessage();

    updateSubmitButton();
    submitBtn.disabled = false;

    modal.close();
}

const formMessage = document.getElementById("form-message");

function showError(message) {
    formMessage.textContent = message;
    formMessage.className = "error";
}

function showSuccess(message) {
    formMessage.textContent = message;
    formMessage.className = "success";
}

function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "";
}

function renderScoreInputs(mediaType, existingScores = {}) {
    scoreContainer.innerHTML = "";

    const categories = scoringProfiles[mediaType];

    if (!categories) {
        console.error("Missing scoring categories for:", mediaType);
        return;
    }

    categories.forEach((category) => {
        const normalizedKey = category.toLowerCase().replaceAll(" ", "_");

        const scoreValue = existingScores[normalizedKey] || 5;

        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
      <div class="score-row">
        <label style="width: 33%" for="${category}">
          ${category}:
          <span id="11${category}-value">${scoreValue}</span>
        </label>

        <input 
          type="range"
          min="1"
          max="10"
          value="${scoreValue}"
          id="${category}"
          style="width: 67%"
        >
      </div>
    `;

        scoreContainer.appendChild(wrapper);

        const slider = document.getElementById(category);
        const valueDisplay = document.getElementById(`11${category}-value`);

        slider.addEventListener("input", () => {
            valueDisplay.textContent = slider.value;
        });
    });
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
        btn.className = "genre-btn";

        if (activeGenreFilter === normalized) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            toggleGenreFilter(normalized);
            renderGenreFilters();
        });

        container.appendChild(btn);
    });
}

function toggleGenreFilter(genre) {
    const normalized = genre.toLowerCase();

    if (activeGenreFilter === genre.toLowerCase()) {
        activeGenreFilter = null;
    } else {
        activeGenreFilter = genre.toLowerCase();
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

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submitBtn.disabled) return;

    clearMessage();

    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    const data = {
        title: document.getElementById("title").value.trim(),
        media_type: document.getElementById("media-type").value,
        genres: selectedGenres,
        notes: document.getElementById("notes").value,
        date_consumed: document.getElementById("date-consumed").value || null,
        completion_status: document.getElementById("completion-status").value,
    };

    if (!data.title) {
        showError("Title is required.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    if (selectedGenres.length === 0) {
        showError("Select at least 1 genre.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    if (selectedGenres.length > 3) {
        showError("Select up to 3 genres only.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    const scores = {};
    const categories = scoringProfiles[data.media_type];

    categories.forEach((category) => {
        const slider = document.getElementById(category);

        const normalizedKey = category.toLowerCase().replaceAll(" ", "_");

        scores[normalizedKey] = Number(slider.value);
    });

    data.scores = scores;

    try {
        let response;

        if (editingEntryId) {
            response = await fetch(
                `http://127.0.0.1:8000/entries/${editingEntryId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );
        } else {
            response = await fetch("http://127.0.0.1:8000/entries/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        const result = await response.json();

        if (!response.ok) {
            showError(result.detail || "Something went wrong.");
            return;
        }

        resetFormState();

        await loadEntries();
    } catch (error) {
        console.error(error);
        showError("Unable to save entry.");
    } finally {
        submitBtn.disabled = false;
        updateSubmitButton();
    }
});

const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => modal.showModal();
closeBtn.onclick = () => resetFormState();

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let pendingDeleteId = null;

async function initializeApp() {
    await loadGenres();
    await loadScoringProfiles();

    renderGenreSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value);

    renderGenreFilters();

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
    await renderHighestWritingScore();
}

initializeApp();

function createBaseEntry() {
    const div = document.createElement("div");
    div.className = "library-item";
    div.style.cursor = "pointer";
    return div;
}

function getEntryFromCache(id) {
    return cachedEntries.find((e) => e.id === id);
}

async function loadEntries() {
    const response = await fetch("http://127.0.0.1:8000/entries/");
    cachedEntries = await response.json();

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
        <h3>No results found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    `;
        return;
    }

    const fragment = document.createDocumentFragment();

    workingEntries.forEach((entry) => {
        const el = renderEntry(entry);

        el.dataset.id = entry.id;

        fragment.appendChild(el);
    });

    container.appendChild(fragment);

    renderActiveFilters();
}

function toggleExpanded(id) {
    const previousExpanded = expandedEntryId;

    expandedEntryId = expandedEntryId === id ? null : id;

    if (previousExpanded !== null && previousExpanded !== id) {
        updateEntryView(previousExpanded)
    }

    updateEntryView(id);
}

function createLibraryItem(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    const isExpanded = expandedEntryId === entry.id;

    const div = createBaseEntry();

    div.className = "library-item";

    div.innerHTML = `
    <div class="entry-header">
        <span class="chevron ${isExpanded ? "expanded" : ""}">▼</span>
        <h3>${entry.title}</h3>
    </div>

    <div class="library-meta">
        <span>${entry.media_type}</span>
        <span>${percentScore}%</span>
    </div>
  `;

    div.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        toggleExpanded(entry.id);
    });

    return div;
}

function updateEntryView(id) {

    const container = document.getElementById("entries-container");

    const oldEl = container.querySelector(`[data-id="${id}"]`);
    if (!oldEl) return;

    const entry = cachedEntries.find((e) => e.id === id);
    if (!entry) return;

    const newEl = renderEntry(entry);
    newEl.dataset.id = id;

    container.replaceChild(newEl, oldEl);
}

function renderEntry(entry) {
    if (expandedEntryId === entry.id) {
        const card = createDetailCard(entry);

        const canvas = card.querySelector("canvas");
        renderRadarChart(entry, canvas);

        return card;
    }

    return createLibraryItem(entry);
}

function createDetailCard(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);
    const colors = MEDIA_TYPE_COLORS[entry.media_type] || {
        border: "rgba(150, 150, 150, 1)",
        background: "rgba(150, 150, 150, 0.2)",
    };

    const div = createBaseEntry();

    div.style.cursor = "pointer";
    div.dataset.id = entry.id;

    div.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        toggleExpanded(entry.id);
    });

    div.classList.add("detail-card");
    div.innerHTML = `
    <div class="row" style="display: flex;">
      
      <div style="width: 50%;">
        <span>
            <span class="chevron expanded">▼</span>
            <h3 style="display: inline">${entry.title}</h3>
        </span>

        <p><strong>Date:</strong><br>${entry.date_consumed || "N/A"}</p>
        <p><strong>Type:</strong><br>${entry.media_type}</p>

        <div class="genre-chip-container">
          ${renderGenreChips(entry.genres)}
        </div>

        <p><strong>Total Score:</strong><br>${percentScore}%</p>
      </div>

      <div style="width: 50%;">
        <canvas id="chart-${entry.id}"></canvas>
      </div>
    </div>

    <div>
      ${renderScoreBars(entry.scores || {})}
      <p><strong>Notes:</strong> ${entry.notes}</p>

      <button onclick="startEdit('${entry.id}')">Edit</button>
      <button onclick="openDeleteModal('${entry.id}')">Delete</button>
    </div>

    <hr>
  `;

    return div;
}

function renderRadarChart(entry, canvas) {
    const colors = MEDIA_TYPE_COLORS[entry.media_type] || {
        border: "rgba(150,150,150,1)",
        background: "rgba(150,150,150,0.2)"
    };

    const ctx = canvas.getContext("2d");

    if (chartInstances[entry.id]) {
        chartInstances[entry.id].destroy();
    }

    chartInstances[entry.id] = new Chart(ctx, {
        type: "radar",
        data: {
            labels: Object.keys(entry.scores || {}),
            datasets: [
                {
                    label: entry.title,
                    data: Object.values(entry.scores || {}),
                    fill: true,
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    pointBackgroundColor: colors.border,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                r: {
                    min: 1,
                    max: 10,
                    ticks: {
                        display: false,
                    },
                },
            },
        },
    });
}

renderActiveFilters();

async function deleteEntry(id) {
    await fetch(`http://127.0.0.1:8000/entries/${id}`, {
        method: "DELETE",
    });

    await loadEntries();
}

function openDeleteModal(id) {
    pendingDeleteId = id;
    deleteModal.showModal();
}

confirmDeleteBtn.onclick = async () => {
    await deleteEntry(pendingDeleteId);

    deleteModal.close();
    pendingDeleteId = null;
};

cancelDeleteBtn.onclick = () => {
    deleteModal.close();
    pendingDeleteId = null;
};

async function loadGenres() {
    const response = await fetch("http://127.0.0.1:8000/genres");
    genreRegistry = await response.json();
    renderGenreFilters();
}

function renderGenreSelector(mediaType) {
    const container = document.getElementById("genre-selector");

    container.innerHTML = "";

    const coreGenres = genreRegistry.core || [];
    const mediaGenres = genreRegistry[mediaType] || [];

    const allGenres = [...new Set([...coreGenres, ...mediaGenres])];

    allGenres.forEach((genre) => {
        const chip = document.createElement("button");

        chip.type = "button";

        chip.className = "genre-select-chip";

        if (selectedGenres.includes(genre)) {
            chip.classList.add("selected");
        }

        chip.textContent = genre;

        chip.addEventListener("click", () => {
            toggleGenre(genre);
        });

        container.appendChild(chip);
    });
}

function toggleGenre(genre) {
    if (selectedGenres.includes(genre)) {
        selectedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
        if (selectedGenres.length >= 3) {
            showError("Maximum 3 genres allowed");
            return;
        }

        selectedGenres.push(genre);
    }
    clearMessage();

    renderGenreSelector(mediaTypeSelect.value);
}

async function startEdit(id) {
    const response = await fetch(`http://127.0.0.1:8000/entries/${id}`);
    const entry = await response.json();

    editingEntryId = id;

    document.getElementById("title").value = entry.title;
    document.getElementById("media-type").value = entry.media_type;
    document.getElementById("notes").value = entry.notes || "";
    document.getElementById("date-consumed").value = entry.date_consumed || "";
    document.getElementById("completion-status").value =
        entry.completion_status || "completed";

    submitBtn.textContent = "Save Changes";

    renderScoreInputs(entry.media_type, entry.scores);

    document.getElementById("entryModal").showModal();

    selectedGenres = [...entry.genres];

    renderGenreSelector(entry.media_type);
}

async function renderTopRatedOverall() {
    const response = await fetch("http://127.0.0.1:8000/entries/");
    const entries = await response.json();

    const topFive = [...entries].sort((a, b) => b.total_score - a.total_score).slice(0, 5);

    renderTopList(
        "top-rated-overall-list",
        topFive
    );
}

async function renderTopBooks() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    const entries = await response.json();

    const topBooks = entries.filter(entry => entry.media_type === "book").sort((a, b) => b.total_score - a.total_score).slice(0, 5);

    renderTopList("top-books-list", topBooks);
}

async function renderTopMovies() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    const entries = await response.json();

    const topMovies = entries.filter(entry => entry.media_type === "video").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("top-movies-list", topMovies);
}

async function renderTopGames() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    const entries = await response.json();

    const topGames = entries.filter(entry => entry.media_type === "game").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("top-games-list", topGames);
}

async function renderMostThoughtProvoking() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    const entries = await response.json();

    const topThoughts = entries.filter(entry => entry.media_type === "video").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("thought-provoking-list", topThoughts);
}

async function renderHighestWritingScore() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    const entries = await response.json();

    const topWriting = entries.filter(entry => entry.media_type === "game").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("highest-writing-list", topWriting);
}

function renderActiveFilters() {
    const container = document.getElementById("active-filters");
    container.innerHTML = "";

    const hasSearch = searchQuery.trim() !== "";
    const hasGenre = activeGenreFilter !== null;

    if (!hasSearch && !hasGenre) return;

    const wrapper = document.createElement("div");

    wrapper.style.display = "flex";
    wrapper.style.gap = "10px";
    wrapper.style.alignItems = "center";

    if (hasSearch) {
        const searchTag = document.createElement("span");
        searchTag.textContent = `Search: "${searchQuery}"`;
        searchTag.className = "filter-tag";
        wrapper.appendChild(searchTag);
    }

    if (hasGenre) {
        const genreTag = document.createElement("span");
        genreTag.textContent = `Genre: ${activeGenreFilter}`;
        genreTag.className = "filter-tag";
        wrapper.appendChild(genreTag);
    }

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Filters";

    clearBtn.addEventListener("click", () => {
        searchQuery = "";
        activeGenreFilter = null;

        document.getElementById("search-input").value = "";

        loadEntries();
        renderGenreFilters();
    });

    wrapper.appendChild(clearBtn);

    container.appendChild(wrapper);
}

function renderTopList(containerId, entries) {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    entries.forEach((entry, index) => {
        const card = document.createElement("div");

        card.className = "top-list-card";

        card.innerHTML = `
            <div class="top-list-rank">
                #${index + 1}
            </div>

            <div class="top-list-info">
                <h3>${entry.title}</h3>
                <p>${entry.media_type}</p>
            </div>

            <div class="top-list-score">
                ${entry.total_score.toFixed(1)}%
            </div>
        `;

        container.appendChild(card);
    })
}
