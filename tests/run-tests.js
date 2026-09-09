const { spawn } = require("node:child_process");
const fs = require("node:fs");

const suites = [
    {
        name: "Node config",
        command: "npm",
        args: ["run", "test:config"],
        expected: 1,
    },
    {
        name: "Pytest",
        command: "pytest",
        args: [
            "-q",
            "--junitxml=reports/pytest/results.xml",
        ],
        expected: 245,
        report: "reports/pytest/results.xml",
    },
    {
        name: "Playwright",
        command: "npm",
        args: ["run", "test:e2e"],
        expected: 46,
        report: "reports/playwright/results.xml",
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
        const classnameMatch = attributes.match(/\bclassname="([^"]*)"/);

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
        const child = spawn(suite.command, suite.args, {
            stdio: "inherit",
            shell: true,
        });

        child.on("close", (code) => {
            let result;

            if (suite.report) {
                const testResults = parseJUnitResults(suite.report);

                result = {
                    ...suite,
                    passed: code === 0 && testResults !== null,
                    actual: testResults?.passed ?? 0,
                    total: testResults?.total ?? suite.expected,
                    failedTests: testResults?.failedTests ?? [],
                };
            } else {
                result = {
                    ...suite,
                    passed: code === 0,
                    actual: code === 0 ? suite.expected : 0,
                    total: suite.expected,
                    failedTests: [],
                };
            }

            results.push(result);

            resolve();
        });
    });
}

async function main() {
    fs.mkdirSync("reports/pytest", { recursive: true });
    fs.mkdirSync("reports/playwright", { recursive: true });

    for (const suite of suites) {
        await runSuite(suite);
    }

    const totalExpected = results.reduce(
        (total, suite) => total + suite.total,
        0
    );

    const totalPassed = results.reduce(
        (total, suite) => total + suite.actual,
        0
    );

    const allPassed = results.every((suite) => suite.passed);

    const totalText = `${totalPassed}/${totalExpected} passed`;

    console.log("");
    console.log("========================================");
    console.log("           WASABI TEST SUMMARY");
    console.log("========================================");

    for (const suite of results) {
        const suiteText = `${suite.actual}/${suite.total} passed`;

        console.log(
            `${suite.name.padEnd(16)} ${suite.passed ? green(suiteText) : red(suiteText)
            }`
        );
    }

    console.log("----------------------------------------");

    console.log(
        `TOTAL:           ${allPassed ? green(totalText) : red(totalText)
        }`
    );

    console.log(
        `STATUS:          ${allPassed ? green("PASSED") : red("FAILED")
        }`
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