const form = document.getElementById("entry-form");

const scoringProfiles = {
  video: [
    "Writing",
    "Pacing",
    "Originality",
    "Engagement",
    "Thought Provoking",
    "Emotional Impact",
    "Sound",
    "Acting",
    "Cinematography",
  ],
  book: [
    "Writing",
    "Pacing",
    "Originality",
    "Engagement",
    "Thought Provoking",
    "Emotional Impact",
    "Setting",
    "Curiosity",
    "Formatting",
  ],
  game: [
    "Writing",
    "Pacing",
    "Originality",
    "Engagement",
    "Thought Provoking",
    "Emotional Impact",
    "Sound",
    "Gameplay",
    "Art",
  ],
};

const PRIMARY_GENRES = [
  "horror",
  "sci-fi",
  "fantasy",
  "romance",
  "comedy",
  "thriller",
  "mystery",
  "drama",
  "action",
  "adventure",
  "crime",
  "psychological",
  "slice of life",
  "satire",
];

const GAME_GENRES = [
  "rpg",
  "puzzle",
  "platformer",
  "shooter",
  "strategy",
  "racing",
  "simulation",
  "visual novel",
  "fighting",
  "beat 'em up",
  "stealth",
  "survial",
  "rhythm",
  "battle royale",
  "metroidvania",
  "sports",
  "party",
];

let editingEntryId = null;

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

    renderGenres(mediaTypeSelect.value);
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
    const scoreValue = existingScores[category.toLowerCase()] || 5;

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
          max="5"
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
      const max = 5;
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

mediaTypeSelect.addEventListener("change", () => {
  renderScoreInputs(mediaTypeSelect.value);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (submitBtn.disabled) return;

  clearMessage();

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  const genreSelect = document.getElementById("genres");

  const selectedGenres = Array.from(genreSelect.selectedOptions).map(
    (opt) => opt.value,
  );

  const data = {
    title: document.getElementById("title").value.trim(),
    media_type: document.getElementById("media-type").value,
    genres: selectedGenres,
    notes: document.getElementById("notes").value,
    date_consumed: document.getElementById("date-consumed").value || null,
    completion_status: document.getElementById("completion-status").value,
  };

  // VALIDATION

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

  // SCORES

  const scores = {};
  const categories = scoringProfiles[data.media_type];

  categories.forEach((category) => {
    const slider = document.getElementById(category);

    scores[category.toLowerCase()] = Number(slider.value);
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

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   clearMessage();

//   if (!data.title.trim()) {
//     showError("Title is required.");
//     submitBtn.disabled = false;
//     updateSubmitButton();
//     return;
//   }

//   const genreSelect = document.getElementById("genres");

//   const selectedGenres = Array.from(genreSelect.selectedOptions).map(
//     (opt) => opt.value,
//   );

//   if (selectedGenres.length === 0) {
//     showError("Select at least 1 genre.");
//     submitBtn.disabled = false;
//     updateSubmitButton();
//     return;
//   }

//   if (selectedGenres.length > 3) {
//     showError("Select up to 3 genres only.");
//     submitBtn.disabled = false;
//     updateSubmitButton();
//     return;
//   }

//   submitBtn.disabled = true;
//   submitBtn.textContent = "Saving...";

//   const data = {
//     title: document.getElementById("title").value,
//     media_type: document.getElementById("media-type").value,
//     genres: selectedGenres,
//     notes: document.getElementById("notes").value,
//     date_consumed: document.getElementById("date-consumed").value || null,
//     completion_status: document.getElementById("completion-status").value,
//   };

//   const scores = {};
//   const categories = scoringProfiles[data.media_type];

//   categories.forEach((category) => {
//     const slider = document.getElementById(category);
//     scores[category.toLowerCase()] = Number(slider.value);
//   });

//   data.scores = scores;

//   let response;

//   if (editingEntryId) {
//     response = await fetch(`http://127.0.0.1:8000/entries/${editingEntryId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     editingEntryId = null; // IMPORTANT: reset after edit
//   } else {
//     response = await fetch("http://127.0.0.1:8000/entries/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   }

// //   const result = await response.json();
// //   console.log(result);

//   const result = await response.json();

//     if (!response.ok) {
//         showError(result.detail || "Something went wrong.");
//         return;
//     }

//     showSuccess(editingEntryId ? "Entry updated successfully!" : "Entry added successfully!");

//     console.log(result);

//     submitBtn.disabled = false;
//     updateSubmitButton();

//   resetFormState();
//   await loadEntries();
// });

const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => modal.showModal();
closeBtn.onclick = () => resetFormState();

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let pendingDeleteId = null;

async function loadEntries() {
  const response = await fetch("http://127.0.0.1:8000/entries/");
  const entries = await response.json();

  const container = document.getElementById("entries-container");
  container.innerHTML = "";

  entries.forEach((entry) => {
    const div = document.createElement("div");

    const percentScore = ((entry.total_score / 5) * 100).toFixed(0);

    div.innerHTML = `
            <div id="entries-head" class="row" style="display: flex;">
                <div id="head-top-row-left" style="width: 50%; ">
                    <div id="entry-details">
                        <h3>${entry.title}</h3>

                        <p><strong>Date:</strong></br> ${entry.date_consumed || "N/A"}</p>
                        <p><strong>Type:</strong></br> ${entry.media_type}</p>
                        <p><strong>Genres:</strong></br> ${entry.genres.join(", ")}</p>

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
        labels: Object.keys(entry.scores),
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
            max: 5,
          },
        },
      },
    });
  });
}

loadEntries();

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

const genreSelect = document.getElementById("genres");

function renderGenres(mediaType) {
  genreSelect.innerHTML = "";

  const base = [...PRIMARY_GENRES];

  const extra = mediaType === "game" ? GAME_GENRES : [];

  const allGenres = [...base, ...extra];

  allGenres.forEach((g) => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    genreSelect.appendChild(option);
  });
}

renderGenres(mediaTypeSelect.value);



async function startEdit(id) {
    const response = await fetch(`http://127.0.0.1:8000/entries/${id}`);
    const entry = await response.json();

    editingEntryId = id;

    document.getElementById("title").value = entry.title;
    document.getElementById("media-type").value = entry.media_type;
    document.getElementById("notes").value = entry.notes || "";
    document.getElementById("date-consumed").value = entry.date_consumed || "";
    document.getElementById("completion-status").value = entry.completion_status || "completed";

    submitBtn.textContent = "Save Changes";

    renderScoreInputs(entry.media_type, entry.scores);

    document.getElementById("entryModal").showModal();

    renderGenres(mediaTypeSelect.value);

    const genreSelect = document.getElementById("genres");

    Array.from(genreSelect.options).forEach((option) => {
        option.selected = entry.genres.includes(option.value);
    });

    mediaTypeSelect.addEventListener("change", () => {
        renderScoreInputs(mediaTypeSelect.value, {});
        renderGenres(mediaTypeSelect.value);
    });
}

