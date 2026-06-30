const form = document.getElementById("entry-form");

const MEDIA_TYPE_COLORS = {
  video: {
    border: "rgba(255, 99, 132, 1)",
    background: "rgba(255, 99, 132, 0.2)",
  },
  book: {
    border: "rgba(54, 162, 235, 1)",
    background: "rgba(54, 162, 235, 0.2)",
  },
  game: {
    border: "rgba(255, 206, 86, 1)",
    background: "rgba(255, 206, 86, 0.2)",
  },
};

let scoringProfiles = {};

let genreRegistry = {};

let editingEntryId = null;
let selectedGenres = [];

let activeGenreFilter = null;

let activeSort = "date_desc";

let searchQuery = "";

const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");

const submitBtn = document.getElementById("submitBtn");

async function loadScoringProfiles() {
  const response = await fetch("http://127.0.0.1:8000/scoring-profile");
  const data = await response.json();

  scoringProfiles = {
    video: data.categories,
    book: data.categories,
    game: data.categories,
  };
}

function updateSubmitButton() {
  submitBtn.textContent = editingEntryId ? "Save Changes" : "Add Entry";
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

const formMessage = document.getElementById("form-message");

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

function renderScoreBars(scores) {
  return Object.entries(scores)
    .map(([category, value]) => {
      const max = 10;
      const percent = (value / max) * 100;

      return `
            <div class="score-row">
                <span class="score-label">${category}</span>
                <div class="score-bar-bg">
                    <div class="score-bar-fill" style="width: ${percent}%"></div>
                </div>
                <span class="score-value">${value}</span>
            </div>
        `;
    })
    .join("");
}

function renderGenreChips(genres) {
  return genres
    .map((genre) => {
      const formatted = genre
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const isActive = activeGenreFilter === genre.toLowerCase();

      return `
        <span 
          class="genre-chip ${isActive ? "active-filter" : ""}"
          onclick="toggleGenreFilter('${genre.toLowerCase()}')"
          style="cursor: pointer;"
        >
          ${formatted}
        </span>
      `;
    })
    .join("");
}

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
    btn.className = "genre-btn";

    if (activeGenreFilter === normalized) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      toggleGenreFilter(normalized);
      renderGenreFilters(); // refresh UI state
    });

    container.appendChild(btn);
  });
}

function toggleGenreFilter(genre) {
  const normalized = genre.toLowerCase();

  if (activeGenreFilter === genre.toLowerCase()) {
    activeGenreFilter = null;
  } else {
    activeGenreFilter = genre.toLowerCase();
  }

  loadEntries();
}

function clearGenreFilter() {
  activeGenreFilter = null;
  loadEntries();
}

mediaTypeSelect.addEventListener("change", () => {
  selectedGenres = [];

  renderScoreInputs(mediaTypeSelect.value, {});
  renderGenreSelector(mediaTypeSelect.value);
});

document.getElementById("sort-select").addEventListener("change", (event) => {
  activeSort = event.target.value;
  loadEntries();
});

document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  loadEntries();
});

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

const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => modal.showModal();
closeBtn.onclick = () => resetFormState();

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let pendingDeleteId = null;

async function initializeApp() {
  await loadGenres();
  await loadScoringProfiles();

  renderGenreSelector(mediaTypeSelect.value);
  renderScoreInputs(mediaTypeSelect.value);

  renderGenreFilters();

  await loadEntries();

  await renderMediaDistributionChart();
  await renderAverageScoreByMediaTypeChart();
}

initializeApp();

async function loadEntries() {
  let url = "http://127.0.0.1:8000/entries/";

  const response = await fetch(url);

  const entries = await response.json();

  let workingEntries = [...entries];

  if (activeGenreFilter) {
    workingEntries = workingEntries.filter((entry) => {
      if (!Array.isArray(entry.genres)) return false;

      return entry.genres.some((g) => g === activeGenreFilter);
    });
  }

  if (searchQuery.trim() !== "") {
    workingEntries = workingEntries.filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery),
    );
  }

  console.log(
    workingEntries.map((e) => ({
      title: e.title,
      type: e.media_type,
    })),
  );

  workingEntries.sort((a, b) => {
    switch (activeSort) {
      case "date_desc":
        return new Date(b.date_consumed || 0) - new Date(a.date_consumed || 0);

      case "date_asc":
        return new Date(a.date_consumed || 0) - new Date(b.date_consumed || 0);

      case "score_desc":
        return b.total_score - a.total_score;

      case "score_asc":
        return a.total_score - b.total_score;

      case "title_asc":
        return a.title.localeCompare(b.title);

      case "title_desc":
        return b.title.localeCompare(a.title);

      case "media_type_asc":
        return a.media_type.localeCompare(b.media_type);

      case "media_type_desc":
        return b.media_type.localeCompare(a.media_type);

      default:
        return 0;
    }
  });

  console.log(
    "AFTER",
    workingEntries.map((e) => ({
      title: e.title,
      type: e.media_type,
    })),
  );

