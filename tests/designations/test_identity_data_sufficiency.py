from models.services.identity_data_sufficiency import (
    calculate_identity_data_sufficiency,
)
from models.services.identity_scorer import evaluate_identity_scores


def test_identity_data_sufficiency_is_zero_for_empty_archive():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    profile = {
        "entryCount": 0
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 0


def test_identity_data_sufficiency_is_zero_when_entry_count_is_missing():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    profile = {}

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 0


def test_identity_data_sufficiency_reaches_one_at_minimum_entries():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    profile = {
        "entryCount": 20
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 1


def test_identity_data_sufficiency_is_partial_below_minimum_entries():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    profile = {
        "entryCount": 10
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 0.5


def test_identity_data_sufficiency_is_capped_at_one_above_minimum_entries():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    profile = {
        "entryCount": 40
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 1


def test_identity_data_sufficiency_rounds_to_three_decimal_places():

    identity = {
        "requirements": {
            "minimum_entries": 30
        }
    }

    profile = {
        "entryCount": 10
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 0.333


def test_identity_data_sufficiency_is_one_when_no_minimum_entries_required():

    identity = {
        "requirements": {
            "minimum_entries": 0
        }
    }

    profile = {
        "entryCount": 0
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 1


def test_identity_data_sufficiency_is_one_when_requirements_are_missing():

    identity = {}

    profile = {
        "entryCount": 0
    }

    result = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    assert result == 1


def test_identity_data_sufficiency_stays_within_zero_to_one_range():

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    for entry_count in [0, 1, 5, 10, 19, 20, 25, 100]:

        profile = {
            "entryCount": entry_count
        }

        result = calculate_identity_data_sufficiency(
            identity,
            profile,
        )

        assert 0 <= result <= 1


def test_data_sufficiency_does_not_determine_identity_eligibility():

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

    identity = {
        "requirements": {
            "minimum_entries": 20
        }
    }

    sufficiency = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    results = evaluate_identity_scores(profile)

    assert sufficiency == 0.95
    assert "deep_diver" not in {
        result["id"] for result in results
    }
