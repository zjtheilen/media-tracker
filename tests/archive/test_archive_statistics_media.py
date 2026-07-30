from models.services.archive_classification import (
    generate_classification_basis,
)
from models.services.archive_utils import calculate_designation_confidence
from models.services.archive_statistics import calculate_media_distribution


def test_media_distribution():

    entries = [
        {"media_type": "video"},
        {"media_type": "video"},
        {"media_type": "game"},
        {"media_type": "book"},
    ]

    result = calculate_media_distribution(entries)

    assert result["video"] == 2
    assert result["game"] == 1
    assert result["book"] == 1


def test_generate_classification_basis():

    result = generate_classification_basis(
        ("originality", 9.5), ("depth", 9), ("world_building", 8)
    )

    assert result == {
        "primary": {"name": "Originality", "score": 9.5},
        "secondary": {"name": "Depth", "score": 9},
        "media": {"name": "World Building", "score": 8},
    }


def test_calculate_designation_confidence():

    result = calculate_designation_confidence(
        ("originality", 9.5),
        ("depth", 9),
        ("world_building", 8)
    )

    assert result == 8.8