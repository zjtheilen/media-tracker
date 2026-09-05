const { test, expect } = require("@playwright/test");

test("application loads", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Media Tracker");
    await expect(page.locator("h1")).toHaveText("WASABI");
    await expect(page.locator("#library-page")).toBeVisible();
});