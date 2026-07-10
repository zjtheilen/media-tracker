function createBaseEntry() {
    return document.createElement("div");
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


        if (canvas) {
            renderRadarChart(entry, canvas);
        }

        return card;
    }

    return createLibraryItem(entry);
}

function renderEntryHeader(entry, isExpanded) {
    return `
        <div class="entry-header">
            <svg class="chevron ${isExpanded ? "expanded" : ""}"
                 viewBox="0 0 24 24"
                 aria-hidden="true">
                <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>

            <h3 class="inline-title">${entry.title}</h3>
        </div>
    `;
}

function renderEntryMetadata(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    return `
        <div class="entry-meta-grid">

            <div class="meta-item">
                <strong>Date</strong>
                <span>${entry.date_consumed || "N/A"}</span>
            </div>

            <div class="meta-item">
                <strong>Type</strong>
                <span>${entry.media_type}</span>
            </div>

            <div class="meta-item">
                <strong>Score</strong>
                <span>${percentScore}%</span>
            </div>

        </div>

        <div class="genre-chip-container">
            ${renderGenreChips(entry.genres)}
        </div>
    `;
}

function renderEntryScores(entry) {
    return `
        <div class="entry-score-panel">
            ${renderScoreBars(entry.scores || {})}
        </div>
    `;
}

function renderEntryNotes(entry) {
    return `
        <div class="entry-notes">
            ${entry.notes || "<em>No notes.</em>"}
        </div>
    `;
}

function renderEntryActions(entry) {
    return `
        <div class="entry-actions">
            <button onclick="startEdit('${entry.id}')">
                Edit
            </button>

            <button class="danger" onclick="openDeleteModal('${entry.id}')">
                Delete
            </button>
        </div>
    `;
}

function createLibraryItem(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    const isExpanded = expandedEntryId === entry.id;

    const div = createBaseEntry();

    div.className = "library-item"

    div.innerHTML = `
    ${renderEntryHeader(entry, isExpanded)}

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

function createDetailCard(entry) {

    const div = createBaseEntry();

    div.className = "detail-card";

    div.dataset.id = entry.id;

    div.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        toggleExpanded(entry.id);
    });

    div.classList.add("detail-card");
    div.innerHTML = `
        <div class="entry-overview">

            <div class="entry-details">
                ${renderEntryHeader(entry, true)}
                ${renderEntryMetadata(entry)}
            </div>

            <div class="entry-chart">
                <canvas id="chart-${entry.id}"></canvas>
            </div>

        </div>

        <div class="detail-section">
            <h4>Scores</h4>
            ${renderEntryScores(entry)}
        </div>

        <div class="detail-section">
            <h4>Actions</h4>
            ${renderEntryActions(entry)}
        </div>
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

function renderActiveFilters() {
    const container = document.getElementById("active-filters");
    container.innerHTML = "";

    const hasSearch = searchQuery.trim() !== "";
    const hasGenre = activeGenreFilter !== null;

    if (!hasSearch && !hasGenre) return;

    const wrapper = document.createElement("div");

    wrapper.className = "flex-row";

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