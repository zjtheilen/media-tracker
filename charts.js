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

function formatTraitScore(score) {
    return `${score.toFixed(1)} / 10`;
}

function getTraitStrength(score) {

    if (score >= 9.5) return "Exceptional";

    if (score >= 8.5) return "Very Strong";

    if (score >= 7.5) return "Strong";

    if (score >= 6.5) return "Moderate";

    return "Developing";
}

function getTraitIntensity(score) {

    if (score >= 9.5) return "overwhelmingly";

    if (score >= 9.0) return "strongly";

    if (score >= 8.0) return "consistently";

    if (score >= 7.0) return "frequently";

    return "occasionally";

}

const archiveDesignations = [
    {
        primary: "engagement",
        secondary: null,
        media: "gameplay_mechanics",
        title: "The Systems Thinker"
    },
    {
        primary: "depth",
        secondary: null,
        media: "world_building",
        title: "The Explorer"
    },
    {
        primary: "emotional_impact",
        secondary: "character_development",
        media: "narrative_pacing",
        title: "The Story Seeker"
    },
    {
        primary: "craft",
        secondary: "presentation",
        media: "cinematography_visuals",
        title: "The Curator"
    }
];

function generateArchiveTitle(
    primaryTrait,
    secondaryTrait,
    mediaTrait
) {

    const match = archiveDesignations.find((designation) => {

        if (designation.primary !== primaryTrait[0]) return false;

        if (
            designation.secondary &&
            designation.secondary !== secondaryTrait[0]
        ) {
            return false;
        }

        if (designation.media !== mediaTrait[0]) return false;

        return true;

    });

    return match
        ? match.title
        : "The Archivist";

}

function calculateDesignationConfidence(
    primaryTrait,
    secondaryTrait,
    mediaTrait
) {

    const primaryScore = primaryTrait[1];
    const secondaryScore = secondaryTrait[1];
    const mediaScore = mediaTrait[1];

    const confidence =
        (
            primaryScore +
            secondaryScore +
            mediaScore
        ) / 3;

    return Number(confidence.toFixed(1));

}

function getDesignationConfidenceLabel(score) {

    if (score >= 9.0) {
        return "High";
    }

    if (score >= 8.0) {
        return "Moderate";
    }

    return "Low";

}

function generateClassificationBasis(
    primaryTrait,
    secondaryTrait,
    mediaTrait
) {

    return {
        primary: {
            name: formatScoreCategory(primaryTrait[0]),
            score: primaryTrait[1]
        },

        secondary: {
            name: formatScoreCategory(secondaryTrait[0]),
            score: secondaryTrait[1]
        },

        media: {
            name: formatScoreCategory(mediaTrait[0]),
            score: mediaTrait[1]
        }
    };

}

function getTraitDescription(category) {

    const descriptions = {

        // Universal
        emotional_impact: "emotionally resonant experiences",
        depth: "complex and thought-provoking works",
        craft: "highly polished execution",
        engagement: "consistently engaging experiences",
        presentation: "strong presentation and aesthetics",
        originality: "original and inventive ideas",

        // Book
        prose_writing: "strong prose and writing style",
        character_development: "deep character development",
        world_building: "rich world building",
        narrative_pacing: "well-balanced narrative pacing",

        // Video
        cinematography_visuals: "strong visual presentation",
        acting_performances: "compelling performances",
        directing_editing: "effective direction and editing",
        sound_music: "immersive sound and music",

        // Game
        gameplay_mechanics: "engaging gameplay systems",
        level_design_progression: "strong progression and level design",
        replayability_systems: "replayable and systemic experiences",
        art_atmosphere: "strong artistic atmosphere"
    };

    return descriptions[category] || category;
}

function generatePrimaryTraitSentence(category, score) {

    return `Your archive strongly favors ${getTraitDescription(category)} (${formatTraitScore(score)}).`;

}

function generateSecondaryTraitSentence(category, score) {

    return `It also demonstrates a strong preference for ${getTraitDescription(category)} (${formatTraitScore(score)}).`;

}

function generateMediaSignatureSentence(category, score) {

    return `Your media preferences strongly align with ${getTraitDescription(category)} (${formatTraitScore(score)}).`;

}

