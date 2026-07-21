from models.services.interpretation_engine import evaluate_interpretations


def test_high_engagement_interpretation():

    profile = {"universalAverages": {"engagement": 9}}

    results = evaluate_interpretations(profile)

    assert results[0]["id"] == "high-engagement"


def test_no_interpretation_when_threshold_not_met():

    profile = {"universalAverages": {"engagement": 7}}

    results = evaluate_interpretations(profile)

    assert results == []
