const { test, expect } = require("@playwright/test");

test.describe("Recommendations", () => {
    test("Recommendations placeholder renders", async ({ page }) => {
        await page.goto("/");

        await page.locator("#recommendations-tab").click();

        const recommendationsPage = page.locator("#recommendations-page");

        await expect(recommendationsPage).toBeVisible();
        await expect(recommendationsPage).toContainText("Recommendations");
        await expect(recommendationsPage).toContainText(
            "What should you consume next?"
        );

        const engine = recommendationsPage.locator(
            ".recommendation-placeholder"
        );

        await expect(engine).toBeVisible();
        await expect(engine).toContainText(
            "Archive recommendations unavailable."
        );
        await expect(engine).toContainText(
            "Prediction model awaiting calibration."
        );

        const content = recommendationsPage.locator(
            "#recommendations-content"
        );

        await expect(content).toBeVisible();
        await expect(content).toContainText(
            "Recommendations are not yet available."
        );
    });
});