from models.services.archive_engine import build_archive_profile
from models.services.trait_calculator import (
    calculate_archive_traits,
    normalize_trait,
)
from tests.helpers.fixture_loader import load_profile_fixture


def test_empty_profile_returns_zeros():

    traits = calculate_archive_traits({})

    assert traits["originality_strength"] == 0
    assert traits["depth_strength"] == 0
    assert traits["craft_strength"] == 0
    assert traits["engagement_strength"] == 0

    assert traits["experimental_presence"] == 0
    assert traits["sci_fi_presence"] == 0
    assert traits["psychological_presence"] == 0


def test_score_of_ten_produces_one_point_zero():

    result = normalize_trait(10)

    assert result == 1.0


def test_score_of_six_produces_zero():

    result = normalize_trait(6)

    assert result == 0


def test_genre_percentage_calculation():

    profile = {"entryCount": 10, "genreDistribution": {"sci-fi": {"count": 4}}}

    traits = calculate_archive_traits(profile)

    assert traits["sci_fi_presence"] == 0.4


def test_full_boundary_explorer_fixture_produces_expected_signals():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    traits = calculate_archive_traits(profile)

    assert traits["originality_strength"] > 0
    assert traits["depth_strength"] > 0

    assert traits["surreal_presence"] > 0
    assert traits["sci_fi_presence"] > 0


def test_low_scores_do_not_create_strength():

    profile = {
        "universalAverages": {
            "originality": 3,
            "depth": 5,
            "craft": 4,
        }
    }

    traits = calculate_archive_traits(profile)

    assert traits["originality_strength"] == 0
    assert traits["depth_strength"] == 0
    assert traits["craft_strength"] == 0


def test_archive_traits_include_genre_signals():

    profile = {
        "entryCount": 10,
        "genreDistribution": {"horror": {"count": 5, "percentage": 50}},
        "universalAverages": {},
        "mediaAverages": {},
    }

    result = calculate_archive_traits(profile)

    assert result["horror_presence"] == 0.5


def test_archive_profile_builds_traits():
    entries = [
        {
            "title": "Test Horror",
            "total_score": 90,
            "media_type": "video",
            "genres": ["horror"],
            "universal_scores": {
                "originality": 10,
                "depth": 9,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
    ]

    profile = build_archive_profile(entries)

    assert "traits" in profile
    assert profile["traits"]["originality_strength"] == 1
    assert profile["traits"]["horror_presence"] == 1
