from models.services.designation_rules import evaluate_curator


def test_curator_rewards_archive_breadth():

    profile = {
        "entryCount": 50,
        "genreDiversityScore": 1,
        "universalAverages": {
            "craft": 10,
            "presentation": 10,
        },
    }

    result = evaluate_curator(profile)

    assert result == 100


def test_curator_with_small_archive_scores_lower():

    profile = {
        "entryCount": 5,
        "genreDiversityScore": 0.1,
        "universalAverages": {
            "craft": 10,
            "presentation": 10,
        },
    }

    result = evaluate_curator(profile)

    assert result < 100
