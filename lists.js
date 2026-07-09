function getTopEntries(entries, scoreFn, limit = 5) {
    return [...entries]
        .sort((a, b) => scoreFn(b) - scoreFn(a))
        .slice(0, limit);
}

function calculateThoughtProvokingScore(entry) {
    const scores = entry.scores || {};

    const factors = [
        scores.depth,
        scores.originality,
        scores.emotional_impact
    ].filter(score => score !== undefined);

    if (factors.length === 0) {
        return 0;
    }

    return factors.reduce((sum, score) => sum + score, 0) / factors.length;
}

function calculateWritingScore(entry) {
    const scores = entry.scores || {};

    const factors = [
        scores.craft,
        scores.originality
    ].filter(score => score !== undefined);

    if (factors.length === 0) {
        return 0;
    }

    return factors.reduce((sum, score) => sum + score, 0) / factors.length;
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

    renderTopList(containerId, topEntries);
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

async function renderMostThoughtProvoking() {
    renderTopByFilter(
        "thought-provoking-list",
        () => true,
        calculateThoughtProvokingScore
    );
}

async function renderBestWritingScore() {
    renderTopByFilter(
        "highest-writing-list",
        () => true,
        calculateWritingScore
    );
}

function renderTopList(containerId, entries) {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    entries.forEach((entry, index) => {
        const item = document.createElement("div");
        item.className = "top-list-item"

        item.innerHTML = `
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

        container.appendChild(item);
    });
}