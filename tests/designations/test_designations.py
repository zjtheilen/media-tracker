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
        ("experimentalist.json", "experimentalist"),
        ("entertainer.json", "entertainer"),
        ("specialist.json", "specialist"),
    ],
)
def test_designation_profiles(fixture, expected):

    profile = load_fixture(fixture)

    results = evaluate_designations(profile)

    assert results[0]["id"] == expected


def test_designations_are_sorted():

    profile = load_fixture("experimentalist.json")

    results = evaluate_designations(profile)

    scores = [result["score"] for result in results]

    assert scores == sorted(scores, reverse=True)
