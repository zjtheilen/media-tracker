from models.services.identity_finding import generate_identity_finding
from tests.helpers.fixture_loader import (
    load_identity_fixture,
    load_profile_fixture,
)


def test_interpretive_generates_identity_finding():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    identity = load_identity_fixture("interpretive_philosophy.json")

    result = generate_identity_finding(identity, profile)

    assert result["id"] == "identity-profile"
    assert result["category"] == "Identity Pattern"
    assert result["title"] == "Interpretive Philosophy"

    assert "evidence" in result
    assert "traits" in result["evidence"]