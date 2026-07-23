from models.services.designation_engine import evaluate_designations
from tests.designations.test_designations import load_fixture


def test_empty_designation_engine():

    results = evaluate_designations({})

    assert results == []


def test_designation_engine_returns_sorted_results():

    results = evaluate_designations({})

    assert isinstance(results, list)


def test_designation_contains_metadata():

    profile = load_fixture("boundary_explorer.json")

    results = evaluate_designations(profile)

    designation = results[0]

    assert "traits" in designation
    assert "genres" in designation
    assert "recommendationBias" in designation
