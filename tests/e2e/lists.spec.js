const { test, expect } = require("@playwright/test");

async function seedTopRatedEntries(request) {
    const entries = [
        {
            title: "Top Rated 100",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-01",
            notes: "",
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
            title: "Top Rated 90",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-02",
            notes: "",
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
            title: "Top Rated 80",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-03",
            notes: "",
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
            title: "Top Rated 70",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-04",
            notes: "",
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
            title: "Top Rated 60",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-05",
            notes: "",
            scores: {
                depth: 6,
                originality: 6,
                craft: 6,
                emotional_impact: 6,
                engagement: 6,
                presentation: 6,
                art_atmosphere: 6,
                gameplay_mechanics: 6,
                level_design_progression: 6,
                replayability_systems: 6,
            },
        },
        {
            title: "Top Rated 50",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-06",
            notes: "",
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
            console.log(await response.text());
        }

        expect(response.ok()).toBe(true);
    }
}

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

test("top rated overall list displays the five highest scored records in descending order", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    await seedTopRatedEntries(request);

    await page.goto("/");
    await page.locator("#lists-tab").click();

    const list = page.locator("#top-rated-overall-list");

    await expect(list.locator("h2")).toHaveText(
        "Highest Scored Records"
    );

    const items = list.locator(".top-list-item");

    await expect(items).toHaveCount(5);

    await expect(items.nth(0).locator("h3")).toHaveText(
        "Top Rated 100"
    );
    await expect(items.nth(1).locator("h3")).toHaveText(
        "Top Rated 90"
    );
    await expect(items.nth(2).locator("h3")).toHaveText(
        "Top Rated 80"
    );
    await expect(items.nth(3).locator("h3")).toHaveText(
        "Top Rated 70"
    );
    await expect(items.nth(4).locator("h3")).toHaveText(
        "Top Rated 60"
    );

    await expect(items.nth(0).locator(".report-rank")).toHaveText("01");
    await expect(items.nth(1).locator(".report-rank")).toHaveText("02");
    await expect(items.nth(2).locator(".report-rank")).toHaveText("03");
    await expect(items.nth(3).locator(".report-rank")).toHaveText("04");
    await expect(items.nth(4).locator(".report-rank")).toHaveText("05");

    await expect(items.nth(0).locator(".report-value")).toHaveText(
        "100.0%"
    );
    await expect(items.nth(1).locator(".report-value")).toHaveText(
        "90.0%"
    );
    await expect(items.nth(2).locator(".report-value")).toHaveText(
        "80.0%"
    );
    await expect(items.nth(3).locator(".report-value")).toHaveText(
        "70.0%"
    );
    await expect(items.nth(4).locator(".report-value")).toHaveText(
        "60.0%"
    );

    await expect(list).not.toContainText("Top Rated 50");
});

