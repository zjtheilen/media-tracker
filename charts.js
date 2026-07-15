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

function calculateAverageScores(entries, scoreType) {
    const totals = {};
    const counts = {};

    entries.forEach((entry) => {
        const scores = entry[scoreType] || {};

        Object.entries(scores).forEach(([category, value]) => {
            totals[category] = (totals[category] || 0) + value;
            counts[category] = (counts[category] || 0) + 1;
        });
    });

    const averages = {};

    Object.keys(totals).forEach((category) => {
        averages[category] = Number(
            (totals[category] / counts[category]).toFixed(2)
        );
    });

    return averages;
}

function getTopCategories(averages, count = 2) {
    return Object.entries(averages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count);
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
                    display: false
                },
                title: {
                    display: true,
                    text: "Average Rating"
                }
            }
        },
    });

}

async function renderUniversalRadarChart() {

    const entries = await getEntries();

    const averages = calculateUniversalAverages(entries);

    const radarData = prepareRadarData(averages);

    const ctx = document
        .getElementById("universal-profile-radar")
        .getContext("2d");

    destroyChart("universal-profile-radar");


    chartInstances["universal-profile-radar"] = new Chart(ctx, {

        type: "radar",

        data: {
            labels: radarData.labels,

            datasets: [
                {
                    label: "Universal Evaluation Profile",
                    data: radarData.values,

                    backgroundColor: "rgba(127,174,135,0.25)",
                    borderColor: "rgba(127,174,135,1)",
                    borderWidth: 2,

                    pointBackgroundColor:
                        "rgba(127,174,135,1)",
                },
            ],
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            layout: {
                padding: {
                    top: 0,
                    bottom: 0
                }
            },

            scales: {
                r: {
                    min: 0,
                    max: 10,

                    ticks: {
                        color: ARCHIVE_COLORS.muted,
                        backdropColor: "transparent"
                    },

                    grid: {
                        color: ARCHIVE_COLORS.grid
                    },

                    angleLines: {
                        color: ARCHIVE_COLORS.grid
                    },

                    pointLabels: {
                        color: ARCHIVE_COLORS.text,
                        font: {
                            family: "monospace"
                        }
                    }
                }
            },

            plugins: {

                legend: {
                    display: false
                },

                title: {
                    display: true,
                    text: "Universal Evaluation Profile"
                }
            }
        }
    });
}

function calculateUniversalAverages(entries) {
    const totals = {};
    const counts = {};

    entries.forEach(entry => {
        Object.entries(entry.universal_scores || {})
            .forEach(([category, value]) => {

                if (!totals[category]) {
                    totals[category] = 0;
                    counts[category] = 0;
                }

                totals[category] += value;
                counts[category]++;
            });
    });

    return Object.keys(totals).reduce((result, category) => {
        result[category] =
            Number((totals[category] / counts[category]).toFixed(2));

        return result;
    }, {});
}

function prepareRadarData(averages) {
    const labels = Object.keys(averages).map(category =>
        formatScoreCategory(category)
    );

    const values = Object.values(averages);

    return {
        labels,
        values
    };
}

async function renderArchiveProfileCard() {

    const entries = await getEntries();

    const universalAverages =
        calculateAverageScores(
            entries,
            "universal_scores"
        );
    
    console.log(
        prepareRadarData(universalAverages)
    );

    const mediaAverages =
        calculateAverageScores(
            entries,
            "media_scores"
        );

    // console.log(universalAverages);
    // console.log(mediaAverages);

    const topUniversal = getTopCategories(universalAverages);
    const topMedia = getTopCategories(mediaAverages);

    // console.log(topUniversal);
    // console.log(topMedia);

    const card = document.getElementById("favorite-media-type-card");

    card.innerHTML = `
        <div class="archive-profile-card">

            <div class="archive-profile-layout">

                <div class="archive-profile-info">

                    <h3>Archive Profile</h3>

                    <p>
                        <strong>Primary Trait</strong><br>
                        ${formatScoreCategory(topUniversal[0][0])}
                    </p>

                    <p>
                        ${topUniversal[0][1].toFixed(2)} / 10
                    </p>


                    <p>
                        <strong>Secondary Trait</strong><br>
                        ${formatScoreCategory(topUniversal[1][0])}
                    </p>

                    <p>
                        ${topUniversal[1][1].toFixed(2)} / 10
                    </p>


                    <hr>


                    <p>
                        <strong>Media Signature</strong><br>
                        ${formatScoreCategory(topMedia[0][0])}
                    </p>

                    <p>
                        ${topMedia[0][1].toFixed(2)} / 10
                    </p>


                    <p>
                        <strong>Secondary Media Trait</strong><br>
                        ${formatScoreCategory(topMedia[1][0])}
                    </p>

                    <p>
                        ${topMedia[1][1].toFixed(2)} / 10
                    </p>

                </div>


                <div class="archive-profile-chart">

                    <canvas id="universal-profile-radar"></canvas>

                </div>

            </div>

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
                        display: false
                    }
                },

                responsive: true,
                maintainAspectRation: false,
            }
        });
}