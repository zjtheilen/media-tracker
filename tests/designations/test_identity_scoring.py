from models.services.identity_derived_traits import calculate_derived_trait
from models.services.identity_scorer import (
    evaluate_identity_scores,
    get_primary_identity,
)
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


def test_identity_below_minimum_entries_scores_zero():

    profile = {"entryCount": 5, "universalAverages": {"originality": 10, "depth": 10}}

    results = evaluate_identity_scores(profile)

    scores = {result["id"]: result["score"] for result in results}

    assert scores["boundary_explorer"] == 0


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


def test_debug_identity_scores():
    profile = load_profile_fixture("boundary_explorer_profile.json")

    results = evaluate_identity_scores(profile)

    # for result in results:
    #     print(result["title"], result["score"])

    #     for item in result["breakdown"]:
    #         print(
    #             " ",
    #             item["trait"],
    #             item["value"],
    #             "=>",
    #             item["contribution"],
    #         )
