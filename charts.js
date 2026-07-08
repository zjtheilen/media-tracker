// function groupEntries(entries, keySelector) {
//     const groups = {};

//     entries.forEach((entry) => {
//         const key = keySelector(entry);

//         if (key == null) {
//             return;
//         }

//         if (!groups[key]) {
//             groups[key] = [];
//         }

//         groups[key].push(entry);
//     });

//     return groups;
// }

function destroyChart(id) {
    if (chartInstances[id]) {
        chartInstances[id].destroy();
    }
}

function calculateAverage(entries) {
    return (
        entries.reduce(
            (sum, entry) => sum + entry.total_score,
            0
        ) / entries.length
    );
}

function groupEntries(entries, keySelector) {
    return entries.reduce((groups, entry) => {
        const keys = keySelector(entry);

        const normalizedKeys = Array.isArray(keys)
            ? keys
            : [keys];

        normalizedKeys.forEach((key) => {
            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(entry);
        });

        return groups;
    }, {});
}

async function renderMediaDistributionChart() {
    const stats = await getStats();

    const ctx = document
        .getElementById("media-distribution-chart")
        .getContext("2d");

    const labels = Object.keys(stats.media_type_counts);
    const data = Object.values(stats.media_type_counts);

    const MEDIA_COLORS_ARRAY = Object.keys(MEDIA_TYPE_COLORS).map(
        (key) => MEDIA_TYPE_COLORS[key].border,
    );

    destroyChart("media-distribution");

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
    const entries = await getEntries();

    const grouped = groupEntries(
        entries,
        entry => entry.media_type
    );

    const labels = Object.keys(grouped);

    const averages = labels.map((type) =>
        Number(calculateAverage(grouped[type]).toFixed(2))
    );

    // const grouped = {};

    // entries.forEach((entry) => {
    //     if (!grouped[entry.media_type]) {
    //         grouped[entry.media_type] = [];
    //     }

    //     grouped[entry.media_type].push(entry.total_score);
    // });
    // const grouped = groupEntries(entries, (entry) => entry.media_type);

    // const labels = Object.keys(grouped);
    // // const averages = labels.map((type) => {
    // //     const scores = grouped[type];
    // //     const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    // //     return Number(avg.toFixed(2));
    // // });
    // const averages = labels.map((type) => {
    //     const mediaEntries = grouped[type];

    //     const avg =
    //         mediaEntries.reduce((sum, entry) => sum + entry.total_score, 0) /
    //         mediaEntries.length;

    //     return Number(avg.toFixed(2));
    // });

    const ctx = document.getElementById("avg-score-chart").getContext("2d");

    destroyChart("media-distribution");

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

async function renderMonthlyCompletionChart() {
    const entries = await getEntries();

    const monthlyCounts = {};

    entries.forEach((entry) => {
        if (!entry.date_consumed) return;

        const month = entry.date_consumed.slice(0, 7);

        if (!monthlyCounts[month]) {
            monthlyCounts[month] = 0;
        }

        monthlyCounts[month]++;
    });

    const labels = Object.keys(monthlyCounts).sort();
    const data = labels.map((month) => monthlyCounts[month]);

    const ctx = document.getElementById("monthly-completion-chart").getContext("2d");

    destroyChart("media-distribution");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Entries Completed",
                data,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0,
                },
            },
        },
    });
}

async function renderRatingDistributionChart() {
    const entries = await getEntries();

    const buckets = {
        "90-100": 0,
        "80-89": 0,
        "70-79": 0,
        "60-69": 0,
        "Below 60": 0,
    };

    entries.forEach((entry) => {
        const score = entry.total_score;

        if (score >= 90) {
            buckets["90-100"]++;
        } else if (score >= 80) {
            buckets["80-89"]++;
        } else if (score >= 70) {
            buckets["70-79"]++;
        } else if (score >= 60) {
            buckets["60-69"]++;
        } else {
            buckets["Below 60"]++;
        }
    });

    const labels = Object.keys(buckets);
    const data = Object.values(buckets);

    const ctx = document.getElementById("rating-distribution-chart").getContext("2d");

    destroyChart("media-distribution");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Number of Entries",
                    data,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0,
                },
            },
        },
    });
}

async function renderGenreAverageRatingsChart() {
    const entries = await getEntries();

    const genreGroups = groupEntries(
        entries.filter(entry => Array.isArray(entry.genres)),
        entry => entry.genres
    );

    // const genreScores = {};

    // entries.forEach((entry) => {
    //     if (!Array.isArray(entry.genres)) return;

    //     entry.genres.forEach((genre) => {
    //         if (!genreScores[genre]) {
    //             genreScores[genre] = [];
    //         }

    //         genreScores[genre].push(entry.total_score);
    //     });
    // });

    // const genreAverages = {};

    // Object.keys(genreScores).forEach((genre) => {
    //     const scores = genreScores[genre];

    //     const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    //     genreAverages[genre] = Number(average.toFixed(2));
    // });
    const genreAverages = {};

    Object.keys(genreGroups).forEach((genre) => {
        const genreEntries = genreGroups[genre];

        const average =
            genreEntries.reduce(
                (sum, entry) => sum + entry.total_score,
                0
            ) / genreEntries.length;

        genreAverages[genre] = Number(average.toFixed(2));
    });

    const sortedGenres = Object.keys(genreAverages).sort(
        (a, b) => genreAverages[b] - genreAverages[a]
    );

    const labels = sortedGenres;
    const data = sortedGenres.map((genre) => genreAverages[genre]);

    const ctx = document.getElementById("genre-average-ratings-chart").getContext("2d");

    destroyChart("media-distribution");
    
    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Average Rating",
                    data,
                    backgroundColor: "rgba(54,162,235,0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                },
            },
        },
    });

}

async function renderFavoriteMediaType() {
    const entries = await getEntries();

    const grouped = groupEntries(
        entries,
        entry => entry.media_type
    );

    // const grouped = groupEntries(entries, (entry) => entry.media_type);

    // const grouped = {};

    // entries.forEach((entry) => {
    //     if (!grouped[entry.media_type]) {
    //         grouped[entry.media_type] = [];
    //     }

    //     grouped[entry.media_type].push(entry.total_score);
    // });

    // const averages = {}

    // Object.keys(grouped).forEach((type) => {
    //     const mediaEntries = grouped[type];

    //     averages[type] =
    //         mediaEntries.reduce((sum, entry) => sum + entry.total_score, 0) /
    //         mediaEntries.length;
    //     // const scores = grouped[type];

    //     // averages[type] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    // });

    const averages = {};

    Object.keys(grouped).forEach((type) => {
        averages[type] = calculateAverage(grouped[type]);
    });

    const favorite = Object.entries(averages).reduce((best, current) => {
        return current[1] > best[1] ? current : best;
    });

    const favoriteType = favorite[0];
    const favoriteAverage = favorite[1].toFixed(1);
    const favoriteCount = grouped[favoriteType].length;

    const card = document.getElementById("favorite-media-type-card");

    card.innerHTML = `
        <div>
            <h3>${favoriteType.charAt(0).toUpperCase() + favoriteType.slice(1)}</h3>

            <p><strong>Average Rating</strong></p>
            <p>${favoriteAverage}%</p>

            <p><strong>Entries</strong></p>
            <p>${favoriteCount}</p>
        </div>
    `;
}