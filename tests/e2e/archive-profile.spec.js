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

function gameScores(value = 6) {
    return {
        depth: 10,
        originality: 10,
        craft: 10,
        emotional_impact: 10,
        engagement: 10,
        presentation: 10,
        art_atmosphere: value,
        gameplay_mechanics: value,
        level_design_progression: value,
        replayability_systems: value,
    };
}

function videoScores(value = 6) {
    return {
        depth: 10,
        originality: 10,
        craft: 10,
        emotional_impact: 10,
        engagement: 10,
        presentation: 10,
        acting_performances: value,
        cinematography_visuals: value,
        directing_editing: value,
        sound_music: value,
    };
}

function bookScores(value = 6) {
    return {
        depth: 10,
        originality: 10,
        craft: 10,
        emotional_impact: 10,
        engagement: 10,
        presentation: 10,
        character_development: value,
        narrative_pacing: value,
        prose_writing: value,
        world_building: value,
    };
}

async function createEntry(request, entry) {
    const response = await request.post(
        "http://127.0.0.1:8000/entries/",
        {
            data: entry,
        }
    );

    expect(response.ok()).toBeTruthy();
}

async function seedArchiveProfile(request) {
    const entries = [
        {
            title: "Boundary Game 1",
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Boundary Game 2",
            media_type: "game",
            genres: ["surreal", "mystery"],
            completion_status: "completed",
            date_consumed: "2026-01-02",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Boundary Game 3",
            media_type: "game",
            genres: ["sci-fi", "psychological"],
            completion_status: "completed",
            date_consumed: "2026-01-03",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Boundary Video 1",
            media_type: "video",
            genres: ["experimental", "drama"],
            completion_status: "completed",
            date_consumed: "2026-01-04",
            notes: "",
            scores: videoScores(),
        },
        {
            title: "Boundary Book 1",
            media_type: "book",
            genres: ["surreal", "fantasy"],
            completion_status: "completed",
            date_consumed: "2026-01-05",
            notes: "",
            scores: bookScores(),
        },

        {
            title: "Archive Mystery",
            media_type: "video",
            genres: ["mystery"],
            completion_status: "completed",
            date_consumed: "2026-01-06",
            notes: "",
            scores: videoScores(),
        },
        {
            title: "Archive Horror",
            media_type: "book",
            genres: ["horror"],
            completion_status: "completed",
            date_consumed: "2026-01-07",
            notes: "",
            scores: bookScores(),
        },
        {
            title: "Archive Comedy",
            media_type: "video",
            genres: ["comedy"],
            completion_status: "completed",
            date_consumed: "2026-01-08",
            notes: "",
            scores: videoScores(),
        },
        {
            title: "Archive Fantasy",
            media_type: "game",
            genres: ["fantasy"],
            completion_status: "completed",
            date_consumed: "2026-01-09",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Archive Thriller",
            media_type: "book",
            genres: ["thriller"],
            completion_status: "completed",
            date_consumed: "2026-01-10",
            notes: "",
            scores: bookScores(),
        },

        {
            title: "Archive Drama",
            media_type: "video",
            genres: ["drama"],
            completion_status: "completed",
            date_consumed: "2026-01-11",
            notes: "",
            scores: videoScores(),
        },
        {
            title: "Archive Action",
            media_type: "game",
            genres: ["action"],
            completion_status: "completed",
            date_consumed: "2026-01-12",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Archive Romance",
            media_type: "book",
            genres: ["romance"],
            completion_status: "completed",
            date_consumed: "2026-01-13",
            notes: "",
            scores: bookScores(),
        },
        {
            title: "Archive Adventure",
            media_type: "game",
            genres: ["adventure"],
            completion_status: "completed",
            date_consumed: "2026-01-14",
            notes: "",
            scores: gameScores(),
        },
        {
            title: "Archive Crime",
            media_type: "video",
            genres: ["crime"],
            completion_status: "completed",
            date_consumed: "2026-01-15",
            notes: "",
            scores: videoScores(),
        },
    ];

    for (const entry of entries) {
        await createEntry(request, entry);
    }
}