function generateArchiveSummary(
    primaryTrait,
    secondaryTrait,
    mediaTrait
) {

    return `
        Your archive ${getTraitIntensity(primaryTrait[1])} favors ${getTraitDescription(primaryTrait[0])} (${formatTraitScore(primaryTrait[1])}), while also placing significant value on ${getTraitDescription(secondaryTrait[0])} (${formatTraitScore(secondaryTrait[1])}). Across all recorded media, your strongest preference is for ${getTraitDescription(mediaTrait[0])} (${formatTraitScore(mediaTrait[1])}).
    `.trim();

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

    const archiveProfile =
        buildArchiveProfile(entries);

    console.log(archiveProfile);

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
                    label: "Core Evaluation Matrix",
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

    const archiveProfile =
        buildArchiveProfile(entries);


    const primaryTraitSentence =
        generatePrimaryTraitSentence(
            archiveProfile.topUniversal[0][0],
            archiveProfile.topUniversal[0][1]
        );


    const secondaryTraitSentence =
        generateSecondaryTraitSentence(
            archiveProfile.topUniversal[1][0],
            archiveProfile.topUniversal[1][1]
        );


    const mediaSignatureSentence =
        generateMediaSignatureSentence(
            archiveProfile.topMedia[0][0],
            archiveProfile.topMedia[0][1]
        );


    const archiveSummary =
        generateArchiveSummary(
            archiveProfile.topUniversal[0],
            archiveProfile.topUniversal[1],
            archiveProfile.topMedia[0]
        );


    const confidenceLabel =
        getDesignationConfidenceLabel(
            archiveProfile.designationConfidence
        );


    const card = document.getElementById(
        "favorite-media-type-card"
    );


    card.innerHTML = `
        <div class="archive-profile-card">

            <div class="archive-profile-layout">

                <div class="archive-profile-info">

                    <div class="designation-block">

                        <h3>Designation</h3>

                        <h2>
                            ${archiveProfile.archiveTitle.toUpperCase()}
                        </h2>

                    </div>


                    <div class="confidence-block">

                        <h3>Classification Confidence</h3>

                        <p>
                            ${confidenceLabel}
                            (${archiveProfile.designationConfidence.toFixed(1)} / 10)
                        </p>

                    </div>


                    <div class="classification-basis-block">

                        <h3>Classification Basis</h3>


                        <p class="basis-item">

                            <span class="basis-label">
                                Primary Indicator
                            </span>

                            <br>

                            ${archiveProfile.classificationBasis.primary.name}
                            (${archiveProfile.classificationBasis.primary.score.toFixed(1)} / 10)

                        </p>


                        <p class="basis-item">

                            <span class="basis-label">
                                Secondary Indicator
                            </span>

                            <br>

                            ${archiveProfile.classificationBasis.secondary.name}
                            (${archiveProfile.classificationBasis.secondary.score.toFixed(1)} / 10)

                        </p>


                        <p class="basis-item media-signature">

                            <span class="basis-label">
                                Media Signature
                            </span>

                            <br>

                            ${archiveProfile.classificationBasis.media.name}
                            (${archiveProfile.classificationBasis.media.score.toFixed(1)} / 10)

                        </p>


                    </div>


                    <div class="archive-profile-summary">

                        <div class="archive-summary-block">

                            <h3>Archive Interpretation</h3>

                            <p class="archive-summary">
                                ${archiveSummary}
                            </p>

                        </div>

                    </div>


                </div>


                <div class="archive-profile-charts">

                    <div class="chart-panel">

                        <h3>Core Evaluation Matrix</h3>

                        <canvas id="universal-profile-radar"></canvas>

                    </div>


                    <div class="chart-panel">

                        <h3>Media Preference Matrix</h3>

                        <canvas id="media-profile-radar"></canvas>

                    </div>


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

async function renderMediaPreferenceMatrix() {

    const entries = await getEntries();

    const averages =
        calculateAverageScores(
            entries,
            "media_scores"
        );

    const radarData = prepareRadarData(averages);

    const ctx = document
        .getElementById("media-profile-radar")
        .getContext("2d");

    destroyChart("media-profile-radar");


    chartInstances["media-profile-radar"] = new Chart(ctx, {

        type: "radar",

        data: {
            labels: radarData.labels,

            datasets: [
                {
                    label: "Media Preference Matrix",
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
                }
            }
        }
    });
}
