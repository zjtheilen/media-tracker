from models.services.interpretation_engine import evaluate_interpretations
from models.services.archive_engine import generate_archive_summary

def test_high_engagement_interpretation():

    profile = {"universalAverages": {"engagement": 9}}

    results = evaluate_interpretations(profile)

    assert results[0]["id"] == "high-engagement"


def test_no_interpretation_when_threshold_not_met():

    profile = {"universalAverages": {"engagement": 7}}

    results = evaluate_interpretations(profile)

    assert results == []


def test_archive_summary_contains_genre_signature():
    summary = generate_archive_summary(
        {"title": "The Entertainer"},
        ("engagement", 9.2),
        ("craft", 8.9),
        ("gameplay_mechanics", 9.4),
        "speculative worlds",
    )

    assert "The Entertainer" in summary
    assert "speculative worlds" in summary
