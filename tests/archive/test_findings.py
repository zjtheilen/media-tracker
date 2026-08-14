from models.services.archive_engine import build_archive_profile
from models.services.finding_engine import evaluate_findings
from models.services.identity_engine import generate_identity


def test_concept_driven_finding():

    profile = {"universalAverages": {"originality": 9, "depth": 8.5}}

    results = evaluate_findings(profile)

    assert results[0]["id"] == "concept-driven"


def test_concept_driven_not_triggered():

    profile = {"universalAverages": {"originality": 7, "depth": 9}}

    results = evaluate_findings(profile)

    assert not any(finding["id"] == "concept-driven" for finding in results)


def test_identity_finding_exists():

    profile = {
        "universalAverages": {
            "originality": 9,
            "depth": 10,
        },
        "entryCount": 30,
    }

    profile["primaryIdentity"] = generate_identity(profile)

    findings = evaluate_findings(profile)

    assert any(finding["id"] == "identity-profile" for finding in findings)


def test_empty_findings():

    results = evaluate_findings({})

    assert results == []


def test_archive_designation_is_not_a_finding():

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

    assert not any(finding["id"] == "archive-designation" for finding in findings)


def test_findings_have_neutral_structure():
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
    finding = evaluate_findings(profile)[0]

    assert "id" in finding
    assert "category" in finding
    assert "title" in finding
    assert "description" in finding
    assert "evidence" in finding


def test_concept_driven_triggers_at_both_thresholds():

    profile = {
        "universalAverages": {
            "originality": 8,
            "depth": 8,
        }
    }

    results = evaluate_findings(profile)

    assert any(
        finding["id"] == "concept-driven"
        for finding in results
    )


def test_concept_driven_requires_both_thresholds():

    profile = {
        "universalAverages": {
            "originality": 8,
            "depth": 7.9,
        }
    }

    results = evaluate_findings(profile)

    assert not any(
        finding["id"] == "concept-driven"
        for finding in results
    )


def test_atmospheric_interest_triggers_from_art_atmosphere():

    profile = {
        "mediaAverages": {
            "art_atmosphere": 8.5,
        }
    }

    results = evaluate_findings(profile)

    assert any(
        finding["id"] == "atmospheric-interest"
        for finding in results
    )


def test_atmospheric_interest_triggers_from_surreal_presence():

    profile = {
        "entryCount": 20,
        "genreDistribution": {
            "surreal": {
                "percentage": 20,
            }
        }
    }

    results = evaluate_findings(profile)

    assert any(
        finding["id"] == "atmospheric-interest"
        for finding in results
    )