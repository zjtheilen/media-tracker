import pytest

from models.services.archive_statistics import (
    calculate_archive_average_score,
    calculate_score_variance,
    get_highest_rated_entry,
    get_lowest_rated_entry,
)
from models.services.designation_basis import (
    generate_designation_basis,
)


@pytest.mark.unit
def test_archive_average_score():

    entries = [
        {"total_score": 80},
        {"total_score": 90},
    ]

    assert calculate_archive_average_score(entries) == 85


@pytest.mark.unit
def test_archive_average_score_empty():
    assert calculate_archive_average_score([]) == 0


@pytest.mark.unit
def test_score_variance():

    entries = [
        {"total_score": 80},
        {"total_score": 90},
        {"total_score": 100},
    ]

    result = calculate_score_variance(entries)

    assert abs(result - (200 / 3)) < 0.0001


@pytest.mark.unit
def test_score_variance_empty():
    assert calculate_score_variance([]) == 0


@pytest.mark.unit
def test_score_variance_single_entry():
    assert calculate_score_variance([{"total_score": 85}]) == 0


@pytest.mark.unit
def test_score_variance_identical_scores():
    entries = [
        {"total_score": 85},
        {"total_score": 85},
        {"total_score": 85},
    ]

    assert calculate_score_variance(entries) == 0


@pytest.mark.unit
def test_highest_rated_entry():

    entries = [
        {"title": "A", "total_score": 80},
        {"title": "B", "total_score": 95},
    ]

    result = get_highest_rated_entry(entries)

    assert result["title"] == "B"


@pytest.mark.unit
def test_highest_rated_entry_empty():
    assert get_highest_rated_entry([]) is None


@pytest.mark.unit
def test_lowest_rated_entry():

    entries = [
        {"title": "A", "total_score": 80},
        {"title": "B", "total_score": 95},
    ]

    result = get_lowest_rated_entry(entries)

    assert result["title"] == "A"


@pytest.mark.unit
def test_lowest_rated_entry_empty():
    assert get_lowest_rated_entry([]) is None


@pytest.mark.unit
def test_generate_designation_basis():

    result = generate_designation_basis(
        ("originality", 9.5), ("depth", 9), ("world_building", 8)
    )

    assert result["primary"]["name"] == "Originality"
    assert result["secondary"]["name"] == "Depth"
    assert result["media"]["name"] == "World Building"
