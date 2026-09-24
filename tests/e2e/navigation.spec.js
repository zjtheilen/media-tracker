const { test, expect } = require("@playwright/test");

test("user can navigate between all main pages", async ({ page }) => {
    await page.goto("/");

    const pages = [
        ["#library-tab", "#library-page"],
        ["#analytics-tab", "#analytics-page"],
        ["#lists-tab", "#lists-page"],
        ["#archive-profile-tab", "#archive-profile-page"],
        ["#recommendations-tab", "#recommendations-page"],
    ];

    for (const [tab, pageSelector] of pages) {
        await page.locator(tab).click();

        await expect(page.locator(pageSelector)).toBeVisible();
        await expect(page.locator(tab)).toHaveClass(/active/);
    }
});