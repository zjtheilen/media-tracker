async function apiRequest(endpoint, options = {}) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        options
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "API request failed"
        );
    }

    return data;
}


async function getEntries() {
    return await apiRequest("/entries");
}

async function getEntry(id) {
    return await apiRequest(`/entries/${id}`);
}

async function getGenres() {
    return await apiRequest("/genres");
}

async function getScoringProfiles() {
    return await apiRequest("/scoring-profile");
}

async function getStats() {
    return await apiRequest("/stats");
}