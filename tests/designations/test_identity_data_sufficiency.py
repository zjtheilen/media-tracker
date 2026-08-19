from models.services.identity_data_sufficiency import (
    calculate_identity_data_sufficiency,
)


def test_identity_data_sufficiency_reaches_one_after_minimum_entries():

    identity = {
        "requirements": {"minimum_entries": 15},
        "identity_weights": {
            "originality": 0.5,
            "depth": 0.5,
        },
    }

    profile = {"entryCount": 20}

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 1


def test_identity_data_sufficiency_handles_empty_archive():

    identity = {"requirements": {"minimum_entries": 15}}

    profile = {"entryCount": 0}

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 0


def test_identity_data_sufficiency_with_scoring_context():

    identity = {
        "requirements": {
            "minimum_entries": 15
        }
    }

    profile = {
        "entryCount": 20
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert 0 <= result <= 1
