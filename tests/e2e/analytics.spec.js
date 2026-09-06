const { test, expect } = require("@playwright/test");

async function clearEntries(request) {
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    for (const entry of entries) {
        const deleteResponse = await request.delete(
            `http://127.0.0.1:8000/entries/${entry.id}`
        );

        expect(deleteResponse.ok()).toBeTruthy();
    }
}

async function seedEntries(request) {
    const testEntries = [
        {
            title: "Silent Hill 2",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Psychological horror",
            scores: {
                depth: 8,
                originality: 9,
                craft: 8,
                emotional_impact: 8,
                engagement: 9,
                presentation: 8,
                art_atmosphere: 8,
                gameplay_mechanics: 9,
                level_design_progression: 8,
                replayability_systems: 7,
            },
        },
        {
            title: "The Shining",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Classic horror",
            scores: {
                depth: 9,
                originality: 8,
                craft: 9,
                emotional_impact: 9,
                engagement: 8,
                presentation: 9,
                acting_performances: 9,
                cinematography_visuals: 10,
                directing_editing: 9,
                sound_music: 9,
            },
        },
        {
            title: "Project Hail Mary",
            media_type: "book",
            genres: ["sci-fi"],
            completion_status: "completed",
            notes: "Excellent science fiction",
            scores: {
                depth: 8,
                originality: 9,
                craft: 9,
                emotional_impact: 8,
                engagement: 10,
                presentation: 8,
                character_development: 9,
                narrative_pacing: 9,
                prose_writing: 9,
                world_building: 10,
            },
        },
    ];

    for (const entry of testEntries) {
        const response = await request.post(
            "http://127.0.0.1:8000/entries/",
            {
                data: entry,
            }
        );

        expect(response.ok()).toBeTruthy();
    }
}

async function seedRatingDistributionEntries(request) {
    const entries = [
        {
            title: "Rating 100",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Rating distribution test",
            scores: {
                depth: 10,
                originality: 10,
                craft: 10,
                emotional_impact: 10,
                engagement: 10,
                presentation: 10,
                art_atmosphere: 10,
                gameplay_mechanics: 10,
                level_design_progression: 10,
                replayability_systems: 10,
            },
        },
        {
            title: "Rating 90",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Rating distribution test",
            scores: {
                depth: 9,
                originality: 9,
                craft: 9,
                emotional_impact: 9,
                engagement: 9,
                presentation: 9,
                art_atmosphere: 9,
                gameplay_mechanics: 9,
                level_design_progression: 9,
                replayability_systems: 9,
            },
        },
        {
            title: "Rating 80",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Rating distribution test",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                art_atmosphere: 8,
                gameplay_mechanics: 8,
                level_design_progression: 8,
                replayability_systems: 8,
            },
        },
        {
            title: "Rating 70",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Rating distribution test",
            scores: {
                depth: 7,
                originality: 7,
                craft: 7,
                emotional_impact: 7,
                engagement: 7,
                presentation: 7,
                art_atmosphere: 7,
                gameplay_mechanics: 7,
                level_design_progression: 7,
                replayability_systems: 7,
            },
        },
        {
            title: "Rating 50",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            notes: "Rating distribution test",
            scores: {
                depth: 5,
                originality: 5,
                craft: 5,
                emotional_impact: 5,
                engagement: 5,
                presentation: 5,
                art_atmosphere: 5,
                gameplay_mechanics: 5,
                level_design_progression: 5,
                replayability_systems: 5,
            },
        },
    ];

    for (const entry of entries) {
        const response = await request.post(
            "http://127.0.0.1:8000/entries/",
            {
                data: entry,
            }
        );

        if (!response.ok()) {
            console.log("FAILED ENTRY:", entry.title);
            console.log("STATUS:", response.status());
            console.log("BODY:", await response.text());
        }

        expect(response.ok()).toBeTruthy();
    }
}

async function seedMonthlyCompletionEntries(request) {
    const entries = [
        {
            title: "August Completion 1",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-05",
            notes: "Monthly completion test",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                art_atmosphere: 8,
                gameplay_mechanics: 8,
                level_design_progression: 8,
                replayability_systems: 8,
            },
        },
        {
            title: "August Completion 2",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-20",
            notes: "Monthly completion test",
            scores: {
                depth: 9,
                originality: 8,
                craft: 9,
                emotional_impact: 8,
                engagement: 9,
                presentation: 8,
                acting_performances: 9,
                cinematography_visuals: 8,
                directing_editing: 9,
                sound_music: 8,
            },
        },
        {
            title: "September Completion 1",
            media_type: "book",
            genres: ["sci-fi"],
            completion_status: "completed",
            date_consumed: "2026-09-02",
            notes: "Monthly completion test",
            scores: {
                depth: 8,
                originality: 9,
                craft: 9,
                emotional_impact: 8,
                engagement: 10,
                presentation: 8,
                character_development: 9,
                narrative_pacing: 9,
                prose_writing: 9,
                world_building: 10,
            },
        },
    ];

    for (const entry of entries) {
        const response = await request.post(
            "http://127.0.0.1:8000/entries/",
            {
                data: entry,
            }
        );

        expect(response.ok()).toBeTruthy();
    }
}

