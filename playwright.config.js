const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests/e2e",

    workers: 1,

    use: {
        baseURL: "http://127.0.0.1:3000",
        trace: "on-first-retry",
    },

    webServer: [
        {
            command: "python -m http.server 3000",
            url: "http://127.0.0.1:3000",
            reuseExistingServer: true,
        },
        {
            command: "uvicorn main:app --host 127.0.0.1 --port 8000",
            url: "http://127.0.0.1:8000/docs",
            reuseExistingServer: true,
            env: {
                DB_PATH: "e2e_database.db",
            },
        },
    ],
});