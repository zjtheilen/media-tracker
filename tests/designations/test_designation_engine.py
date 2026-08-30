from models.services.designation_engine import (
    evaluate_designations,
    resolve_primary_designation,
)
from tests.helpers.fixture_loader import (
    load_profile_fixture,
)


def test_empty_designation_engine():

    results = evaluate_designations({})

    assert results == []


def test_designation_engine_returns_sorted_results():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_designations(profile)

    assert isinstance(results, list)


def test_designations_are_sorted_by_score():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_designations(profile)

    scores = [result["score"] for result in results]

    assert scores == sorted(scores, reverse=True)


def test_designation_contains_metadata():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_designations(profile)

    designation = results[0]

    assert "traits" in designation
    assert "genres" in designation
    assert "recommendation_bias" in designation

    assert len(designation["traits"]) > 0
    assert len(designation["recommendation_bias"]) > 0


def test_resolve_primary_designation_returns_highest_scoring_designation():

    designations = [
        {"id": "low", "score": 40},
        {"id": "high", "score": 80},
        {"id": "middle", "score": 60},
    ]

    result = resolve_primary_designation(designations)

    assert result["id"] == "high"
    assert result["score"] == 80


def test_resolve_primary_designation_returns_none_for_empty_results():

    assert resolve_primary_designation([]) is None


def test_resolve_primary_designation_preserves_full_winner():

    designations = [
        {
            "id": "low",
            "score": 40,
            "title": "Low",
        },
        {
            "id": "high",
            "score": 80,
            "title": "High",
        },
    ]

    result = resolve_primary_designation(designations)

    assert result == designations[1]


def test_resolve_primary_designation_handles_ties_deterministically():

    designations = [
        {"id": "first", "score": 80},
        {"id": "second", "score": 80},
    ]

    result = resolve_primary_designation(designations)

    assert result["id"] == "first"