async function renderTopRatedOverall() {
    const entries = await getEntries();

    const topFive = [...entries].sort((a, b) => b.total_score - a.total_score).slice(0, 5);

    renderTopList(
        "top-rated-overall-list",
        topFive
    );
}

async function renderTopBooks() {
    const entries = await getEntries();

    const topBooks = entries.filter(entry => entry.media_type === "book").sort((a, b) => b.total_score - a.total_score).slice(0, 5);

    renderTopList("top-books-list", topBooks);
}

async function renderTopMovies() {
    const entries = await getEntries();

    const topMovies = entries.filter(entry => entry.media_type === "video").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("top-movies-list", topMovies);
}

async function renderTopGames() {
    const entries = await getEntries();

    const topGames = entries.filter(entry => entry.media_type === "game").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("top-games-list", topGames);
}

async function renderMostThoughtProvoking() {
    const entries = await getEntries();

    const topThoughts = entries.filter(entry => entry.media_type === "video").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("thought-provoking-list", topThoughts);
}

async function renderHighestWritingScore() {
    const entries = await getEntries();

    const topWriting = entries.filter(entry => entry.media_type === "game").sort((a, b) => b.total_score - a.total_score).slice(0, 5);
    
    renderTopList("highest-writing-list", topWriting);
}

function renderTopList(containerId, entries) {
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    entries.forEach((entry, index) => {
        const card = document.createElement("div");

        // card.className = "top-list-card";

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