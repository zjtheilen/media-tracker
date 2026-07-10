async function apiRequest(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            options
        );
    } catch {
        throw new Error("Unable to connect to the server.");
    }

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.detail ||
            data?.message ||
            "API request failed."
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

async function createEntry(data) {
    return await apiRequest("/entries/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}


async function updateEntry(id, data) {
    return await apiRequest(`/entries/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}


async function removeEntry(id) {
    return await apiRequest(`/entries/${id}`, {
        method: "DELETE",
    });
}