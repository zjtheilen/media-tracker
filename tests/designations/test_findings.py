from models.services.finding_engine import evaluate_findings


def test_concept_driven_finding():

    profile = {"universalAverages": {"originality": 9, "depth": 8.5}}

    results = evaluate_findings(profile)

    assert results[0]["id"] == "concept-driven"


def test_concept_driven_not_triggered():

    profile = {"universalAverages": {"originality": 7, "depth": 9}}

    results = evaluate_findings(profile)

    assert results == []


def test_empty_findings():

    results = evaluate_findings({})

    assert results == []
