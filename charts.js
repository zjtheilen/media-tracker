Chart.defaults.color = ARCHIVE_COLORS.text;
Chart.defaults.borderColor = ARCHIVE_COLORS.grid;
Chart.defaults.font.family = "monospace";
Chart.defaults.animation.duration = 800;

function destroyChart(id) {
    if (chartInstances[id]) {
        chartInstances[id].destroy();
        delete chartInstances[id];
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

    destroyChart("media-distribution");

    chartInstances["media-distribution"] = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ARCHIVE_COLORS.palette,
                    borderColor: "#0b0f0e",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            plugins: {
                title: {
                    display: true,
                    text: "Media Distribution",
                },
                legend: {
                    position: "bottom",
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                },

                y: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                }
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

    const ctx = document.getElementById("avg-score-chart").getContext("2d");

    destroyChart("avg-score");

    chartInstances["avg-score"] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Average Score",
                    data: averages,
                    backgroundColor: "rgba(127,174,135,0.9)",
                    borderColor: "#0b0f0e",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            scales: {
                x: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                },

                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Average Evaluation Index by Classification",
                }
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

    destroyChart("monthly-completion");

    chartInstances["monthly-completion"] = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Entries Completed",
                data,
                backgroundColor: "rgba(197,155,74,0.9)"
            }],
        },
        options: {
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            scales: {
                x: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Archive Activity by Month",
                }
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

    destroyChart("rating-distribution");

    chartInstances["rating-distribution"] = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Number of Entries",
                    data,
                    backgroundColor: "rgba(127,174,135,0.9)",
                },
            ],
        },
        options: {
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            scales: {
                x: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Evaluation Index Distribution",
                }
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

    destroyChart("genre-average-ratings");

    chartInstances["genre-average-ratings"] = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Average Rating",
                    data,
                    backgroundColor: "rgba(197,155,74,0.9)",
                    borderColor: "#0b0f0e",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            animation: {
                duration: 800,
                easing: "easeOutQuart"
            },
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                },

                y: {
                    ticks: {
                        color: ARCHIVE_COLORS.muted
                    },
                    grid: {
                        color: ARCHIVE_COLORS.grid
                    }
                }
            },
            plugins: {
                legend: {
                    display:false
                },
                title:{
                    display:true,
                    text:"Average Rating"
                }
            }
        },
    });

}

async function renderFavoriteMediaType() {
    const entries = await getEntries();

    const grouped = groupEntries(
        entries,
        entry => entry.media_type
    );

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

function formatChartLabel(category) {
    return category
        .split("_")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}


function renderUniversalScoreChart(entry, canvas) {

    if (!canvas) return;

    destroyChart(`universal-${entry.id}`);

    const labels = Object.keys(entry.universal_scores)
        .map(formatChartLabel);

    const data = Object.values(entry.universal_scores);


    chartInstances[`universal-${entry.id}`] =
        new Chart(canvas, {

            type: "radar",

            data: {
                labels,

                datasets: [{
                    label: "Universal Evaluation",
                    data,

                    backgroundColor:
                        "rgba(127,174,135,0.25)",

                    borderColor:
                        "rgba(127,174,135,1)",

                    borderWidth: 2,
                }]
            },

            options: {
                animation: {
                    duration: 800,
                    easing: "easeOutQuart"
                },

                scales: {
                    r: {
                        min: 0,
                        max: 10,
                        ticks: {
                            color: ARCHIVE_COLORS.muted
                        },
                        grid: {
                            color: ARCHIVE_COLORS.grid
                        }
                    }
                },

                plugins: {
                    legend: {
                        display: false
                    }
                },

                responsive: true,
                maintainAspectRation: false,
            }
        });
}

function renderMediaScoreChart(entry, canvas) {

    if (!canvas) return;


    destroyChart(`media-${entry.id}`);


    const labels = Object.keys(entry.media_scores)
        .map(formatChartLabel);

    const data = Object.values(entry.media_scores);


    chartInstances[`media-${entry.id}`] =
        new Chart(canvas, {

            type: "bar",

            data: {
                labels,

                datasets: [{
                    label: "Media Evaluation",
                    data,

                    backgroundColor:
                        "rgba(197,155,74,0.9)",

                    borderColor:
                        "#0b0f0e",

                    borderWidth: 2
                }]
            },

            options: {
                animation: {
                    duration: 800,
                    easing: "easeOutQuart"
                },

                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        ticks: {
                            color: ARCHIVE_COLORS.muted
                        },
                        grid: {
                            color: ARCHIVE_COLORS.grid
                        }
                    },

                    x: {
                        ticks: {
                            color: ARCHIVE_COLORS.muted
                        },
                        grid: {
                            color: ARCHIVE_COLORS.grid
                        }
                    }
                },

                plugins: {
                    legend: {
                        display:false
                    }
                },

                responsive: true,
                maintainAspectRation: false,
            }
        });
}