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
    console.log("renderEntry:", entry.title, expandedEntryId);

    if (expandedEntryId === entry.id) {
        console.log("Expanded entry detected");

        const card = createDetailCard(entry);

        const canvas = card.querySelector("canvas");

        console.log("Canvas found:", canvas);

        if (canvas) {
            renderRadarChart(entry, canvas);
        }

        return card;
    }

    return createLibraryItem(entry);
}

function createLibraryItem(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    const isExpanded = expandedEntryId === entry.id;

    const div = createBaseEntry();

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

function createDetailCard(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    const div = createBaseEntry();

    div.dataset.id = entry.id;

    div.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        toggleExpanded(entry.id);
    });

    div.classList.add("detail-card");
    div.innerHTML = `
        <div class="row">

            <div class="column-half">
                <span>
                    <span class="chevron expanded">▼</span>
                    <h3 class="inline-title">${entry.title}</h3>
                </span>

                <p><strong>Date:</strong><br>${entry.date_consumed || "N/A"}</p>
                <p><strong>Type:</strong><br>${entry.media_type}</p>

                <div class="genre-chip-container">
                    ${renderGenreChips(entry.genres)}
                </div>

                <p><strong>Total Score:</strong><br>${percentScore}%</p>
            </div>

            <div class="column-half">
                <canvas id="chart-${entry.id}"></canvas>
            </div>

        </div>
    `;

    return div;
}

function renderRadarChart(entry, canvas) {
    console.log("Radar rendering:", entry.title, canvas);

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

    // wrapper.style.display = "flex";
    // wrapper.style.gap = "10px";
    // wrapper.style.alignItems = "center";
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