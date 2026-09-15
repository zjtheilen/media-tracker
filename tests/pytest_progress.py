import json
from pathlib import Path

PROGRESS_FILE = Path("reports/pytest/progress.json")


def pytest_sessionstart(session):
    PROGRESS_FILE.parent.mkdir(parents=True, exist_ok=True)

    PROGRESS_FILE.write_text(
        json.dumps(
            {
                "total": 0,
                "completed": 0,
            }
        )
    )


def pytest_collection_finish(session):
    progress = {
        "total": len(session.items),
        "completed": 0,
    }

    PROGRESS_FILE.write_text(json.dumps(progress))


def pytest_runtest_logreport(report):
    if report.when != "call":
        return

    try:
        progress = json.loads(
            PROGRESS_FILE.read_text()
        )
    except (FileNotFoundError, json.JSONDecodeError):
        return

    progress["completed"] += 1

    PROGRESS_FILE.write_text(
        json.dumps(progress)
    )