function renderGenreFilters() {
    const container = document.getElementById("genre-filters");
    container.innerHTML = "";

    const core = genreRegistry.core || [];
    const media = Object.values(genreRegistry).flat();

    const allGenres = [...new Set([...core, ...media])];

    allGenres.forEach((genre) => {
        const normalized = genre.toLowerCase();

        const btn = document.createElement("button");
        btn.textContent = genre;
        btn.className = "genre-filter-chip";

        if (activeGenreFilter === normalized) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            toggleGenreFilter(normalized);
        });

        container.appendChild(btn);
    });
    
}

function toggleGenreFilter(genre) {
    const normalized = genre.toLowerCase();

    if (activeGenreFilter === normalized) {
        activeGenreFilter = null;
    } else {
        activeGenreFilter = normalized;
    }

    renderGenreFilters();
    loadEntries();
}

function renderActiveFilters() {
    const container = document.getElementById("active-filters");
    container.innerHTML = "";

    const hasSearch = searchQuery.trim() !== "";
    const hasGenre = activeGenreFilter !== null;

    if (!hasSearch && !hasGenre) return;

    const wrapper = document.createElement("div");

    wrapper.className = "flex-row";

    if (hasSearch) {
        const searchTag = document.createElement("span");
        searchTag.textContent = `Search Archive: "${searchQuery}"`;searchTag.textContent = `Search: "${searchQuery}"`;
        searchTag.className = "filter-tag";
        wrapper.appendChild(searchTag);
    }

    if (hasGenre) {
        const genreTag = document.createElement("span");
        genreTag.textContent = `Genre: ${activeGenreFilter}`;
        genreTag.className = "filter-tag";
        wrapper.appendChild(genreTag);
    }

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Filters";

    clearBtn.addEventListener("click", () => {
        searchQuery = "";
        activeGenreFilter = null;

        document.getElementById("search-input").value = "";

        loadEntries();
        renderGenreFilters();
    });

    wrapper.appendChild(clearBtn);

    container.appendChild(wrapper);
}

function initializeFilters() {

    document
        .getElementById("sort-select")
        .addEventListener("change", (event) => {
            activeSort = event.target.value;
            loadEntries();
        });


    document
        .getElementById("search-input")
        .addEventListener("input", (event) => {
            searchQuery = event.target.value.toLowerCase().trim();
            loadEntries();
        });

    renderActiveFilters();

}