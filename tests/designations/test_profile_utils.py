from models.services.archive_utils import (
    calculate_average_scores,
    calculate_designation_signal_strength,
    get_top_categories,
)


def test_get_top_categories():

    averages = {"depth": 8, "originality": 9, "craft": 7}

    result = get_top_categories(averages)

    assert result == [("originality", 9), ("depth", 8)]


def test_designation_confidence():

    result = calculate_designation_signal_strength(
        ("originality", 9), ("depth", 8), ("world_building", 7)
    )

    assert result == 8.0


def test_calculate_average_scores():

    entries = [
        {"universal_scores": {"depth": 8, "originality": 9}},
        {"universal_scores": {"depth": 10, "originality": 7}},
    ]

    result = calculate_average_scores(entries, "universal_scores")

    assert result["depth"] == 9
    assert result["originality"] == 8
