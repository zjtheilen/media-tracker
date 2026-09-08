const { test, expect } = require("@playwright/test");

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

test("library search filters records by title", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    await page.locator("#search-input").fill("Silent Hill");

    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(1);

    await expect(
        entriesContainer.locator(".inline-title")
    ).toHaveText("Silent Hill 2");

    await expect(
        page.locator("#active-filters")
    ).toContainText('Search: "silent hill"');

    await expect(
        entriesContainer
    ).not.toContainText("The Shining");

    await expect(
        entriesContainer
    ).not.toContainText("Project Hail Mary");
});

test("library genre filter shows only matching records", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    await page.locator("#genre-search-input").fill("horror");

    const horrorGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "horror",
            exact: true,
        });

    await expect(horrorGenre).toBeVisible();

    await horrorGenre.click();

    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(2);

    await expect(
        entriesContainer
    ).toContainText("Silent Hill 2");

    await expect(
        entriesContainer
    ).toContainText("The Shining");

    await expect(
        entriesContainer
    ).not.toContainText("Project Hail Mary");
});

test("library sorts records by score descending", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    await expect(libraryItems).toHaveCount(3);

    await page.locator("#sort-select").selectOption("score_desc");

    await expect(libraryItems).toHaveCount(3);

    const titles = await libraryItems
        .locator(".inline-title")
        .allTextContents();

    expect(titles.map((title) => title.trim())).toEqual([
        "The Shining",
        "Project Hail Mary",
        "Silent Hill 2",
    ]);
});

test("library clear filters restores the full record set", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    await expect(libraryItems).toHaveCount(3);

    // Apply a search filter.
    await page.locator("#search-input").fill("Silent Hill");

    await expect(libraryItems).toHaveCount(1);

    // Apply a genre filter as well.
    await page.locator("#genre-search-input").fill("horror");

    const horrorGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "horror",
            exact: true,
        });

    await expect(horrorGenre).toBeVisible();

    await horrorGenre.click();

    await expect(libraryItems).toHaveCount(1);

    // Verify both filters are represented in the active filters UI.
    const activeFilters = page.locator("#active-filters");

    await expect(activeFilters).toContainText('Search: "silent hill"');
    await expect(activeFilters).toContainText('Genre: horror');

    // Clear all filters.
    const clearFiltersButton = activeFilters.getByRole("button", {
        name: "Clear Filters",
        exact: true,
    });

    await expect(clearFiltersButton).toBeVisible();

    await clearFiltersButton.click();

    // All records should be visible again.
    await expect(libraryItems).toHaveCount(3);

    await expect(entriesContainer).toContainText("Silent Hill 2");
    await expect(entriesContainer).toContainText("The Shining");
    await expect(entriesContainer).toContainText("Project Hail Mary");

    // Search input should be cleared.
    await expect(page.locator("#search-input")).toHaveValue("");

    // Active filters should be gone.
    await expect(activeFilters).toBeEmpty();
});

test("library record expands and collapses", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Record starts collapsed.
    await expect(
        entriesContainer.locator(".inline-title", {
            hasText: "Silent Hill 2",
        })
    ).toBeVisible();

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const expandedSilentHill = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(expandedSilentHill).toBeVisible();
    await expect(expandedSilentHill.locator(".inline-title"))
        .toHaveText("Silent Hill 2");

    // Only one record should be expanded.
    await expect(
        entriesContainer.locator(".detail-card")
    ).toHaveCount(1);

    // Collapse Silent Hill 2.
    await expandedSilentHill.click();

    await expect(
        entriesContainer.locator(".detail-card")
    ).toHaveCount(0);

    await expect(
        entriesContainer.locator(".library-item", {
            hasText: "Silent Hill 2",
        })
    ).toBeVisible();
});

