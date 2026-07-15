function renderEntry(entry) {

    if (expandedEntryId === entry.id) {

        const card = createDetailCard(entry);

        const universalCanvas = card.querySelector(
            `#universal-chart-${entry.id}`
        );

        const mediaCanvas = card.querySelector(
            `#media-chart-${entry.id}`
        );

        if (universalCanvas) {
            // console.log("Rendering universal chart", entry);
            renderUniversalScoreChart(entry, universalCanvas);
        }

        if (mediaCanvas) {
            // console.log("Rendering media chart", entry);
            renderMediaScoreChart(entry, mediaCanvas);
        }

        // console.log("Universal scores:", entry.universal_scores);
        // console.log("Media scores:", entry.media_scores);


        if (universalCanvas) {
            renderUniversalScoreChart(entry);
        }

        if (mediaCanvas) {
            renderMediaScoreChart(entry);
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

            <div class="title-block">

                <div class="archive-label">
                    ARCHIVE RECORD
                </div>
            
                <div class="record-id">
                    ${generateRecordId(entry)}
                </div>
            
                <h3 class="inline-title">
                    ${entry.title}
                </h3>

            </div>
        </div>
    `;
}

function renderEntryMetadata(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);
    let icon
    switch (entry.media_type) {
        case "video":
            icon = "film"
            break;
        case "game":
            icon = "gamepad-2"
            break;
        case "book":
            icon = "book"
            break;
    }

    return `
        <div class="entry-meta-grid">

            <div class="meta-item">

                <div class="meta-label">
                    <i data-lucide="calendar"></i>
                    <strong>ARCHIVED DATE</strong>
                </div>
            
                <span>${entry.date_consumed || "N/A"}</span>
            
            </div>

            <div class="meta-item">

                <div class="meta-label">
                    <i class="media-icon" data-lucide="${icon}"></i>
                    <strong>CLASSIFICATION</strong>
                </div>
            
                <span>${entry.media_type.toUpperCase()}</span>
            
            </div>

            <div class="meta-item">
                <div class="meta-label">
                    <i class="media-icon" data-lucide="badge-percent"></i>
                    <strong>EVALUATION INDEX</strong>
                </div>
                
                <span>${percentScore}%</span>
            </div>

        </div>

        <div class="genre-chip-container">
        TEST
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
        <button onclick="startEdit('${entry.id}')">
            <i class="media-icon" data-lucide="square-pen"></i>
            Amend Record
        </button>

        <button class="danger" onclick="openDeleteModal('${entry.id}')">
            <i class="media-icon" data-lucide="trash-2"></i>
            Purge Record
        </button>
    `;
}

function createLibraryItem(entry) {
    const percentScore = Number(entry.total_score).toFixed(1);

    const isExpanded = expandedEntryId === entry.id;

    const div = createBaseEntry();

    div.className = "library-item";

    div.tabIndex = 0;

    div.setAttribute("role", "button");

    div.setAttribute(
        "aria-expanded",
        expandedEntryId === entry.id
    );

    div.innerHTML = `
    ${renderEntryHeader(entry, isExpanded)}

    <div class="library-meta">
        <span>${entry.media_type.toUpperCase()}</span>
        <span>${percentScore}%</span>
    </div>
  `;

    div.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        toggleExpanded(entry.id);
    });

    div.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();

            toggleExpanded(entry.id);
        }
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

                <div class="detail-section">
                    <h4>Observations</h4>
                    ${renderEntryNotes(entry)}
                </div>

                <div class="detail-section">
                    <h4>Actions</h4>
                    ${renderEntryActions(entry)}
                </div>

            </div>


            <div class="entry-charts">

                <div class="chart-panel radar-panel">
                    <h4>Universal Evaluation</h4>
                    <canvas id="universal-chart-${entry.id}"></canvas>
                </div>

                <div class="chart-panel">
                    <h4>
                        ${entry.media_type.charAt(0).toUpperCase() + entry.media_type.slice(1)}
                        Evaluation
                    </h4>
                    <canvas id="media-chart-${entry.id}"></canvas>
                </div>

            </div>

        </div>


    `;

    refreshIcons();

    return div;
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

    refreshIcons();
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