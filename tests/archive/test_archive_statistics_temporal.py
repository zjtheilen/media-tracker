import pytest

from models.services.archive_statistics import (
    calculate_monthly_archive_activity,
    calculate_monthly_media_distribution,
)


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


@pytest.mark.unit
def test_monthly_media_distribution():
    entries = [
        {"date_consumed": "2025-01-01", "media_type": "game"},
        {"date_consumed": "2025-01-21", "media_type": "game"},
        {"date_consumed": "2025-01-22", "media_type": "game"},
        {"date_consumed": "2025-01-30", "media_type": "game"},
        {"date_consumed": "2025-11-17", "media_type": "video"},
        {"date_consumed": "2025-11-17", "media_type": "video"},
        {"date_consumed": "2026-03-23", "media_type": "book"},
        {"date_consumed": "2026-04-08", "media_type": "book"},
        {"date_consumed": "2026-04-25", "media_type": "game"},
    ]

    result = calculate_monthly_media_distribution(entries)

    assert result == {
        "2025-01": {
            "video": 0,
            "game": 4,
            "book": 0,
        },
        "2025-11": {
            "video": 2,
            "game": 0,
            "book": 0,
        },
        "2026-03": {
            "video": 0,
            "game": 0,
            "book": 1,
        },
        "2026-04": {
            "video": 0,
            "game": 1,
            "book": 1,
        },
    }


@pytest.mark.unit
def test_monthly_media_distribution_ignores_undated_entries():
    entries = [
        {"date_consumed": "2025-01-01", "media_type": "game"},
        {"date_consumed": None, "media_type": "video"},
        {"date_consumed": "", "media_type": "book"},
        {"media_type": "video"},
    ]

    result = calculate_monthly_media_distribution(entries)

    assert result == {
        "2025-01": {
            "video": 0,
            "game": 1,
            "book": 0,
        },
    }


@pytest.mark.unit
def test_monthly_media_distribution_empty():
    assert calculate_monthly_media_distribution([]) == {}
