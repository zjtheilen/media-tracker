import pytest

from models.services.designation_engine import evaluate_designations
from models.services.designation_rules import evaluate_curator
from tests.helpers.fixture_loader import load_profile_fixture


@pytest.mark.parametrize(
    "fixture,expected",
    [
        ("boundary_explorer_profile.json", "boundary_explorer"),
        ("engagement_architect_profile.json", "engagement_architect"),
        ("deep_diver_profile.json", "deep_diver"),
    ],
)
def test_designation_profiles(fixture, expected):

    profile = load_profile_fixture(fixture)

    results = evaluate_designations(profile)

    assert results[0]["id"] == expected


def test_designations_are_sorted():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_designations(profile)

    scores = [result["score"] for result in results]

    assert scores == sorted(scores, reverse=True)


def test_curator_designation_scores_archive_breadth():

    profile = {
        "entryCount": 50,
        "genreDiversityScore": 1,
        "traits": {
            "craft_strength": 1,
            "presentation_strength": 1,
        },
    }

    result = evaluate_curator(profile)

    assert result == 100


def test_curator_designation_low_diversity_scores_lower():

    profile = {
        "entryCount": 5,
        "genreDiversityScore": 0.1,
        "universalAverages": {
            "craft": 8,
            "presentation": 8,
        },
    }

    result = evaluate_curator(profile)

    assert result < 100
