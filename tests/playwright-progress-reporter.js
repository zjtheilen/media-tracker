const fs = require("node:fs");

const PROGRESS_FILE = "reports/playwright/progress.json";

class ProgressReporter {
    onBegin(config, suite) {
        fs.writeFileSync(
            PROGRESS_FILE,
            JSON.stringify({
                total: suite.allTests().length,
                completed: 0,
            })
        );
    }

    onTestEnd() {
        const progress = JSON.parse(
            fs.readFileSync(PROGRESS_FILE, "utf8")
        );

        progress.completed += 1;

        fs.writeFileSync(
            PROGRESS_FILE,
            JSON.stringify(progress)
        );
    }

    printsToStdio() {
        return false;
    }
}

module.exports = ProgressReporter;