async function seedGenreAverageEntries(request) {
    const entries = [
        {
            title: "Horror Average A",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-05",
            notes: "Genre average test",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                art_atmosphere: 8,
                gameplay_mechanics: 8,
                level_design_progression: 8,
                replayability_systems: 8,
            },
        },
        {
            title: "Horror Average B",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-15",
            notes: "Genre average test",
            scores: {
                depth: 9,
                originality: 9,
                craft: 9,
                emotional_impact: 9,
                engagement: 9,
                presentation: 9,
                acting_performances: 9,
                cinematography_visuals: 9,
                directing_editing: 9,
                sound_music: 9,
            },
        },
        {
            title: "Horror/Sci-Fi",
            media_type: "book",
            genres: ["horror", "sci-fi"],
            completion_status: "completed",
            date_consumed: "2026-08-25",
            notes: "Genre average test",
            scores: {
                depth: 10,
                originality: 10,
                craft: 10,
                emotional_impact: 10,
                engagement: 10,
                presentation: 10,
                character_development: 10,
                narrative_pacing: 10,
                prose_writing: 10,
                world_building: 10,
            },
        },
    ];

    for (const entry of entries) {
        const response = await request.post(
            "http://127.0.0.1:8000/entries/",
            {
                data: entry,
            }
        );

        expect(response.ok()).toBeTruthy();
    }
}

test("analytics page loads its core visualizations", async ({ page }) => {
    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const analyticsPage = page.locator("#analytics-page");

    await expect(analyticsPage).toBeVisible();
    await expect(page.locator("#analytics-tab")).toHaveClass(/active/);

    const charts = [
        "#media-distribution-chart",
        "#avg-score-chart",
        "#rating-distribution-chart",
        "#monthly-completion-chart",
        "#genre-average-ratings-chart",
    ];

    for (const selector of charts) {
        const chart = analyticsPage.locator(selector);

        await expect(chart).toBeVisible();

        const dimensions = await chart.evaluate((canvas) => ({
            width: canvas.width,
            height: canvas.height,
        }));

        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
    }
});

test("analytics page handles an empty archive", async ({ page, request }) => {
    await clearEntries(request);

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const analyticsPage = page.locator("#analytics-page");

    await expect(analyticsPage).toBeVisible();
    await expect(page.locator("#analytics-tab")).toHaveClass(/active/);

    const charts = [
        "#media-distribution-chart",
        "#avg-score-chart",
        "#rating-distribution-chart",
        "#monthly-completion-chart",
        "#genre-average-ratings-chart",
    ];

    for (const selector of charts) {
        const chart = analyticsPage.locator(selector);

        await expect(chart).toBeVisible();

        const dimensions = await chart.evaluate((canvas) => ({
            width: canvas.width,
            height: canvas.height,
        }));

        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
    }
});

test("analytics media distribution chart reflects archive media types", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const chart = page.locator("#media-distribution-chart");

    await expect(chart).toBeVisible();

    const chartData = await chart.evaluate((canvas) => {
        const chartInstance = Chart.getChart(canvas);

        return {
            labels: chartInstance.data.labels,
            data: chartInstance.data.datasets[0].data,
        };
    });

    expect(chartData.labels).toEqual(
        expect.arrayContaining(["game", "video", "book"])
    );

    expect(chartData.data).toEqual(
        expect.arrayContaining([1, 1, 1])
    );

    expect(chartData.labels).toHaveLength(3);
    expect(chartData.data).toHaveLength(3);
});