test("user can create a new library record", async ({ page, request }) => {
    await clearEntries(request);

    await page.goto("/");

    // Open the create-record modal.
    await page.locator("#openBtn").click();

    await expect(page.locator("#entryModal")).toBeVisible();
    await expect(page.locator("#entry-form")).toBeVisible();

    // Fill record identity.
    await page.locator("#title").fill("Test Game");
    await page.locator("#media-type").selectOption("game");

    // Select a valid genre.
    const horrorGenre = page.getByRole("button", {
        name: "horror",
        exact: true,
    });

    await expect(horrorGenre).toBeVisible();
    await horrorGenre.click();

    // Fill the required game scoring categories.
    const scores = {
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
    };

    for (const [category, value] of Object.entries(scores)) {
        await page.locator(`#${category}`).fill(String(value));
    }

    // Submit the form.
    await page.locator("#submitBtn").click();

    // The created record should appear in the Library.
    const entriesContainer = page.locator("#entries-container");

    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(1);

    await expect(entriesContainer).toContainText("Test Game");

    // The form is reset after successful creation and remains open.
    await expect(page.locator("#entryModal")).toBeVisible();

    await expect(page.locator("#title")).toHaveValue("");

    await expect(page.locator("#submitBtn")).toHaveText("Add Entry");
});

test("user can edit a library record and existing scores are preserved", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const expandedEntry = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(expandedEntry).toBeVisible();

    // Open the amendment form.
    await expandedEntry.getByRole("button", {
        name: "Amend Record",
        exact: true,
    }).click();

    const modal = page.locator("#entryModal");

    await expect(modal).toBeVisible();
    await expect(page.locator("#entry-form")).toBeVisible();

    // Existing record data should be loaded into the form.
    await expect(page.locator("#title")).toHaveValue("Silent Hill 2");
    await expect(page.locator("#media-type")).toHaveValue("game");

    // Existing scores should be restored.
    await expect(page.locator("#depth")).toHaveValue("8");
    await expect(page.locator("#originality")).toHaveValue("9");
    await expect(page.locator("#gameplay_mechanics")).toHaveValue("9");

    // Change the title and one score.
    await page.locator("#title").fill("Silent Hill 2 - Amended");
    await page.locator("#depth").fill("10");

    await page.locator("#submitBtn").click();

    // Verify the backend immediately after save.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    const updatedEntry = entries.find(
        (entry) => entry.title === "Silent Hill 2 - Amended"
    );

    expect(updatedEntry).toBeTruthy();

    const scores = Object.fromEntries(
        updatedEntry.scores.map((score) => [
            score.category,
            score.value,
        ])
    );

    // The changed score should be updated.
    expect(scores.depth).toBe(10);

    // Existing scores must survive the amendment.
    expect(scores.originality).toBe(9);
    expect(scores.craft).toBe(8);
    expect(scores.emotional_impact).toBe(8);
    expect(scores.engagement).toBe(9);
    expect(scores.presentation).toBe(8);
    expect(scores.art_atmosphere).toBe(8);
    expect(scores.gameplay_mechanics).toBe(9);
    expect(scores.level_design_progression).toBe(8);
    expect(scores.replayability_systems).toBe(7);
});

test("library search clear button restores all records", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    await expect(libraryItems).toHaveCount(3);

    // Apply a search.
    await page.locator("#search-input").fill("Silent Hill");

    await expect(libraryItems).toHaveCount(1);
    await expect(page.locator("#search-clear")).toBeVisible();

    // Clear the search.
    await page.locator("#search-clear").click();

    // All records should return.
    await expect(libraryItems).toHaveCount(3);

    await expect(page.locator("#search-input")).toHaveValue("");

    await expect(entriesContainer).toContainText("Silent Hill 2");
    await expect(entriesContainer).toContainText("The Shining");
    await expect(entriesContainer).toContainText("Project Hail Mary");

    await expect(page.locator("#active-filters")).toBeEmpty();
});

