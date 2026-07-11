function getTopEntries(entries, scoreFn, limit = 5) {
    return [...entries]
        .sort((a, b) => scoreFn(b) - scoreFn(a))
        .slice(0, limit);
}

// function calculateThoughtProvokingScore(entry) {
//     const scores = entry.scores || {};

//     const factors = [
//         scores.depth,
//         scores.originality,
//         scores.emotional_impact,
//     ].filter((score) => score !== undefined);

//     if (factors.length === 0) {
//         return 0;
//     }

//     return factors.reduce((sum, score) => sum + score, 0) / factors.length;
// }


// function calculateWritingScore(entry) {
//     const scores = entry.scores || {};

//     const factors = [
//         scores.craft,
//         scores.originality,
//     ].filter((score) => score !== undefined);

//     if (factors.length === 0) {
//         return 0;
//     }

//     return factors.reduce((sum, score) => sum + score, 0) / factors.length;
// }

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

// async function renderMostThoughtProvoking() {
//     renderTopByFilter(
//         "thought-provoking-list",
//         () => true,
//         calculateThoughtProvokingScore
//     );
// }

// async function renderBestWritingScore() {
//     renderTopByFilter(
//         "highest-writing-list",
//         () => true,
//         calculateWritingScore
//     );
// }

function renderTopList(
    containerId,
    entries,
    scoreFn = entry => entry.total_score
) {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

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
                        ${entry.media_type.toUpperCase()} RECORD
                    </div>

                    <h3>${entry.title}</h3>

                </div>

                <div class="report-value">
                    ${
                    containerId === "recent-archive-list"
                        ? entry.date_consumed
                        : `${scoreFn(entry).toFixed(1)}%`
                    }
                </div>

            </div>
        `;

        container.appendChild(item);
    });
}