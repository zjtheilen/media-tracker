from models.services.finding_engine import evaluate_findings
from models.services.archive_engine import build_archive_profile
from tests.designations.test_designations import load_fixture


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


def test_designation_finding_exists():

    entries = [
        {
            "title": "Coherence",
            "media_type": "video",
            "genres": ["sci-fi", "surreal"],
            "total_score": 95,
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

    findings = evaluate_findings(profile)

    designation = next(
        finding for finding in findings if finding["id"] == "archive-designation"
    )

    assert designation["category"] == "Archive Identity"
    assert "evidence" in designation
    assert "traits" in designation["evidence"]
    assert "genres" in designation["evidence"]
    assert "recommendation_bias" in designation["evidence"]