//   console.log("!!!!!!!!!!!!!!!!!!!!!!!");
//   console.log(workingEntries.map((e) => e.media_type));

  const container = document.getElementById("entries-container");
  container.innerHTML = "";

  if (workingEntries.length === 0) {
    container.innerHTML = `
    <div class="empty-state">
      <h3>No results found</h3>
      <p>Try adjusting your search or filters.</p>
    </div>
  `;
    return;
  }

  workingEntries.forEach((entry) => {
    const colors = MEDIA_TYPE_COLORS[entry.media_type] || {
      border: "rgba(150, 150, 150, 1)",
      background: "rgba(150, 150, 150, 0.2)",
    };

    const div = document.createElement("div");

    const percentScore = Number(entry.total_score).toFixed(1);

    div.className = "library-item";

    div.innerHTML = `
        <h3>${entry.title}</h3>
        <div class="library-meta">
            <span>${entry.media_type}</span>
            <span>${percentScore}</span>
        </div>
    `;

    div.style.cursor = "pointer";

    div.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      startEdit(entry.id);
    });

    container.appendChild(div);
  });

  renderActiveFilters();
}

renderActiveFilters();

async function deleteEntry(id) {
  await fetch(`http://127.0.0.1:8000/entries/${id}`, {
    method: "DELETE",
  });

  await loadEntries();
}

function openDeleteModal(id) {
  pendingDeleteId = id;
  deleteModal.showModal();
}

confirmDeleteBtn.onclick = async () => {
  await deleteEntry(pendingDeleteId);

  deleteModal.close();
  pendingDeleteId = null;
};

cancelDeleteBtn.onclick = () => {
  deleteModal.close();
  pendingDeleteId = null;
};

async function loadGenres() {
  const response = await fetch("http://127.0.0.1:8000/genres");
  genreRegistry = await response.json();
  renderGenreFilters();
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
  const response = await fetch(`http://127.0.0.1:8000/entries/${id}`);
  const entry = await response.json();

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

async function renderMediaDistributionChart() {
  const response = await fetch("http://127.0.0.1:8000/stats/");
  const stats = await response.json();

  const ctx = document
    .getElementById("media-distribution-chart")
    .getContext("2d");

  const labels = Object.keys(stats.media_type_counts);
  const data = Object.values(stats.media_type_counts);

  const MEDIA_COLORS_ARRAY = Object.keys(MEDIA_TYPE_COLORS).map(
    (key) => MEDIA_TYPE_COLORS[key].border,
  );

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: MEDIA_COLORS_ARRAY,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

async function renderAverageScoreByMediaTypeChart() {
  const response = await fetch("http://127.0.0.1:8000/entries/");
  const entries = await response.json();

  const grouped = {};

  entries.forEach((entry) => {
    if (!grouped[entry.media_type]) {
      grouped[entry.media_type] = [];
    }

    grouped[entry.media_type].push(entry.total_score);
  });

  const labels = Object.keys(grouped);
  const averages = labels.map((type) => {
    const scores = grouped[type];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Number(avg.toFixed(2));
  });

  const ctx = document.getElementById("avg-score-chart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Average Score",
          data: averages,
          backgroundColor: labels.map(
            (t) => MEDIA_TYPE_COLORS[t]?.background || "gray",
          ),
          borderColor: labels.map(
            (t) => MEDIA_TYPE_COLORS[t]?.border || "gray",
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function renderActiveFilters() {
  const container = document.getElementById("active-filters");
  container.innerHTML = "";

  const hasSearch = searchQuery.trim() !== "";
  const hasGenre = activeGenreFilter !== null;

  if (!hasSearch && !hasGenre) return;

  const wrapper = document.createElement("div");

  wrapper.style.display = "flex";
  wrapper.style.gap = "10px";
  wrapper.style.alignItems = "center";

  if (hasSearch) {
    const searchTag = document.createElement("span");
    searchTag.textContent = `Search: "${searchQuery}"`;
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
