from models.services.archive_classification import (
    generate_classification_basis,
)

from models.services.archive_statistics import (
    calculate_archive_average_score,
    get_highest_rated_entry,
    get_lowest_rated_entry,
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


def test_generate_classification_basis():

    result = generate_classification_basis(
        ("originality", 9.5), ("depth", 9), ("world_building", 8)
    )

    assert result["primary"]["name"] == "Originality"
    assert result["secondary"]["name"] == "Depth"
    assert result["media"]["name"] == "World Building"