test("Archive Profile renders designation, interpretation, findings, observations, and radar", async ({
    page,
    request,
}) => {
    await clearEntries(request);
    await seedArchiveProfile(request);

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("BOUNDARY EXPLORER");

    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("8.7 / 10");

    await expect(card).toContainText("Archive Interpretation");
    await expect(card).toContainText("Archive Findings");
    await expect(card).toContainText("Archive Observations");

    await expect(card.locator(".archive-finding").first()).toBeVisible();
    await expect(card.locator(".archive-observation").first()).toBeVisible();

    await expect(
        card.locator(".archive-observation")
    ).toHaveCount(
        await card.locator(".archive-observation").count()
    );

    await expect(
        card.locator(".finding-evidence-item").first()
    ).toBeVisible();

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

test("Archive Profile handles an empty archive", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    await expect(profilePage).toContainText("Archive Profile");
    await expect(profilePage).toContainText(
        "What does your archive say about you?"
    );

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toBeVisible();

    await expect(card).toContainText("Your archive is empty.");
    await expect(card).toContainText(
        "Add completed media to begin building your Archive Profile."
    );

    await expect(card).not.toContainText("Designation");
    await expect(card).not.toContainText("Signal Strength");
    await expect(card).not.toContainText("Identity");
    await expect(card).not.toContainText("Archive Findings");
    await expect(card).not.toContainText("Archive Observations");
    await expect(card).not.toContainText("Archive Interpretation");

    await expect(page.locator("#universal-profile-radar")).not.toBeVisible();
});

test("Archive Profile does not establish curator identity at 14 entries", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    for (let i = 0; i < 14; i++) {
        await createEntry(request, {
            title: `Boundary 14 Entry ${i + 1}`,
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        });
    }

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("Archive Interpretation");

    await expect(card).toContainText(
        "Your curator identity is not yet established."
    );

    await expect(card).not.toContainText(
        "Your curator identity most closely aligns with"
    );

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

test("Archive Profile establishes Breadth Philosophy at 15 entries", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    for (let i = 0; i < 15; i++) {
        await createEntry(request, {
            title: `Boundary 15 Entry ${i + 1}`,
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        });
    }

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("Archive Interpretation");

    await expect(card).toContainText(
        "Your curator identity most closely aligns with Breadth Philosophy."
    );

    await expect(card).not.toContainText("Exploratory Philosophy");
    await expect(card).not.toContainText("Interpretive Philosophy");

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

test("Archive Profile keeps only Breadth Philosophy eligible at 19 entries", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    for (let i = 0; i < 19; i++) {
        await createEntry(request, {
            title: `Boundary 19 Entry ${i + 1}`,
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        });
    }

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("Archive Interpretation");

    await expect(card).toContainText(
        "Your curator identity most closely aligns with Breadth Philosophy."
    );

    await expect(card).not.toContainText("Exploratory Philosophy");
    await expect(card).not.toContainText("Interpretive Philosophy");

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

test("Archive Profile enters full identity evaluation at 20 entries", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    for (let i = 0; i < 20; i++) {
        await createEntry(request, {
            title: `Boundary 20 Entry ${i + 1}`,
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        });
    }

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("Archive Interpretation");

    await expect(card).toContainText(
        "Your curator identity most closely aligns with"
    );

    await expect(card).not.toContainText(
        "Your curator identity is not yet established."
    );

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

test("Archive Profile remains identity-established at 21 entries", async ({
    page,
    request,
}) => {
    await clearEntries(request);

    for (let i = 0; i < 21; i++) {
        await createEntry(request, {
            title: `Boundary 21 Entry ${i + 1}`,
            media_type: "game",
            genres: ["experimental", "horror"],
            completion_status: "completed",
            date_consumed: "2026-01-01",
            notes: "",
            scores: gameScores(),
        });
    }

    await page.goto("/");

    await page.locator("#archive-profile-tab").click();

    const profilePage = page.locator("#archive-profile-page");

    await expect(profilePage).toBeVisible();

    const card = page.locator("#favorite-media-type-card");

    await expect(card).toContainText("Designation");
    await expect(card).toContainText("Signal Strength");
    await expect(card).toContainText("Archive Interpretation");

    await expect(card).toContainText(
        "Your curator identity most closely aligns with"
    );

    await expect(card).not.toContainText(
        "Your curator identity is not yet established."
    );

    const radar = page.locator("#universal-profile-radar");

    await expect(radar).toBeVisible();

    await expect.poll(async () => {
        return await radar.evaluate((canvas) => {
            return !!Chart.getChart(canvas);
        });
    }).toBe(true);
});

