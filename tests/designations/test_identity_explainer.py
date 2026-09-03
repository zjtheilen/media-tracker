from models.services.identity_explainer import explain_identity_score
from tests.helpers.fixture_loader import (
    load_identity_fixture,
    load_profile_fixture,
)


def test_identity_explanation_returns_trait_contributions():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    identity = {
        "identity_weights": {
            "originality": 0.35,
            "experimental_affinity": 0.25,
        }
    }

    result = explain_identity_score(identity, profile)

    assert result["top_traits"][0]["trait"] == "originality"

    assert result["breakdown"][0]["contribution"] > 0

    assert "value" in result["breakdown"][0]
    assert "weight" in result["breakdown"][0]
    assert "normalized" in result["breakdown"][0]


def test_interpretive_explanation_uses_real_identity_fixture():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    identity = load_identity_fixture("interpretive_philosophy.json")

    result = explain_identity_score(identity, profile)

    assert result["top_traits"][0]["trait"] == "depth"


def test_identity_explanation_contract():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    identity = load_identity_fixture("interpretive_philosophy.json")

    result = explain_identity_score(identity, profile)

    assert result["score"] > 0
    assert len(result["top_traits"]) <= 3
    assert result["top_traits"][0]["contribution"] >= result["top_traits"][1]["contribution"]