async function seedMediaSpecificEntries(request) {
    const entries = [
        // Books
        {
            title: "Book 100",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-01",
            notes: "",
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
        {
            title: "Book 90",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-02",
            notes: "",
            scores: {
                depth: 9,
                originality: 9,
                craft: 9,
                emotional_impact: 9,
                engagement: 9,
                presentation: 9,
                character_development: 9,
                narrative_pacing: 9,
                prose_writing: 9,
                world_building: 9,
            },
        },
        {
            title: "Book 80",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-03",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Book 70",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-04",
            notes: "",
            scores: {
                depth: 7,
                originality: 7,
                craft: 7,
                emotional_impact: 7,
                engagement: 7,
                presentation: 7,
                character_development: 7,
                narrative_pacing: 7,
                prose_writing: 7,
                world_building: 7,
            },
        },
        {
            title: "Book 60",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-05",
            notes: "",
            scores: {
                depth: 6,
                originality: 6,
                craft: 6,
                emotional_impact: 6,
                engagement: 6,
                presentation: 6,
                character_development: 6,
                narrative_pacing: 6,
                prose_writing: 6,
                world_building: 6,
            },
        },
        {
            title: "Book 50",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-06",
            notes: "",
            scores: {
                depth: 5,
                originality: 5,
                craft: 5,
                emotional_impact: 5,
                engagement: 5,
                presentation: 5,
                character_development: 5,
                narrative_pacing: 5,
                prose_writing: 5,
                world_building: 5,
            },
        },

        // Videos
        {
            title: "Video 100",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-07",
            notes: "",
            scores: {
                depth: 10,
                originality: 10,
                craft: 10,
                emotional_impact: 10,
                engagement: 10,
                presentation: 10,
                acting_performances: 10,
                cinematography_visuals: 10,
                directing_editing: 10,
                sound_music: 10,
            },
        },
        {
            title: "Video 90",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-08",
            notes: "",
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
            title: "Video 80",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-09",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                acting_performances: 8,
                cinematography_visuals: 8,
                directing_editing: 8,
                sound_music: 8,
            },
        },
        {
            title: "Video 70",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-10",
            notes: "",
            scores: {
                depth: 7,
                originality: 7,
                craft: 7,
                emotional_impact: 7,
                engagement: 7,
                presentation: 7,
                acting_performances: 7,
                cinematography_visuals: 7,
                directing_editing: 7,
                sound_music: 7,
            },
        },
        {
            title: "Video 60",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-11",
            notes: "",
            scores: {
                depth: 6,
                originality: 6,
                craft: 6,
                emotional_impact: 6,
                engagement: 6,
                presentation: 6,
                acting_performances: 6,
                cinematography_visuals: 6,
                directing_editing: 6,
                sound_music: 6,
            },
        },
        {
            title: "Video 50",
            media_type: "video",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-12",
            notes: "",
            scores: {
                depth: 5,
                originality: 5,
                craft: 5,
                emotional_impact: 5,
                engagement: 5,
                presentation: 5,
                acting_performances: 5,
                cinematography_visuals: 5,
                directing_editing: 5,
                sound_music: 5,
            },
        },

        // Games
        {
            title: "Game 100",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-13",
            notes: "",
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
            title: "Game 90",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-14",
            notes: "",
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
            title: "Game 80",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-15",
            notes: "",
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
            title: "Game 70",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-16",
            notes: "",
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
            title: "Game 60",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-17",
            notes: "",
            scores: {
                depth: 6,
                originality: 6,
                craft: 6,
                emotional_impact: 6,
                engagement: 6,
                presentation: 6,
                art_atmosphere: 6,
                gameplay_mechanics: 6,
                level_design_progression: 6,
                replayability_systems: 6,
            },
        },
        {
            title: "Game 50",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-18",
            notes: "",
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

        expect(response.ok()).toBe(true);
    }
}

test("media-specific lists display only their media type in descending score order", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedMediaSpecificEntries(request);

    await page.goto("/");
    await page.locator("#lists-tab").click();

    const lists = [
        {
            selector: "#top-books-list",
            titles: [
                "Book 100",
                "Book 90",
                "Book 80",
                "Book 70",
                "Book 60",
            ],
            excluded: [
                "Book 50",
                "Video 100",
                "Game 100",
            ],
        },
        {
            selector: "#top-movies-list",
            titles: [
                "Video 100",
                "Video 90",
                "Video 80",
                "Video 70",
                "Video 60",
            ],
            excluded: [
                "Video 50",
                "Book 100",
                "Game 100",
            ],
        },
        {
            selector: "#top-games-list",
            titles: [
                "Game 100",
                "Game 90",
                "Game 80",
                "Game 70",
                "Game 60",
            ],
            excluded: [
                "Game 50",
                "Book 100",
                "Video 100",
            ],
        },
    ];

    for (const listDefinition of lists) {
        const list = page.locator(listDefinition.selector);
        const items = list.locator(".top-list-item");

        await expect(items).toHaveCount(5);

        for (let i = 0; i < listDefinition.titles.length; i++) {
            await expect(items.nth(i).locator("h3")).toHaveText(
                listDefinition.titles[i]
            );

            await expect(items.nth(i).locator(".report-rank")).toHaveText(
                String(i + 1).padStart(2, "0")
            );

            await expect(items.nth(i).locator(".report-value")).toHaveText(
                `${100 - i * 10}.0%`
            );
        }

        for (const excludedTitle of listDefinition.excluded) {
            await expect(list).not.toContainText(excludedTitle);
        }
    }
});

