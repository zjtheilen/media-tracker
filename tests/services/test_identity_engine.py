from models.services import identity_engine
from models.services.identity_engine import resolve_identity_candidates
from tests.helpers.fixture_loader import load_profile_fixture


def test_boundary_explorer_profile_has_supported_secondary_identity():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    primary, secondary = resolve_identity_candidates(profile)

    assert primary["id"] == "boundary_explorer"
    assert secondary is not None
    assert secondary["id"] == "engagement_architect"
    assert secondary["score"] >= 0.60


def test_deep_diver_profile_has_supported_secondary_identity():

    profile = load_profile_fixture("deep_diver_profile.json")

    primary, secondary = resolve_identity_candidates(profile)

    assert primary["id"] == "deep_diver"
    assert secondary is not None
    assert secondary["id"] == "engagement_architect"
    assert secondary["score"] >= 0.60


def test_engagement_architect_profile_has_no_supported_secondary_identity():

    profile = load_profile_fixture("engagement_architect_profile.json")

    primary, secondary = resolve_identity_candidates(profile)

    assert primary["id"] == "engagement_architect"
    assert secondary is None


def test_generalist_profile_has_no_supported_secondary_identity():

    profile = load_profile_fixture("generalist_profile.json")

    primary, secondary = resolve_identity_candidates(profile)

    assert primary["id"] == "engagement_architect"
    assert secondary is None


def test_secondary_identity_is_never_the_primary_identity():

    profile = load_profile_fixture("boundary_explorer_profile.json")

    primary, secondary = resolve_identity_candidates(profile)

    assert secondary is None or secondary["id"] != primary["id"]


def test_identity_tie_uses_component_evidence(monkeypatch):

    tied_results = [
        {
            "id": "identity_b",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.350},
                {"contribution": 0.250},
                {"contribution": 0.100},
            ],
        },
        {
            "id": "identity_a",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.400},
                {"contribution": 0.200},
                {"contribution": 0.100},
            ],
        },
    ]

    monkeypatch.setattr(
        identity_engine,
        "evaluate_identity_scores",
        lambda profile: tied_results,
    )

    primary, secondary = resolve_identity_candidates({})

    assert primary["id"] == "identity_a"
    assert secondary["id"] == "identity_b"


def test_identity_tie_uses_next_component_when_strongest_component_is_tied(
    monkeypatch,
):

    tied_results = [
        {
            "id": "identity_b",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.400},
                {"contribution": 0.150},
                {"contribution": 0.100},
            ],
        },
        {
            "id": "identity_a",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.400},
                {"contribution": 0.200},
                {"contribution": 0.050},
            ],
        },
    ]

    monkeypatch.setattr(
        identity_engine,
        "evaluate_identity_scores",
        lambda profile: tied_results,
    )

    primary, secondary = resolve_identity_candidates({})

    assert primary["id"] == "identity_a"
    assert secondary["id"] == "identity_b"


def test_identity_tie_uses_stronger_component_evidence(monkeypatch):

    tied_results = [
        {
            "id": "identity_b",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.350},
                {"contribution": 0.250},
                {"contribution": 0.100},
            ],
        },
        {
            "id": "identity_a",
            "score": 0.700,
            "breakdown": [
                {"contribution": 0.400},
                {"contribution": 0.200},
                {"contribution": 0.100},
            ],
        },
    ]

    monkeypatch.setattr(
        identity_engine,
        "evaluate_identity_scores",
        lambda profile: tied_results,
    )

    primary, secondary = resolve_identity_candidates({})

    assert primary["id"] == "identity_a"
    assert secondary["id"] == "identity_b"