test("library search and genre filters work together", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    await expect(libraryItems).toHaveCount(3);

    // Search for "the".
    await page.locator("#search-input").fill("the");

    await expect(libraryItems).toHaveCount(1);
    await expect(entriesContainer).toContainText("The Shining");

    // Add the horror genre filter.
    await page.locator("#genre-search-input").fill("horror");

    const horrorGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "horror",
            exact: true,
        });

    await expect(horrorGenre).toBeVisible();
    await horrorGenre.click();

    // The record must satisfy BOTH filters.
    await expect(libraryItems).toHaveCount(1);
    await expect(entriesContainer).toContainText("The Shining");

    await expect(entriesContainer).not.toContainText("Silent Hill 2");
    await expect(entriesContainer).not.toContainText("Project Hail Mary");

    await expect(page.locator("#active-filters"))
        .toContainText('Search: "the"');

    await expect(page.locator("#active-filters"))
        .toContainText("Genre: horror");
});

test("library multiple genre filters require records to match all selected genres", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    // Add a record that has both horror and sci-fi genres.
    const multiGenreEntry = {
        title: "Horror Science Fiction",
        media_type: "game",
        genres: ["horror", "sci-fi"],
        completion_status: "completed",
        notes: "Both genres",
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
    };

    const response = await request.post(
        "http://127.0.0.1:8000/entries/",
        {
            data: multiGenreEntry,
        }
    );

    expect(response.ok()).toBeTruthy();

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    await expect(libraryItems).toHaveCount(4);

    // Select horror.
    await page.locator("#genre-search-input").fill("horror");

    const horrorGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "horror",
            exact: true,
        });

    await expect(horrorGenre).toBeVisible();
    await horrorGenre.click();

    await expect(libraryItems).toHaveCount(3);

    // Select sci-fi as a second genre.
    await page.locator("#genre-search-input").fill("sci-fi");

    const sciFiGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "sci-fi",
            exact: true,
        });

    await expect(sciFiGenre).toBeVisible();
    await sciFiGenre.click();

    // Only the record containing BOTH genres should remain.
    await expect(libraryItems).toHaveCount(1);
    await expect(entriesContainer).toContainText("Horror Science Fiction");

    await expect(entriesContainer).not.toContainText("Silent Hill 2");
    await expect(entriesContainer).not.toContainText("The Shining");
    await expect(entriesContainer).not.toContainText("Project Hail Mary");

    await expect(page.locator("#active-filters"))
        .toContainText("Genre: horror");

    await expect(page.locator("#active-filters"))
        .toContainText("Genre: sci-fi");
});

test("library sorts records by title ascending", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const libraryItems = page.locator(
        "#entries-container .library-item"
    );

    await expect(libraryItems).toHaveCount(3);

    await page.locator("#sort-select").selectOption("title_asc");

    const titles = await libraryItems
        .locator(".inline-title")
        .allTextContents();

    expect(titles.map((title) => title.trim())).toEqual([
        "Project Hail Mary",
        "Silent Hill 2",
        "The Shining",
    ]);
});

test("library sorts records by title descending", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const libraryItems = page.locator(
        "#entries-container .library-item"
    );

    await expect(libraryItems).toHaveCount(3);

    await page.locator("#sort-select").selectOption("title_desc");

    const titles = await libraryItems
        .locator(".inline-title")
        .allTextContents();

    expect(titles.map((title) => title.trim())).toEqual([
        "The Shining",
        "Silent Hill 2",
        "Project Hail Mary",
    ]);
});

test("library genre filter can be toggled off", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const libraryItems = page.locator(
        "#entries-container .library-item"
    );

    await expect(libraryItems).toHaveCount(3);

    await page.locator("#genre-search-input").fill("horror");

    const horrorGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "horror",
            exact: true,
        });

    await expect(horrorGenre).toBeVisible();

    // Apply the filter.
    await horrorGenre.click();

    await expect(libraryItems).toHaveCount(2);

    await expect(
        page.locator("#active-filters")
    ).toContainText("Genre: horror");

    // Toggle the same genre off.
    await horrorGenre.click();

    await expect(libraryItems).toHaveCount(3);

    await expect(
        page.locator("#active-filters")
    ).toBeEmpty();
});

