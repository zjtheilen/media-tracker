from pathlib import Path
import json
import pytest

from models.services.designation_engine import evaluate_designations


def load_fixture(name):

    path = Path(__file__).parents[2] / "fixtures" / "designations" / name

    with open(path) as f:
        return json.load(f)


@pytest.mark.parametrize(
    "fixture,expected",
    [
        ("boundary_explorer.json", "boundary_explorer"),
        ("engagement_architect.json", "engagement_architect"),
        ("deep_diver.json", "deep_diver"),
    ],
)
def test_designation_profiles(fixture, expected):

    profile = load_fixture(fixture)

    results = evaluate_designations(profile)

    print(results)

    assert results[0]["id"] == expected


def test_designations_are_sorted():

    profile = load_fixture("boundary_explorer.json")

    results = evaluate_designations(profile)

    scores = [result["score"] for result in results]

    assert scores == sorted(scores, reverse=True)
