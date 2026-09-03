from models.services.archive_utils import (
    calculate_average_scores,
    calculate_designation_signal_strength,
    format_score_category,
    get_top_categories,
)


def test_calculate_average_scores():

    entries = [
        {"universal_scores": {"depth": 8, "originality": 10}},
        {"universal_scores": {"depth": 10, "originality": 8}},
    ]

    result = calculate_average_scores(entries, "universal_scores")

    assert result["depth"] == 9
    assert result["originality"] == 9


def test_get_top_categories():

    averages = {"depth": 9, "originality": 9.5, "craft": 8}

    result = get_top_categories(averages, 2)

    assert result == [("originality", 9.5), ("depth", 9)]


def test_format_score_category():

    assert format_score_category("world_building") == "World Building"


def test_calculate_designation_signal_strength():

    result = calculate_designation_signal_strength(
        ("originality", 9), ("depth", 8), ("world_building", 7)
    )

    assert result == 8.0
