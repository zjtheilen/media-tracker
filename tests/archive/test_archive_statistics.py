from models.services.archive_statistics import (
    calculate_archive_average_score,
    get_highest_rated_entry,
    get_lowest_rated_entry,
)
from models.services.designation_basis import (
    generate_designation_basis,
)


def test_archive_average_score():

    entries = [
        {"total_score": 80},
        {"total_score": 90},
    ]

    assert calculate_archive_average_score(entries) == 85


def test_highest_rated_entry():

    entries = [
        {"title": "A", "total_score": 80},
        {"title": "B", "total_score": 95},
    ]

    result = get_highest_rated_entry(entries)

    assert result["title"] == "B"


def test_lowest_rated_entry():

    entries = [
        {"title": "A", "total_score": 80},
        {"title": "B", "total_score": 95},
    ]

    result = get_lowest_rated_entry(entries)

    assert result["title"] == "A"


def test_generate_designation_basis():

    result = generate_designation_basis(
        ("originality", 9.5), ("depth", 9), ("world_building", 8)
    )

    assert result["primary"]["name"] == "Originality"
    assert result["secondary"]["name"] == "Depth"
    assert result["media"]["name"] == "World Building"
