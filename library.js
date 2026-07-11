function createBaseEntry() {
    return document.createElement("div");
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
                    backgroundColor: "rgba(127,174,135,0.15)",
                    borderColor: ARCHIVE_COLORS.green,
                    borderWidth: 2,
                    pointBackgroundColor: ARCHIVE_COLORS.amber,
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
            
                    grid: {
                        color: ARCHIVE_COLORS.grid,
                    },
            
                    angleLines: {
                        color: ARCHIVE_COLORS.grid,
                    },
            
                    pointLabels: {
                        color: ARCHIVE_COLORS.text,
                        font: {
                            family: "monospace",
                            size: 12,
                        },
                    },
                },
            },
        },
    });
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
    } else {
        const fragment = document.createDocumentFragment();

        workingEntries.forEach((entry) => {
            const el = renderEntry(entry);

            el.dataset.id = entry.id;

            fragment.appendChild(el);
        });

        container.appendChild(fragment);
    }

    renderActiveFilters();
}