test("expanding another library record collapses the previous record", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Silent Hill 2",
        })
    ).toBeVisible();

    // Expand The Shining.
    await entriesContainer.locator(".library-item", {
        hasText: "The Shining",
    }).click();

    // Silent Hill should now be collapsed.
    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Silent Hill 2",
        })
    ).toHaveCount(0);

    // The Shining should be the only expanded record.
    await expect(
        entriesContainer.locator(".detail-card")
    ).toHaveCount(1);

    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "The Shining",
        })
    ).toBeVisible();
});

test("canceling purge leaves the library record intact", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const expandedEntry = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(expandedEntry).toBeVisible();

    // Open the purge confirmation dialog.
    await expandedEntry.getByRole("button", {
        name: "Purge Record",
        exact: true,
    }).click();

    const deleteModal = page.locator("#deleteModal");

    await expect(deleteModal).toBeVisible();
    await expect(deleteModal).toContainText(
        "Are you sure you want to delete this entry?"
    );

    // Cancel the purge.
    await page.locator("#cancelDeleteBtn").click();

    // Confirmation dialog should close.
    await expect(deleteModal).not.toBeVisible();

    // The record should still be present.
    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Silent Hill 2",
        })
    ).toBeVisible();

    // Backend should still contain all three records.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    expect(entries).toHaveLength(3);
    expect(
        entries.some((entry) => entry.title === "Silent Hill 2")
    ).toBeTruthy();
});

test("confirming purge removes the library record", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const expandedEntry = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(expandedEntry).toBeVisible();

    // Open the purge confirmation dialog.
    await expandedEntry.getByRole("button", {
        name: "Purge Record",
        exact: true,
    }).click();

    const deleteModal = page.locator("#deleteModal");

    await expect(deleteModal).toBeVisible();

    // Confirm the purge.
    await page.locator("#confirmDeleteBtn").click();

    // Confirmation dialog should close after deletion.
    await expect(deleteModal).not.toBeVisible();

    // Silent Hill 2 should no longer be in the Library.
    await expect(
        entriesContainer.locator(".library-item", {
            hasText: "Silent Hill 2",
        })
    ).toHaveCount(0);

    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Silent Hill 2",
        })
    ).toHaveCount(0);

    // The other two records should remain.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(2);

    await expect(entriesContainer).toContainText("The Shining");
    await expect(entriesContainer).toContainText("Project Hail Mary");

    // Verify deletion persisted to the backend.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    expect(entries).toHaveLength(2);
    expect(
        entries.some((entry) => entry.title === "Silent Hill 2")
    ).toBeFalsy();
});

test("library shows an empty state when the archive has no records", async ({ page, request }) => {
    await clearEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // No library records should exist.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(0);

    // The intentional empty state should be displayed.
    const emptyState = entriesContainer.locator(".empty-state");

    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator("h3")).toHaveText(
        "No matching records found"
    );
    await expect(emptyState.locator("p")).toHaveText(
        "Adjust archive search parameters or filters."
    );
});

test("library shows an empty state when search returns no matches", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");
    const libraryItems = entriesContainer.locator(".library-item");

    // Confirm the seeded records are initially visible.
    await expect(libraryItems).toHaveCount(3);

    // Search for a title that does not exist.
    await page.locator("#search-input").fill("Definitely Not In The Archive");

    // No records should remain.
    await expect(libraryItems).toHaveCount(0);

    // The empty state should be displayed.
    const emptyState = entriesContainer.locator(".empty-state");

    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator("h3")).toHaveText(
        "No matching records found"
    );
    await expect(emptyState.locator("p")).toHaveText(
        "Adjust archive search parameters or filters."
    );

    // The search should be represented in the active filters.
    await expect(page.locator("#active-filters"))
        .toContainText('Search: "definitely not in the archive"');
});

