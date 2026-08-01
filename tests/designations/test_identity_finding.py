from models.services.identity_finding import generate_identity_finding
from tests.helpers.fixture_loader import (
    load_profile_fixture,
    load_designation_fixture,
)


def test_boundary_explorer_generates_identity_finding():

    profile = load_profile_fixture(
        "boundary_explorer_profile.json"
    )

    identity = load_designation_fixture(
        "boundary_explorer.json"
    )

    result = generate_identity_finding(
        identity,
        profile
    )

    assert result["id"] == "identity-profile"
    assert result["category"] == "Archive Identity"
    assert result["title"] == "Boundary Explorer"

    assert "evidence" in result
    assert "traits" in result["evidence"]