async function seedRecentArchiveEntries(request) {
    const entries = [
        {
            title: "Archive January",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-15",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Archive March",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-03-20",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Archive May",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-05-10",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Archive July",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-07-04",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Archive August Early",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-05",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
            },
        },
        {
            title: "Archive August Late",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-08-28",
            notes: "",
            scores: {
                depth: 8,
                originality: 8,
                craft: 8,
                emotional_impact: 8,
                engagement: 8,
                presentation: 8,
                character_development: 8,
                narrative_pacing: 8,
                prose_writing: 8,
                world_building: 8,
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

        expect(response.ok()).toBe(true);
    }
}

test("recent archive additions displays the five most recently consumed records", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedRecentArchiveEntries(request);

    await page.goto("/");
    await page.locator("#lists-tab").click();

    const list = page.locator("#recent-archive-list");
    const items = list.locator(".top-list-item");

    await expect(items).toHaveCount(5);

    const expectedEntries = [
        ["Archive August Late", "2026-08-28"],
        ["Archive August Early", "2026-08-05"],
        ["Archive July", "2026-07-04"],
        ["Archive May", "2026-05-10"],
        ["Archive March", "2026-03-20"],
    ];

    for (let i = 0; i < expectedEntries.length; i++) {
        await expect(items.nth(i).locator("h3")).toHaveText(
            expectedEntries[i][0]
        );

        await expect(items.nth(i).locator(".report-rank")).toHaveText(
            String(i + 1).padStart(2, "0")
        );

        await expect(items.nth(i).locator(".report-value")).toHaveText(
            expectedEntries[i][1]
        );
    }

    await expect(list).not.toContainText("Archive January");
});

async function seedHallOfFameEntries(request) {
    const entries = [
        {
            title: "Hall of Fame 100",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
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
            title: "Hall of Fame High",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-02",
            notes: "",
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
                replayability_systems: 9,
            },
        },
        {
            title: "Hall of Fame Mid",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-03",
            notes: "",
            scores: {
                depth: 10,
                originality: 10,
                craft: 10,
                emotional_impact: 10,
                engagement: 10,
                presentation: 10,
                art_atmosphere: 10,
                gameplay_mechanics: 9,
                level_design_progression: 9,
                replayability_systems: 9,
            },
        },
        {
            title: "Hall of Fame Boundary",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-04",
            notes: "",
            scores: {
                depth: 10,
                originality: 10,
                craft: 10,
                emotional_impact: 10,
                engagement: 10,
                presentation: 9,
                art_atmosphere: 9,
                gameplay_mechanics: 9,
                level_design_progression: 9,
                replayability_systems: 9,
            },
        },
        {
            title: "Below Hall Threshold",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-05",
            notes: "",
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
            title: "Well Below Hall",
            media_type: "game",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-06",
            notes: "",
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

test("Hall of Fame includes only scores of 95 or higher in descending order", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedHallOfFameEntries(request);

    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    console.log(
        entries.map(entry => ({
            title: entry.title,
            total_score: entry.total_score,
        }))
    );

    await page.goto("/");
    await page.locator("#lists-tab").click();

    const list = page.locator("#hall-of-fame-list");
    const items = list.locator(".top-list-item");

    await expect(items).toHaveCount(4);

    const expectedTitles = [
        "Hall of Fame 100",
        "Hall of Fame High",
        "Hall of Fame Mid",
        "Hall of Fame Boundary",
    ];

    for (let i = 0; i < expectedTitles.length; i++) {
        await expect(items.nth(i).locator("h3")).toHaveText(
            expectedTitles[i]
        );

        await expect(items.nth(i).locator(".report-rank")).toHaveText(
            String(i + 1).padStart(2, "0")
        );
    }

    await expect(list).not.toContainText(
        "Below Hall Threshold"
    );

    await expect(list).not.toContainText(
        "Well Below Hall"
    );
});