test("library shows an empty state when a valid genre has no matching records", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // The seeded archive contains horror and sci-fi records,
    // but no romance records.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    // Search for the valid "romance" genre.
    await page.locator("#genre-search-input").fill("romance");

    const romanceGenre = page
        .locator("#genre-filter-results")
        .getByRole("button", {
            name: "romance",
            exact: true,
        });

    await expect(romanceGenre).toBeVisible();

    // Select the genre.
    await romanceGenre.click();

    // No records should match.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(0);

    // The intentional empty state should be displayed.
    const emptyState = entriesContainer.locator(".empty-state");

    await expect(emptyState).toBeVisible();
    await expect(emptyState.locator("h3")).toHaveText(
        "No matching records found"
    );
    await expect(emptyState.locator("p")).toHaveText(
        "Adjust archive search parameters or filters."
    );

    // The selected genre should remain visible as an active filter.
    await expect(page.locator("#active-filters"))
        .toContainText("Genre: romance");
});

test("library sorts records by date consumed descending", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    await page.locator("#sort-select").selectOption("date_desc");

    const titles = (await page
        .locator("#entries-container .library-item .inline-title")
        .allTextContents()).map((title) => title.trim());

    expect(titles).toEqual([
        "Silent Hill 2",
        "The Shining",
        "Project Hail Mary",
    ]);
});

test("library sorts records by media type ascending", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    await page.locator("#sort-select").selectOption("media_type_asc");

    const titles = (await page
        .locator("#entries-container .library-item .inline-title")
        .allTextContents()).map((title) => title.trim());

    expect(titles).toEqual([
        "Project Hail Mary",
        "Silent Hill 2",
        "The Shining",
    ]);
});

test("canceling Add Entry leaves the library unchanged", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Confirm the seeded records are present.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    // Open the Add Entry modal.
    await page.locator("#openBtn").click();

    const entryModal = page.locator("#entryModal");

    await expect(entryModal).toBeVisible();

    // Cancel the form without submitting.
    await page.locator("#closeBtn").click();

    // The modal should close.
    await expect(entryModal).not.toBeVisible();

    // The Library should remain unchanged.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    await expect(entriesContainer).toContainText("Silent Hill 2");
    await expect(entriesContainer).toContainText("The Shining");
    await expect(entriesContainer).toContainText("Project Hail Mary");

    // Verify nothing was accidentally created in the backend.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    expect(entries).toHaveLength(3);
});

test("canceling an edit leaves the original record unchanged", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Expand Silent Hill 2.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const expandedEntry = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(expandedEntry).toBeVisible();

    // Open the edit form.
    await expandedEntry.getByRole("button", {
        name: "Amend Record",
        exact: true,
    }).click();

    const entryModal = page.locator("#entryModal");

    await expect(entryModal).toBeVisible();

    // Confirm the original values are loaded.
    await expect(page.locator("#title")).toHaveValue("Silent Hill 2");
    await expect(page.locator("#depth")).toHaveValue("8");

    // Make unsaved changes.
    await page.locator("#title").fill("Silent Hill 2 - Should Not Save");
    await page.locator("#depth").fill("10");

    // Cancel the edit.
    await page.locator("#closeBtn").click();

    // The modal should close.
    await expect(entryModal).not.toBeVisible();

    // The original record should still be displayed.
    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Silent Hill 2",
        })
    ).toBeVisible();

    await expect(
        entriesContainer.locator(".detail-card", {
            hasText: "Should Not Save",
        })
    ).toHaveCount(0);

    // Verify the original data still exists in the backend.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    const silentHill = entries.find(
        (entry) => entry.title === "Silent Hill 2"
    );

    expect(silentHill).toBeTruthy();

    const depthScore = silentHill.scores.find(
        (score) => score.category === "depth"
    );

    expect(depthScore.value).toBe(8);

    // The unsaved title should not exist.
    expect(
        entries.some(
            (entry) => entry.title === "Silent Hill 2 - Should Not Save"
        )
    ).toBeFalsy();
});

