const { spawn } = require("node:child_process");
const fs = require("node:fs");

const suites = [
    {
        name: "Node",
        command: "npm",
        args: ["run", "test:config:quiet"],
        expected: 1,
    },
    {
        name: "Pytest",
        command: "pytest",
        args: [
            "-q",
            "-p",
            "tests.pytest_progress",
            "--junitxml=reports/pytest/results.xml",
        ],
        report: "reports/pytest/results.xml",
        progressFile: "reports/pytest/progress.json",
    },
    {
        name: "Playwright",
        command: "npm",
        args: ["run", "test:e2e:quiet"],
        report: "reports/playwright/results.xml",
        progressFile: "reports/playwright/progress.json",
    },
];

const results = [];

const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;

function parseJUnitResults(reportPath) {
    if (!fs.existsSync(reportPath)) {
        return null;
    }

    const xml = fs.readFileSync(reportPath, "utf8");

    const testsMatch = xml.match(/tests="(\d+)"/);
    const failuresMatch = xml.match(/failures="(\d+)"/);
    const errorsMatch = xml.match(/errors="(\d+)"/);
    const skippedMatch = xml.match(/skipped="(\d+)"/);

    if (!testsMatch) {
        return null;
    }

    const total = Number(testsMatch[1]);
    const failures = Number(failuresMatch?.[1] || 0);
    const errors = Number(errorsMatch?.[1] || 0);
    const skipped = Number(skippedMatch?.[1] || 0);
    const passed = total - failures - errors - skipped;

    const failedTests = [];
    const testcaseRegex =
        /<testcase\b([^>]*?)(?:\/>|>([\s\S]*?)<\/testcase>)/g;

    let match;

    while ((match = testcaseRegex.exec(xml)) !== null) {
        const attributes = match[1];
        const contents = match[2] || "";

        if (!/<failure\b|<error\b/.test(contents)) {
            continue;
        }

        const nameMatch = attributes.match(/\bname="([^"]*)"/);
        const classnameMatch =
            attributes.match(/\bclassname="([^"]*)"/);

        failedTests.push({
            classname: classnameMatch?.[1] || "Unknown test class",
            name: nameMatch?.[1] || "Unknown test",
        });
    }

    return {
        total,
        passed,
        failures,
        errors,
        skipped,
        failedTests,
    };
}

function runSuite(suite) {
    return new Promise((resolve) => {
        if (suite.report && fs.existsSync(suite.report)) {
            fs.rmSync(suite.report);
        }

        if (suite.progressFile && fs.existsSync(suite.progressFile)) {
            fs.rmSync(suite.progressFile);
        }

        console.log(`${suite.name} test`);

        const child = spawn(suite.command, suite.args, {
            stdio: "ignore",
            shell: true,
        });

        const barWidth = 20;
        const barCharacter = "#";
        const spinnerCharacters = ["|", "/", "-", "\\"];

        let spinnerPosition = 0;
        let completed = 0;
        let total = suite.expected || 0;

        const readProgress = () => {
            if (!suite.progressFile || !fs.existsSync(suite.progressFile)) {
                return;
            }

            try {
                const progress = JSON.parse(
                    fs.readFileSync(suite.progressFile, "utf8")
                );

                completed = progress.completed ?? 0;
                total = progress.total ?? total;
            } catch {
                // Progress file may be mid-write; try again next tick.
            }
        };

        const renderProgress = () => {
            readProgress();

            const ratio = total > 0
                ? Math.min(completed / total, 1)
                : 0;

            const filled = Math.round(ratio * barWidth);
            const empty = barWidth - filled;
            const spinner =
                spinnerCharacters[spinnerPosition];

            process.stdout.write(
                `\r[${barCharacter.repeat(filled)}${" ".repeat(empty)} ${spinner}]`
            );

            spinnerPosition =
                (spinnerPosition + 1) % spinnerCharacters.length;
        };

        renderProgress();

        const progressTimer = setInterval(
            renderProgress,
            100
        );

        child.on("close", (code) => {
            clearInterval(progressTimer);

            readProgress();

            let result;

            if (suite.report) {
                const testResults =
                    parseJUnitResults(suite.report);

                result = {
                    ...suite,
                    passed:
                        code === 0 &&
                        testResults !== null,
                    actual:
                        testResults?.passed ?? 0,
                    total:
                        testResults?.total ?? total,
                    failedTests:
                        testResults?.failedTests ?? [],
                };
            } else {
                result = {
                    ...suite,
                    passed: code === 0,
                    actual:
                        code === 0
                            ? suite.expected
                            : 0,
                    total: suite.expected,
                    failedTests: [],
                };
            }

            process.stdout.write("\r\x1b[2K");

            const finalBar =
                `[${barCharacter.repeat(barWidth)}]`;

            console.log(
                result.passed
                    ? green(finalBar)
                    : red(finalBar)
            );

            const suiteText =
                `${suite.name} ${result.actual}/${result.total} passed`;

            console.log(
                result.passed
                    ? green(suiteText)
                    : red(suiteText)
            );

            console.log("");

            results.push(result);

            resolve();
        });
    });
}

async function main() {
    fs.mkdirSync("reports/pytest", { recursive: true });
    fs.mkdirSync("reports/playwright", { recursive: true });

    console.log("");
    console.log("========================================");
    console.log("             WASABI TEST RUN");
    console.log("========================================");
    console.log("");

    for (const suite of suites) {
        await runSuite(suite);

        if (suite !== suites[suites.length - 1]) {
            console.log("----------------------------------------");
            console.log("");
        }
    }

    const totalExpected = results.reduce(
        (total, suite) => total + suite.total,
        0
    );

    const totalPassed = results.reduce(
        (total, suite) => total + suite.actual,
        0
    );

    const allPassed = results.every(
        (suite) => suite.passed
    );

    const totalText =
        `TOTAL: ${totalPassed}/${totalExpected} passed`;

    console.log("========================================");

    console.log(
        allPassed
            ? green(totalText)
            : red(totalText)
    );

    console.log(
        allPassed
            ? green("STATUS: PASSED")
            : red("STATUS: FAILED")
    );

    if (!allPassed) {
        console.log("");
        console.log("FAILURES:");

        for (const suite of results) {
            if (suite.failedTests.length === 0) {
                continue;
            }

            console.log(`  ${suite.name}`);

            for (const test of suite.failedTests) {
                console.log(`    ${test.classname}`);
                console.log(`      ${test.name}`);
            }
        }
    }

    console.log("========================================");

    process.exitCode = allPassed ? 0 : 1;
}

main();