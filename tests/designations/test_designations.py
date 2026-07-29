# import json
# from pathlib import Path

import pytest

from models.services.designation_engine import evaluate_designations
from tests.helpers.fixture_loader import load_profile_fixture

# def load_fixture(name):

#     path = Path(__file__).parents[2] / "fixtures" / "designations" / name

#     with open(path) as f:
#         return json.load(f)


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
