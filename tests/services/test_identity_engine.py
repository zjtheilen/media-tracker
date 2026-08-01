from models.services.identity_finding import generate_identity_finding
from models.services.identity_scorer import get_primary_identity
from tests.helpers.fixture_loader import load_profile_fixture


def test_primary_identity_generates_finding():

    profile = load_profile_fixture(
        "boundary_explorer_profile.json"
    )

    identity = get_primary_identity(profile)

    result = generate_identity_finding(identity, profile)

    assert result["id"] == "identity-profile"
    assert result["title"] == identity["name"]
    assert "traits" in result["evidence"]