import pytest

from models.services.archive_statistics import calculate_monthly_archive_activity


@pytest.mark.unit
def test_monthly_archive_activity():
    entries = [
        {"date_consumed": "2025-01-01"},
        {"date_consumed": "2025-01-21"},
        {"date_consumed": "2025-05-14"},
        {"date_consumed": "2025-11-17"},
        {"date_consumed": "2025-11-24"},
        {"date_consumed": "2026-03-16"},
    ]

    result = calculate_monthly_archive_activity(entries)

    assert result == {
        "2025-01": 2,
        "2025-05": 1,
        "2025-11": 2,
        "2026-03": 1,
    }


@pytest.mark.unit
def test_monthly_archive_activity_ignores_undated_entries():
    entries = [
        {"date_consumed": "2025-01-01"},
        {"date_consumed": None},
        {"date_consumed": ""},
        {},
        {"date_consumed": "2025-01-21"},
    ]

    result = calculate_monthly_archive_activity(entries)

    assert result == {
        "2025-01": 2,
    }


@pytest.mark.unit
def test_monthly_archive_activity_empty():
    assert calculate_monthly_archive_activity([]) == {}
