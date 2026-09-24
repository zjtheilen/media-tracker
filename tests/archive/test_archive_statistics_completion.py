import pytest

from models.services.archive_statistics import calculate_completion_distribution


@pytest.mark.unit
def test_completion_distribution():

    entries = [
        {"completion_status": "completed"},
        {"completion_status": "completed"},
        {"completion_status": "in-progress"},
        {"completion_status": "dropped"},
        {"completion_status": "planned"},
    ]

    result = calculate_completion_distribution(entries)

    assert result["completed"] == 2
    assert result["in-progress"] == 1
    assert result["dropped"] == 1
    assert result["planned"] == 1


@pytest.mark.unit
def test_completion_distribution_empty():

    result = calculate_completion_distribution([])

    assert result == {
        "completed": 0,
        "in-progress": 0,
        "dropped": 0,
        "planned": 0,
    }