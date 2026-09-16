import pytest

from migrations.migrate_historical_library import (
    get_historical_completion_status,
)


@pytest.mark.unit
@pytest.mark.parametrize(
    "method, expected",
    [
        ("Credits", "completed"),
        ("Credits, all endings + true ending", "completed"),
        ("Credits ~50% completed", "in-progress"),
        ("Stuck on final boss", "in-progress"),
    ],
)
def test_historical_completion_status(method, expected):
    record = {"method": method}

    assert get_historical_completion_status(record) == expected


@pytest.mark.unit
def test_historical_completion_status_without_method():
    record = {}

    assert get_historical_completion_status(record) == "completed"