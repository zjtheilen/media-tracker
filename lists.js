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