const test = require("node:test");
const assert = require("node:assert/strict");
const config = require("../../playwright.config");

test("Playwright E2E backend uses isolated database and cannot reuse dev server", () => {
    const backendServer = config.webServer.find(
        (server) => server.command.includes("uvicorn")
    );

    assert.ok(
        backendServer,
        "Could not find the Playwright backend server configuration."
    );

    assert.equal(
        backendServer.reuseExistingServer,
        false,
        "The E2E backend must not reuse an existing development server."
    );

    assert.equal(
        backendServer.env?.DB_PATH,
        "e2e_database.db",
        "The E2E backend must use the isolated E2E database."
    );
});