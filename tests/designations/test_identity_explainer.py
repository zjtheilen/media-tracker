from models.services.identity_explainer import explain_identity_score
from tests.helpers.fixture_loader import (
    load_profile_fixture,
    load_designation_fixture,
)


def test_identity_explanation_returns_trait_contributions():

    profile = load_profile_fixture(
        "boundary_explorer_profile.json"
    )

    identity = {
        "identity_weights": {
            "originality": 0.35,
            "experimental_affinity": 0.25,
        }
    }

    result = explain_identity_score(
        identity,
        profile
    )

    assert result[0]["trait"] == "originality"
    assert result[0]["contribution"] > 0

    assert "value" in result[0]
    assert "weight" in result[0]
    assert "normalized" in result[0]


def test_boundary_explorer_explanation_uses_real_identity_fixture():

    profile = load_profile_fixture(
        "boundary_explorer_profile.json"
    )

    identity = load_designation_fixture(
        "boundary_explorer.json"
    )

    result = explain_identity_score(
        identity,
        profile
    )

    assert result[0]["trait"] == "originality"
    assert result[0]["contribution"] > 0

    assert any(
        item["trait"] == "experimental_affinity"
        for item in result
    )