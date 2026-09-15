const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests/e2e",

    workers: 1,

    reporter: [
        ["list"],
        ["junit", { outputFile: "reports/playwright/results.xml" }],
        ["./tests/playwright-progress-reporter.js"],
    ],

    use: {
        baseURL: "http://127.0.0.1:3001",
        trace: "on-first-retry",
    },

    webServer: [
        {
            command: "python -m http.server 3001",
            url: "http://127.0.0.1:3001",
            reuseExistingServer: true,
        },
        {
            command: "uvicorn main:app --host 127.0.0.1 --port 8001",
            url: "http://127.0.0.1:8001/docs",
            reuseExistingServer: false,
            env: {
                DB_PATH: "e2e_database.db",
            },
        },
    ],
});