test("analytics average score chart reflects archive data", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedEntries(request);

    const entriesResponse = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(entriesResponse.ok()).toBeTruthy();

    const entries = await entriesResponse.json();

    const expectedAverages = {};

    for (const entry of entries) {
        if (!expectedAverages[entry.media_type]) {
            expectedAverages[entry.media_type] = [];
        }

        expectedAverages[entry.media_type].push(entry.total_score);
    }

    for (const mediaType of Object.keys(expectedAverages)) {
        const scores = expectedAverages[mediaType];

        expectedAverages[mediaType] =
            Number(
                (
                    scores.reduce((sum, score) => sum + score, 0) /
                    scores.length
                ).toFixed(2)
            );
    }

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const chart = page.locator("#avg-score-chart");

    await expect(chart).toBeVisible();

    const chartData = await chart.evaluate((canvas) => {
        const chartInstance = Chart.getChart(canvas);

        return {
            labels: chartInstance.data.labels,
            data: chartInstance.data.datasets[0].data,
        };
    });

    expect(chartData.labels).toEqual(
        expect.arrayContaining(["game", "video", "book"])
    );

    expect(chartData.labels).toHaveLength(3);
    expect(chartData.data).toHaveLength(3);

    for (const mediaType of ["game", "video", "book"]) {
        const index = chartData.labels.indexOf(mediaType);

        expect(index).toBeGreaterThanOrEqual(0);
        expect(chartData.data[index]).toBe(
            expectedAverages[mediaType]
        );
    }
});

test("analytics rating distribution chart reflects archive data", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedRatingDistributionEntries(request);

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const chart = page.locator("#rating-distribution-chart");

    await expect(chart).toBeVisible();

    await expect.poll(async () => {
        return await chart.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);

    const chartData = await chart.evaluate((canvas) => {
        const chartInstance = Chart.getChart(canvas);

        return {
            labels: chartInstance.data.labels,
            data: chartInstance.data.datasets[0].data,
        };
    });

    expect(chartData.labels).toEqual([
        "90-100",
        "80-89",
        "70-79",
        "60-69",
        "Below 60",
    ]);

    expect(chartData.data).toEqual([
        2,
        1,
        1,
        0,
        1,
    ]);
});

test("analytics monthly completion chart reflects archive data", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedMonthlyCompletionEntries(request);

    const entriesResponse = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(entriesResponse.ok()).toBeTruthy();

    const entries = await entriesResponse.json();

    const expectedMonthlyCounts = {};

    for (const entry of entries) {
        const month = entry.date_consumed.slice(0, 7);

        if (!expectedMonthlyCounts[month]) {
            expectedMonthlyCounts[month] = 0;
        }

        expectedMonthlyCounts[month]++;
    }

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const chart = page.locator("#monthly-completion-chart");

    await expect(chart).toBeVisible();

    const chartData = await chart.evaluate((canvas) => {
        const chartInstance = Chart.getChart(canvas);

        return {
            labels: chartInstance.data.labels,
            data: chartInstance.data.datasets[0].data,
        };
    });

    expect(chartData.labels).toEqual(
        expect.arrayContaining(Object.keys(expectedMonthlyCounts))
    );

    expect(chartData.labels).toHaveLength(
        Object.keys(expectedMonthlyCounts).length
    );

    expect(chartData.data).toHaveLength(
        Object.keys(expectedMonthlyCounts).length
    );

    for (const month of Object.keys(expectedMonthlyCounts)) {
        const index = chartData.labels.indexOf(month);

        expect(index).toBeGreaterThanOrEqual(0);
        expect(chartData.data[index]).toBe(
            expectedMonthlyCounts[month]
        );
    }
});

test("analytics genre average ratings chart reflects archive data", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedGenreAverageEntries(request);

    const entriesResponse = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(entriesResponse.ok()).toBeTruthy();

    const entries = await entriesResponse.json();

    const genreScores = {};

    for (const entry of entries) {
        for (const genre of entry.genres) {
            if (!genreScores[genre]) {
                genreScores[genre] = [];
            }

            genreScores[genre].push(entry.total_score);
        }
    }

    const expectedGenreAverages = {};

    for (const genre of Object.keys(genreScores)) {
        const scores = genreScores[genre];

        expectedGenreAverages[genre] = Number(
            (
                scores.reduce((sum, score) => sum + score, 0) /
                scores.length
            ).toFixed(2)
        );
    }

    await page.goto("/");

    await page.locator("#analytics-tab").click();

    const chart = page.locator("#genre-average-ratings-chart");

    await expect(chart).toBeVisible();

    const chartData = await chart.evaluate((canvas) => {
        const chartInstance = Chart.getChart(canvas);

        return {
            labels: chartInstance.data.labels,
            data: chartInstance.data.datasets[0].data,
        };
    });

    expect(chartData.labels).toEqual(
        expect.arrayContaining(Object.keys(expectedGenreAverages))
    );

    expect(chartData.labels).toHaveLength(
        Object.keys(expectedGenreAverages).length
    );

    expect(chartData.data).toHaveLength(
        Object.keys(expectedGenreAverages).length
    );

    for (const genre of Object.keys(expectedGenreAverages)) {
        const index = chartData.labels.indexOf(genre);

        expect(index).toBeGreaterThanOrEqual(0);
        expect(chartData.data[index]).toBe(
            expectedGenreAverages[genre]
        );
    }
});

