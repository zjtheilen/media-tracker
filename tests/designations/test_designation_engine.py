from models.services.designation_engine import evaluate_designations


def test_empty_designation_engine():

    results = evaluate_designations({})

    assert results == []


def test_designation_engine_returns_sorted_results():

    results = evaluate_designations({})

    assert isinstance(results, list)
