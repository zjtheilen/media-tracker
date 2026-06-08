const form = document.getElementById("entry-form");

const scoringProfiles = {
  video: [
    "Emotional Impact",
    "Depth",
    "Craft",
    "Engagement",
    "Presentation",
    "Originality",
  ],

  book: [
    "Emotional Impact",
    "Depth",
    "Craft",
    "Engagement",
    "Presentation",
    "Originality",
  ],

  game: [
    "Emotional Impact",
    "Depth",
    "Craft",
    "Engagement",
    "Presentation",
    "Originality",
  ],
};

let genreRegistry = {};

let editingEntryId = null;
let selectedGenres = [];

const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");

const submitBtn = document.getElementById("submitBtn");

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

renderScoreInputs(mediaTypeSelect.value);

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

      return `
        <span class="genre-chip">
          ${formatted}
        </span>
      `;
    })
    .join("");
}
mediaTypeSelect.addEventListener("change", () => {
  selectedGenres = [];

  renderScoreInputs(mediaTypeSelect.value, {});
  renderGenreSelector(mediaTypeSelect.value);
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

    console.log(result);

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

  renderGenreSelector(mediaTypeSelect.value);
  renderScoreInputs(mediaTypeSelect.value);

  await loadEntries();
  //   await loadMediaDistributionChart();
  await renderMediaDistributionChart();
  await renderAverageScoreByMediaTypeChart();
}

initializeApp();

async function loadEntries() {
  const response = await fetch("http://127.0.0.1:8000/entries/");
  const entries = await response.json();

  const container = document.getElementById("entries-container");
  container.innerHTML = "";

  entries.forEach((entry) => {
    const div = document.createElement("div");

    const percentScore = (entry.total_score).toFixed(0);

    div.innerHTML = `
            <div id="entries-head" class="row" style="display: flex;">
                <div id="head-top-row-left" style="width: 50%; ">
                    <div id="entry-details">
                        <h3>${entry.title}</h3>

                        <p><strong>Date:</strong></br> ${entry.date_consumed || "N/A"}</p>
                        <p><strong>Type:</strong></br> ${entry.media_type}</p>
                        <div class="genre-chip-container">
                            ${renderGenreChips(entry.genres)}
                        </div>

                        <p><strong>Total Score:</strong></br> ${percentScore}%</p>

                    </div>
                </div>
                <div id="head-top-row-right" style="width: 50%">
                    <div id="radar-container" style="width: 100%; margin: auto;">
                        <canvas id="chart-${entry.id}"></canvas>
                    </div>
                </div>
            </div>
            <div id="scores-and-notes" class="row">
                <div class="scores-block">
                    ${renderScoreBars(entry.scores || {})}
                </div>

                <p><strong>Notes:</strong> ${entry.notes}</p>
                <button onclick="startEdit('${entry.id}')">Edit</button>
                <button class="delete-btn" onclick="openDeleteModal('${entry.id}')">Delete</button>
            </div>
            <hr>
    `;

    container.appendChild(div);

    const ctx = document.getElementById(`chart-${entry.id}`).getContext("2d");

    radarDotColor = "";
    radarBorderColor = "";
    radarBackgroundColor = "";

    if (entry.media_type === "video") {
      radarDotColor = "rgba(255, 99, 132, 1)";
      radarBorderColor = "rgba(255, 99, 132, 1)";
      radarBackgroundColor = "rgba(255, 99, 132, 0.2)";
    } else if (entry.media_type === "book") {
      radarDotColor = "rgba(54, 162, 235, 1)";
      radarBorderColor = "rgba(54, 162, 235, 1)";
      radarBackgroundColor = "rgba(54, 162, 235, 0.2)";
    } else if (entry.media_type === "game") {
      radarDotColor = "rgba(255, 206, 86, 1)";
      radarBorderColor = "rgba(255, 206, 86, 1)";
      radarBackgroundColor = "rgba(255, 206, 86, 0.2)";
    }

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(entry.scores || {}),
        data: Object.values(entry.scores || {}),
        datasets: [
          {
            label: entry.title,
            data: Object.values(entry.scores),
            fill: true,
            backgroundColor: radarBackgroundColor,
            borderColor: radarBorderColor,
            pointBackgroundColor: radarDotColor,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            ticks: {
              display: false,
            },
            min: 1,
            max: 10,
          },
        },
      },
    });
  });
}

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

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0"],
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

  // Group scores by media type
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
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
          ],
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
