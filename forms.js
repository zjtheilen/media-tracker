const form = document.getElementById("entry-form");
const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("form-message");

function createScoreSection(title) {
    const section = document.createElement("div");

    section.innerHTML = `
        <h3 class="score-section-title">
            ${title}
        </h3>
    `;

    scoreContainer.appendChild(section);
}

function renderScoreCategoryList(categories, existingScores) {
    categories.forEach((category) => {
        const normalizedKey = category.toLowerCase().replaceAll(" ", "_");

        const scoreValue = existingScores[normalizedKey] || 5;

        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
            <div class="score-row">
                <label class="score-input-label" for="${category}">
                    ${formatScoreCategory(category)}:
                    <span id="${category}-value">${scoreValue}</span>
                </label>

                <input 
                    type="range"
                    min="1"
                    max="10"
                    value="${scoreValue}"
                    id="${category}"
                    class="score-input-slider"
                >
            </div>
        `;

        scoreContainer.appendChild(wrapper);

        const slider = document.getElementById(category);
        const valueDisplay = document.getElementById(`${category}-value`);

        slider.addEventListener("input", () => {
            valueDisplay.textContent = slider.value;
        });
    });
}

function renderScoreInputs(mediaType, existingScores = {}) {

    scoreContainer.innerHTML = "";

    const universalCategories =
        scoringProfiles.universal.categories;

    const mediaCategories =
        Object.keys(scoringProfiles.media[mediaType]);


    createScoreSection("Universal Evaluation");

    renderScoreCategoryList(
        universalCategories,
        existingScores
    );


    createScoreSection(
        `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Evaluation`
    );

    renderScoreCategoryList(
        mediaCategories,
        existingScores
    );
}

function renderGenreSelector(mediaType) {
    const container = document.getElementById("genre-selector");

    container.innerHTML = "";

    const coreGenres = genreRegistry.core || [];
    const mediaGenres = genreRegistry[mediaType] || [];

    const allGenres = [...new Set([...coreGenres, ...mediaGenres])];

    allGenres.forEach((genre) => {
        const chip = document.createElement("button");

        chip.type = "button";

        chip.className = "genre-select-chip";

        if (selectedGenres.includes(genre)) {
            chip.classList.add("selected");
        }

        chip.textContent = genre;

        chip.addEventListener("click", () => {
            toggleGenre(genre);
        });

        container.appendChild(chip);
    });
}

function toggleGenre(genre) {
    if (selectedGenres.includes(genre)) {
        selectedGenres = selectedGenres.filter((g) => g !== genre);
    } else {
        if (selectedGenres.length >= 3) {
            showError("Maximum 3 genres allowed");
            return;
        }

        selectedGenres.push(genre);
    }
    clearMessage();

    renderGenreSelector(mediaTypeSelect.value);
}

function formatScoreCategory(category) {
    return category
        .split("_")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

async function startEdit(id) {
    const entry = await getEntry(id);

    editingEntryId = id;

    document.getElementById("title").value = entry.title;
    document.getElementById("media-type").value = entry.media_type;
    document.getElementById("notes").value = entry.notes || "";
    document.getElementById("date-consumed").value = entry.date_consumed || "";

    submitBtn.textContent = "Save Changes";

    renderScoreInputs(entry.media_type, entry.scores);

    document.getElementById("entryModal").showModal();

    selectedGenres = [...entry.genres];

    renderGenreSelector(entry.media_type);

    refreshIcons();
}

function resetFormState() {
    editingEntryId = null;

    form.reset();

    selectedGenres = [];
    renderGenreSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value, {});

    clearMessage();

    updateSubmitButton();
    submitBtn.disabled = false;
}

function updateSubmitButton() {
    submitBtn.textContent = editingEntryId ? "Save Changes" : "Add Entry";
}

function showError(message) {
    formMessage.textContent = message;
    formMessage.className = "error";
}

function showSuccess(message) {
    formMessage.textContent = message;
    formMessage.className = "success";
}

function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submitBtn.disabled) return;

    clearMessage();

    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    const data = {
        title: document.getElementById("title").value.trim(),
        media_type: document.getElementById("media-type").value,
        genres: selectedGenres,
        notes: document.getElementById("notes").value,
        date_consumed: document.getElementById("date-consumed").value || null,
    };

    if (!data.title) {
        showError("Title is required.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    if (selectedGenres.length === 0) {
        showError("Select at least 1 genre.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    if (selectedGenres.length > 3) {
        showError("Select up to 3 genres only.");

        submitBtn.disabled = false;
        updateSubmitButton();
        return;
    }

    const scores = {};

    const universalCategories =
        scoringProfiles.universal.categories;

    const mediaCategories =
        Object.keys(scoringProfiles.media[data.media_type]);


    [
        ...universalCategories,
        ...mediaCategories
    ].forEach((category) => {

        const slider = document.getElementById(category);

        scores[category] = Number(slider.value);

    });

    data.scores = scores;

    try {
        if (editingEntryId) {
            await updateEntry(editingEntryId, data);
        } else {
            await createEntry(data);
        }

        resetFormState();

        await refreshApp();

    } catch (error) {
        showError(error.message || "Something went wrong.");
    } finally {
        submitBtn.disabled = false;
        updateSubmitButton();
    }
});