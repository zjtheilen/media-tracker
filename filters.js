function renderGenreFilters() {

    const container =
        document.getElementById("genre-filters");

    container.innerHTML = `

        <input
            id="genre-search-input"
            class="genre-search-input"
            placeholder="Search genres..."
        >

        <div id="genre-filter-results"></div>

    `;


    const search =
        document.getElementById(
            "genre-search-input"
        );


    search.addEventListener(
        "input",
        (event) => {

            genreSearchQuery =
                event.target.value
                    .toLowerCase()
                    .trim();

            renderGenreFilterResults();

        }
    );


    renderGenreFilterResults();

}

function renderGenreFilterResults() {

    const container =
        document.getElementById(
            "genre-filter-results"
        );

    container.innerHTML = "";

    renderGenreFilterSelector({
        container,
        genreRegistry,
        selectedGenre:
            activeGenreFilter,
        searchQuery:
            genreSearchQuery,
        onSelect:
            (genre) => {
                toggleGenreFilter(genre);
            }
    });
}

function renderGenreFilterSelector({
    container,
    genreRegistry,
    selectedGenre = null,
    onSelect,
    searchQuery = "",
}) {

    const genreGroups = {
        Core: genreRegistry.core || [],
        Games: genreRegistry.game || [],
        Books: genreRegistry.book || [],
        Video: genreRegistry.video || [],
    };


    Object.entries(genreGroups)
        .forEach(([name, genres]) => {

            const filteredGenres =
                genres.filter((genre) =>
                    genre
                        .toLowerCase()
                        .includes(searchQuery)
                );


            if (
                searchQuery &&
                filteredGenres.length === 0
            ) {
                return;
            }

            const section =
                document.createElement("div");

            section.className =
                "genre-filter-section";


            const isSearching =
                searchQuery.length > 0;


            const isExpanded =
                isSearching
                    ? filteredGenres.length > 0
                    : expandedGenreGroups[name];


            section.innerHTML = `
                <div class="genre-group-header">
                    ${isExpanded ? "▼" : "▶"} ${name} (${searchQuery ? filteredGenres.length : genres.length})
                </div>
            
                <div class="genre-filter-group"></div>
            `;


            const chipContainer =
                section.querySelector(
                    ".genre-filter-group"
                );


            if (isExpanded) {

                chipContainer.classList.add("expanded");

                filteredGenres.forEach((genre) => {

                    const normalized =
                        genre.toLowerCase();


                    const btn =
                        document.createElement("button");


                    btn.textContent =
                        genre;


                    btn.className =
                        "genre-filter-chip";


                    if (
                        selectedGenre === normalized
                    ) {
                        btn.classList.add("active");
                    }


                    btn.addEventListener(
                        "click",
                        () => {
                            onSelect(normalized);
                        }
                    );


                    chipContainer.appendChild(btn);

                });

            } else {
                chipContainer.classList.remove("expanded");
            }


            const header =
                section.querySelector(
                    ".genre-group-header"
                );


            header.addEventListener(
                "click",
                () => {

                    expandedGenreGroups[name] =
                        !expandedGenreGroups[name];

                    renderGenreFilters();

                }
            );


            container.appendChild(section);

        });
}

function toggleGenreFilter(genre) {

    const normalized = genre.toLowerCase();

    if (activeGenreFilter === normalized) {
        activeGenreFilter = null;
    } else {
        activeGenreFilter = normalized;
    }
    Object.entries(genreRegistry)
        .forEach(([group, genres]) => {

            if (
                genres.includes(normalized)
            ) {
                expandedGenreGroups[
                    group.charAt(0).toUpperCase() + group.slice(1)
                ] = true;
            }

        });

    renderGenreFilters();
    renderActiveFilters();
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
        searchTag.textContent = `Search Archive: "${searchQuery}"`; searchTag.textContent = `Search: "${searchQuery}"`;
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

function toggleGenreGroup(group) {

    expandedGenreGroups[group] =
        !expandedGenreGroups[group];

    renderGenreFilters();

}