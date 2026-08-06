from models.services.interpretation_engine import evaluate_interpretations
from models.services.archive_engine import generate_archive_summary
from models.services.archive_interpretation import generate_genre_signature_sentence


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
        {"title": "The Engagement Architect"},
        {
            "title": "Boundary Explorer",
        },
        ("engagement", 9.2),
        ("craft", 8.9),
        "Your archive demonstrates recurring interest in speculative worlds.",
    )

    assert "The Engagement Architect" in summary
    assert (
        "Your archive demonstrates recurring interest in speculative worlds." in summary
    )


def test_generate_genre_signature_filters_weak_genres():

    distribution = {
        "sci-fi": {"percentage": 55.6},
        "psychological": {"percentage": 38.9},
        "racing": {"percentage": 5.6},
    }

    result = generate_genre_signature_sentence(distribution)

    assert "sci-fi" in result
    assert "psychological" in result
    assert "racing" not in result
