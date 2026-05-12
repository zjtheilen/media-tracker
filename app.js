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

const mediaTypeSelect = document.getElementById("media-type");
const scoreContainer = document.getElementById("score-container");

function renderScoreInputs(mediaType) {
  scoreContainer.innerHTML = "";

  const categories = scoringProfiles[mediaType];

  categories.forEach((category) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
    <div class="score-row">
                    <label style="width: 33%" for="${category}">
                        ${category}:
                        <span id="11${category}-value">3</span>
                    </label>

                    <input type="range" min="1" max="5" value="3" id="${category}" style="width: 67%">
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

  const data = {
    title: document.getElementById("title").value,
    media_type: document.getElementById("media-type").value,
    genre: document.getElementById("genre").value,
    notes: document.getElementById("notes").value,
  };

  const scores = {};

  const categories = scoringProfiles[data.media_type];

  categories.forEach((category) => {
    const slider = document.getElementById(category);
    scores[category] = Number(slider.value);
  });

  data.scores = scores;

  const response = await fetch("http://127.0.0.1:8000/entries/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log(result);

  await loadEntries();
});

const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = () => modal.showModal();
closeBtn.onclick = () => modal.close();

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
                        <p><strong>Genre:</strong></br> ${entry.genre}</p>

                        <p><strong>Total Score:</strong></br> ${percentScore}%</p>
                        <p><strong>Entry ID:</strong></br> ${entry.id}</p>

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
                <button class="delete-btn" onclick="openDeleteModal('${entry.id}')">Delete</button>
            </div>
            <hr>
    `;

    container.appendChild(div);

    const ctx = document.getElementById(`chart-${entry.id}`).getContext("2d");

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(entry.scores),
        datasets: [
          {
            label: entry.title,
            data: Object.values(entry.scores),
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