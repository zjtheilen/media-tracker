from models.services.identity_derived_traits import calculate_derived_trait
from models.services.identity_scorer import (
    evaluate_identity_scores,
    get_primary_identity,
)
from models.services.identity_scoring import resolve_identity_trait_value
from tests.helpers.fixture_loader import load_profile_fixture


def test_get_primary_identity_returns_boundary_explorer():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    identity = get_primary_identity(profile)

    assert identity["id"] == "boundary_explorer"


def test_boundary_explorer_profile_scores_boundary_explorer_highest():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_identity_scores(profile)

    assert results[0]["id"] == "boundary_explorer"


def test_boundary_explorer_scores_higher_than_other_identities():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["boundary_explorer"] > scores["deep_diver"]
    assert scores["boundary_explorer"] > scores["engagement_architect"]


def test_deep_diver_profile_scores_deep_diver_highest():
    profile = load_profile_fixture("deep_diver_profile.json")
    results = evaluate_identity_scores(profile)
    scores = {result["id"]: result["score"] for result in results}

    assert results[0]["id"] == "deep_diver"
    assert scores["deep_diver"] > scores["boundary_explorer"]
    assert scores["deep_diver"] > scores["engagement_architect"]


def test_engagement_architect_profile_scores_engagement_architect_highest():
    profile = load_profile_fixture("engagement_architect_profile.json")
    results = evaluate_identity_scores(profile)

    assert results[0]["id"] == "engagement_architect"


def test_generalist_profile_does_not_strongly_match_any_identity():
    profile = load_profile_fixture("generalist_profile.json")
    results = evaluate_identity_scores(profile)

    assert results[0]["score"] < 0.7


def test_empty_profile_returns_zero_scores():
    profile = {}

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert all(score == 0 for score in scores.values())


def test_ineligible_identity_cannot_be_primary():

    profile = {
        "entryCount": 5,
        "universalAverages": {
            "originality": 10,
            "depth": 10,
        },
    }

    identity = get_primary_identity(profile)

    assert identity is None or identity["id"] != "boundary_explorer"


def test_empty_profile_returns_no_eligible_identities():

    profile = {}

    results = evaluate_identity_scores(profile)

    assert results == []


def test_identity_scoring_uses_media_averages():

    profile = {"entryCount": 30, "mediaAverages": {"gameplay_mechanics": 10}}

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["engagement_architect"] > 0


def test_deep_diver_analysis_trait_can_contribute():

    profile = {
        "entryCount": 40,
        "genreDistribution": {
            "psychological": {"percentage": 80},
            "mystery": {"percentage": 20},
        },
    }

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["deep_diver"] > 0


def test_deep_diver_ambiguity_trait_can_contribute():

    profile = {
        "entryCount": 40,
        "genreDistribution": {
            "psychological": {"percentage": 50},
            "mystery": {"percentage": 30},
            "surreal": {"percentage": 20},
        },
    }

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["deep_diver"] > 0


def test_reflection_trait_can_contribute():

    profile = {"entryCount": 40, "genreDistribution": {"drama": {"percentage": 100}}}

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["deep_diver"] > 0


def test_engagement_architect_system_design_trait_can_contribute():

    profile = {
        "entryCount": 40,
        "mediaAverages": {"gameplay_mechanics": 10},
        "universalAverages": {"craft": 10},
    }

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["engagement_architect"] > 0


def test_calculate_derived_trait():
    profile = {
        "mediaAverages": {"gameplay_mechanics": 10},
        "universalAverages": {"craft": 10},
    }

    assert calculate_derived_trait("system_design", profile) == 10


def test_identity_is_ineligible_below_minimum_entries():

    profile = {
        "entryCount": 19,
        "universalAverages": {
            "depth": 10,
            "emotional_impact": 10,
            "reflection": 10,
            "ambiguity": 10,
            "analysis": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = {result["id"] for result in results}

    assert "deep_diver" not in identity_ids


def test_identity_below_minimum_entries_is_excluded_even_with_perfect_evidence():
    profile = {
        "entryCount": 19,
        "universalAverages": {
            "depth": 10,
            "emotional_impact": 10,
            "reflection": 10,
            "ambiguity": 10,
            "analysis": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = {result["id"] for result in results}

    assert "deep_diver" not in identity_ids


def test_identity_at_minimum_entries_is_included():
    profile = {
        "entryCount": 20,
        "universalAverages": {
            "depth": 10,
            "emotional_impact": 10,
            "reflection": 10,
            "ambiguity": 10,
            "analysis": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = {result["id"] for result in results}

    assert "deep_diver" in identity_ids


def test_identity_above_minimum_entries_is_included():
    profile = {
        "entryCount": 21,
        "universalAverages": {
            "depth": 10,
            "emotional_impact": 10,
            "reflection": 10,
            "ambiguity": 10,
            "analysis": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = {result["id"] for result in results}

    assert "deep_diver" in identity_ids


def test_identity_trait_resolution_prefers_universal_average():
    profile = {
        "universalAverages": {"craft": 8},
        "mediaAverages": {"craft": 4},
    }

    result = resolve_identity_trait_value("craft", profile)

    assert result == 8


def test_identity_trait_resolution_uses_media_average_when_universal_is_missing():
    profile = {
        "mediaAverages": {"gameplay_mechanics": 9},
    }

    result = resolve_identity_trait_value(
        "gameplay_mechanics",
        profile,
    )

    assert result == 9


def test_unknown_identity_trait_resolves_to_zero():
    profile = {}

    result = resolve_identity_trait_value(
        "not_a_real_trait",
        profile,
    )

    assert result == 0