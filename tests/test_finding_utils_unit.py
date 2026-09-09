from models.services.finding_utils import (
    genre_presence,
    genre_strength,
    score_threshold,
)


def test_score_threshold_returns_matching_score():
    thresholds = [
        {"value": 9, "score": 3},
        {"value": 7, "score": 2},
        {"value": 5, "score": 1},
    ]

    assert score_threshold(8, thresholds) == 2


def test_score_threshold_returns_zero_when_no_threshold_matches():
    thresholds = [
        {"value": 9, "score": 3},
        {"value": 7, "score": 2},
        {"value": 5, "score": 1},
    ]

    assert score_threshold(4, thresholds) == 0


def test_genre_presence_returns_ratio_for_present_genre():
    profile = {
        "genreDistribution": {
            "sci-fi": {"count": 3},
        },
        "entryCount": 10,
    }

    assert genre_presence("sci-fi", profile) == 0.3


def test_genre_presence_returns_zero_for_missing_genre():
    profile = {
        "genreDistribution": {
            "sci-fi": {"count": 3},
        },
        "entryCount": 10,
    }

    assert genre_presence("horror", profile) == 0


def test_genre_strength_returns_percentage():
    profile = {
        "genreDistribution": {
            "sci-fi": {"count": 3},
        },
        "entryCount": 10,
    }

    assert genre_strength("sci-fi", profile) == 30