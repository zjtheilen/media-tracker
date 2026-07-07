async function getEntries() {
    const response = await fetch("http://127.0.0.1:8000/entries");
    return await response.json();
}

async function getEntry(id) {
    const response = await fetch(`http://127.0.0.1:8000/entries/${id}`);
    return await response.json();
}

async function getGenres() {
    const response = await fetch("http://127.0.0.1:8000/genres");
    return await response.json();
}

async function getScoringProfiles() {
    const response = await fetch("http://127.0.0.1:8000/scoring-profile");
    return await response.json();
}

async function getStats() {
    const response = await fetch("http://127.0.0.1:8000/stats")
    return await response.json();
}