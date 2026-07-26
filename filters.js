function renderGenreFilters() {

    const container =
        document.getElementById("genre-filters");

    container.innerHTML = `

        <div class="search-input-wrapper">
    
            <input
                id="genre-search-input"
                class="genre-search-input"
                placeholder="Search genres..."
                value="${genreSearchQuery}"
            >
    
            <button
                id="genre-search-clear"
                class="search-clear-btn"
                type="button"
            >
                ×
            </button>
    
        </div>
    
        <div id="genre-filter-results"></div>
    
    `;


    const search =
        document.getElementById(
            "genre-search-input"
        );

    const clear =
        document.getElementById(
            "genre-search-clear"
        );


    clear.style.display =
        genreSearchQuery
            ? "block"
            : "none";


    search.addEventListener(
        "input",
        () => {

            clear.style.display =
                search.value
                    ? "block"
                    : "none";

        }
    );


    clear.addEventListener(
        "click",
        () => {

            genreSearchQuery = "";

            search.value = "";

            clear.style.display = "none";

            renderGenreFilterResults();

            search.focus();

        }
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
        selectedGenres:
            activeGenreFilters,
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
    selectedGenres = [],
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
                        selectedGenres.includes(normalized)
                    ) {
                        btn.classList.add("active");
                    }


                    btn.addEventListener(
                        "click",
                        () => {

                            onSelect(normalized);

                            renderGenreFilterResults();

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

    if (
        activeGenreFilters.includes(genre)
    ) {

        activeGenreFilters =
            activeGenreFilters.filter(
                (g) => g !== genre
            );

    } else {

        activeGenreFilters.push(genre);

    }

    renderGenreFilterResults();
    renderActiveFilters();
    loadEntries();
}

function renderActiveFilters() {
    const container = document.getElementById("active-filters");
    container.innerHTML = "";

    const hasSearch = searchQuery.trim() !== "";
    const hasGenre = activeGenreFilters.length > 0;

    if (!hasSearch && !hasGenre) return;

    const wrapper = document.createElement("div");

    wrapper.className = "flex-row";

    if (hasSearch) {
        const searchTag = document.createElement("span");
        searchTag.textContent = `Search: "${searchQuery}"`;
        searchTag.className = "filter-tag";
        wrapper.appendChild(searchTag);
    }

    if (hasGenre) {
        activeGenreFilters.forEach((genre) => {
            const genreTag =
                document.createElement("span");
            genreTag.textContent =
                `Genre: ${genre}`;
            genreTag.className =
                "filter-tag";
            wrapper.appendChild(genreTag);
        });

    }

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Filters";

    clearBtn.addEventListener("click", () => {
        searchQuery = "";
        activeGenreFilters = [];

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


    const searchInput =
        document.getElementById("search-input");


    searchInput.addEventListener(
        "input",
        (event) => {

            searchQuery =
                event.target.value
                    .toLowerCase()
                    .trim();

            updateClearButton(
                "search-input",
                "search-clear"
            );

            loadEntries();
        }
    );


    document
        .getElementById("search-clear")
        .addEventListener(
            "click",
            () => {

                searchQuery = "";

                searchInput.value = "";

                updateClearButton(
                    "search-input",
                    "search-clear"
                );

                loadEntries();

                searchInput.focus();

            }
        );


    updateClearButton(
        "search-input",
        "search-clear"
    );

    renderActiveFilters();

}

function toggleGenreGroup(group) {

    expandedGenreGroups[group] =
        !expandedGenreGroups[group];

    renderGenreFilters();

}

function updateClearButton(inputId, buttonId) {

    const input =
        document.getElementById(inputId);

    const button =
        document.getElementById(buttonId);

    if (!input || !button) return;

    button.style.display =
        input.value
            ? "block"
            : "none";
}