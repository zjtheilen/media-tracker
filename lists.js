function getTopEntries(entries, scoreFn, limit = 5) {
    return [...entries]
        .sort((a, b) => scoreFn(b) - scoreFn(a))
        .slice(0, limit);
}

async function renderRecentArchiveAdditions() {
    const entries = await getEntries();

    const recent = [...entries]
        .filter(entry => entry.date_consumed)
        .sort(
            (a, b) =>
                new Date(b.date_consumed) -
                new Date(a.date_consumed)
        )
        .slice(0, 5);

    renderTopList(
        "recent-archive-list",
        recent,
        () => 0
    );
}

async function renderArchiveHallOfFame() {
    const entries = await getEntries();

    const hall = entries
        .filter(entry => entry.total_score >= 95)
        .sort((a, b) => b.total_score - a.total_score);

    renderTopList(
        "hall-of-fame-list",
        hall
    );
}

async function renderTopByFilter(
    containerId,
    filterFn,
    scoreFn = entry => entry.total_score
) {
    const entries = await getEntries();

    const filteredEntries = entries.filter(filterFn);

    const topEntries = getTopEntries(
        filteredEntries,
        scoreFn
    );

    renderTopList(containerId, topEntries, scoreFn);
}

async function renderTopRatedOverall() {
    renderTopByFilter(
        "top-rated-overall-list",
        () => true
    );
}

async function renderTopBooks() {
    renderTopByFilter(
        "top-books-list",
        entry => entry.media_type === "book"
    );
}

async function renderTopMovies() {
    renderTopByFilter(
        "top-movies-list",
        entry => entry.media_type === "video"
    );
}

async function renderTopGames() {
    renderTopByFilter(
        "top-games-list",
        entry => entry.media_type === "game"
    );
}

function renderTopList(
    containerId,
    entries,
    scoreFn = entry => entry.total_score
) {
    const container = document.getElementById(containerId);

    container.innerHTML = renderReportHeader(
        getReportTitle(containerId),
        getReportQuery(containerId)
    );

    entries.forEach((entry, index) => {
        const item = document.createElement("div");
        item.className = "top-list-item"

        item.innerHTML = `
            <div class="report-record">

                <div class="report-rank">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="report-details">

                <div class="archive-label">
                ARCHIVE RECORD
            </div>
            
            <div class="record-id">
                ${generateRecordId(entry)}
            </div>
            
            <h3>${entry.title}</h3>

                </div>

                <div class="report-value">
                    ${containerId === "recent-archive-list"
                        ? entry.date_consumed
                        : `${scoreFn(entry).toFixed(1)}%`
                    }
                </div>

            </div>
        `;

        container.appendChild(item);
    });
}

function getReportTitle(containerId) {

    const titles = {
        "top-rated-overall-list":
            "<i class='media-icon' data-lucide='file-text'></i>Highest Evaluated Records",

        "top-books-list":
            "Highest Rated Books",

        "top-games-list":
            "Highest Rated Games",

        "top-movies-list":
            "Highest Rated Videos",

        "recent-archive-list":
            "Recent Archive Additions",

        "hall-of-fame-list":
            "Archive Hall of Fame"
    };

    return titles[containerId] || "Archive Report";
}


function getReportQuery(containerId) {

    const queries = {
        "top-rated-overall-list":
            "ORDER BY EVALUATION INDEX DESC",

        "recent-archive-list":
            "SORT BY ARCHIVE DATE DESC",

        "hall-of-fame-list":
            "FILTER: EVALUATION INDEX >= 95%"
    };

    return queries[containerId] || "GENERATED REPORT";
}

function generateRecordId(entry) {
    const prefixMap = {
        book: "BOOK",
        video: "VID",
        game: "GAME"
    };

    const prefix =
        prefixMap[entry.media_type] || "REC";

    const date =
        entry.date_consumed
            ? entry.date_consumed.replaceAll("-", "")
            : "UNKNOWN";

    return `${prefix}-${date}`;
}

function renderReportHeader(title, queryText) {
    return `
        <div class="report-header">

            <div class="archive-label">
                ARCHIVE REPORT
            </div>

            <h2>${title}</h2>

            <div class="report-metadata">

                <div>
                    <strong>QUERY</strong>
                    <span>${queryText}</span>
                </div>

                <div>
                    <strong>STATUS</strong>
                    <span>COMPLETE</span>
                </div>

            </div>

        </div>
    `;
}