test("invalid Add Entry submission shows validation error and creates no record", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Open Add Entry.
    await page.locator("#openBtn").click();

    const entryModal = page.locator("#entryModal");

    await expect(entryModal).toBeVisible();
    await expect(page.locator("#submitBtn")).toHaveText("Create Record");

    // Provide a valid title, but do not select a genre.
    await page.locator("#title").fill("Invalid Test Record");

    // Submit without selecting a genre.
    await page.locator("#submitBtn").click();

    // Application validation error should be displayed.
    await expect(page.locator("#form-message")).toHaveText(
        "Select at least 1 genre."
    );

    // Modal should remain open.
    await expect(entryModal).toBeVisible();

    // Existing library records should remain untouched.
    await expect(
        entriesContainer.locator(".library-item")
    ).toHaveCount(3);

    // Verify no record was created in the backend.
    const response = await request.get(
        "http://127.0.0.1:8000/entries/"
    );

    expect(response.ok()).toBeTruthy();

    const entries = await response.json();

    expect(entries).toHaveLength(3);

    expect(
        entries.some(
            (entry) => entry.title === "Invalid Test Record"
        )
    ).toBeFalsy();
});

test("media-specific chart remains bounded when switching between records", async ({ page, request }) => {
    await clearEntries(request);
    await seedEntries(request);

    await page.goto("/");

    const entriesContainer = page.locator("#entries-container");

    // Open the first record.
    await entriesContainer.locator(".library-item", {
        hasText: "Silent Hill 2",
    }).click();

    const firstDetail = entriesContainer.locator(".detail-card", {
        hasText: "Silent Hill 2",
    });

    await expect(firstDetail).toBeVisible();

    const firstChartPanel = firstDetail.locator(".chart-panel", {
        hasText: "Game Scoring",
    });

    await expect(firstChartPanel).toBeVisible();

    const firstChartContainer = firstChartPanel.locator(".chart-container");

    await expect(firstChartContainer).toBeVisible();
    await expect(firstChartContainer).toHaveCSS("height", "220px");

    // Switch to the second record.
    await entriesContainer.locator(".library-item", {
        hasText: "The Shining",
    }).click();

    const secondDetail = entriesContainer.locator(".detail-card", {
        hasText: "The Shining",
    });

    await expect(secondDetail).toBeVisible();

    const secondChartPanel = secondDetail.locator(".chart-panel", {
        hasText: "Video Scoring",
    });

    await expect(secondChartPanel).toBeVisible();

    const secondChartContainer = secondChartPanel.locator(".chart-container");

    await expect(secondChartContainer).toBeVisible();
    await expect(secondChartContainer).toHaveCSS("height", "220px");

    // Switch to the third record.
    await entriesContainer.locator(".library-item", {
        hasText: "Project Hail Mary",
    }).click();

    const thirdDetail = entriesContainer.locator(".detail-card", {
        hasText: "Project Hail Mary",
    });

    await expect(thirdDetail).toBeVisible();

    const thirdChartPanel = thirdDetail.locator(".chart-panel", {
        hasText: "Book Scoring",
    });

    await expect(thirdChartPanel).toBeVisible();

    const thirdChartContainer = thirdChartPanel.locator(".chart-container");

    await expect(thirdChartContainer).toBeVisible();
    await expect(thirdChartContainer).toHaveCSS("height", "220px");

    // Switch back through entries repeatedly to catch runaway chart growth.
    for (const [title, scoringLabel] of [
        ["Silent Hill 2", "Game Scoring"],
        ["The Shining", "Video Scoring"],
        ["Project Hail Mary", "Book Scoring"],
        ["Silent Hill 2", "Game Scoring"],
        ["The Shining", "Video Scoring"],
        ["Project Hail Mary", "Book Scoring"],
    ]) {
        await entriesContainer.locator(".library-item", {
            hasText: title,
        }).click();

        const detail = entriesContainer.locator(".detail-card", {
            hasText: title,
        });

        await expect(detail).toBeVisible();

        const chartPanel = detail.locator(".chart-panel", {
            hasText: scoringLabel,
        });

        await expect(chartPanel).toBeVisible();

        const chartContainer = chartPanel.locator(".chart-container");

        await expect(chartContainer).toBeVisible();
        await expect(chartContainer).toHaveCSS("height", "220px");
    }
});
