const form = document.getElementById("entry-form");
const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("form-message");

function renderScoreInputs(mediaType, existingScores = {}) {
    scoreContainer.innerHTML = "";

    const categories = scoringProfiles[mediaType];

    if (!categories) {
        console.error("Missing scoring categories for:", mediaType);
        return;
    }

    categories.forEach((category) => {
        const normalizedKey = category.toLowerCase().replaceAll(" ", "_");

        const scoreValue = existingScores[normalizedKey] || 5;

        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
      <div class="score-row">
        <label style="width: 33%" for="${category}">
          ${category}:
          <span id="11${category}-value">${scoreValue}</span>
        </label>

        <input 
          type="range"
          min="1"
          max="10"
          value="${scoreValue}"
          id="${category}"
          style="width: 67%"
        >
      </div>
    `;

        scoreContainer.appendChild(wrapper);

        const slider = document.getElementById(category);
        const valueDisplay = document.getElementById(`11${category}-value`);

        slider.addEventListener("input", () => {
            valueDisplay.textContent = slider.value;
        });
    });
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

async function startEdit(id) {
    const entry = await getEntry(id);

    editingEntryId = id;

    document.getElementById("title").value = entry.title;
    document.getElementById("media-type").value = entry.media_type;
    document.getElementById("notes").value = entry.notes || "";
    document.getElementById("date-consumed").value = entry.date_consumed || "";
    document.getElementById("completion-status").value =
        entry.completion_status || "completed";

    submitBtn.textContent = "Save Changes";

    renderScoreInputs(entry.media_type, entry.scores);

    document.getElementById("entryModal").showModal();

    selectedGenres = [...entry.genres];

    renderGenreSelector(entry.media_type);
}

function resetFormState() {
    editingEntryId = null;

    form.reset();

    document.getElementById("completion-status").value = "completed";

    selectedGenres = [];
    renderGenreSelector(mediaTypeSelect.value);
    renderScoreInputs(mediaTypeSelect.value, {});

    clearMessage();

    updateSubmitButton();
    submitBtn.disabled = false;

    modal.close();
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
        completion_status: document.getElementById("completion-status").value,
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
    const categories = scoringProfiles[data.media_type];

    categories.forEach((category) => {
        const slider = document.getElementById(category);

        const normalizedKey = category.toLowerCase().replaceAll(" ", "_");

        scores[normalizedKey] = Number(slider.value);
    });

    data.scores = scores;

    try {
        let response;

        if (editingEntryId) {
            response = await fetch(
                `http://127.0.0.1:8000/entries/${editingEntryId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );
        } else {
            response = await fetch("http://127.0.0.1:8000/entries/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        const result = await response.json();

        if (!response.ok) {
            showError(result.detail || "Something went wrong.");
            return;
        }

        resetFormState();

        await loadEntries();
    } catch (error) {
        console.error(error);
        showError("Unable to save entry.");
    } finally {
        submitBtn.disabled = false;
        updateSubmitButton();
    }
});