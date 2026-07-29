from models.services.designation_engine import evaluate_designations
from tests.helpers.fixture_loader import (
    load_profile_fixture,
)


def test_empty_designation_engine():

    results = evaluate_designations({})

    assert results == []


def test_designation_engine_returns_sorted_results():

    results = evaluate_designations({})

    assert isinstance(results, list)


def test_designation_contains_metadata():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_designations(profile)

    designation = results[0]

    assert "traits" in designation
    assert "genres" in designation
    assert "recommendation_bias" in designation

    assert len(designation["traits"]) > 0
    assert len(designation["recommendation_bias"]) > 0
