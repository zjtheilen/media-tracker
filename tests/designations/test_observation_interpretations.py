from models.services.archive_interpretation import (
    generate_observation_summary,
)


def test_observation_summary_single():

    observations = [
        {
            "title": "Boundary Preference"
        }
    ]

    result = generate_observation_summary(observations)

    assert "Boundary Preference" in result


def test_observation_summary_multiple():

    observations = [
        {
            "title": "Boundary Preference"
        },
        {
            "title": "Interpretive Depth"
        },
    ]

    result = generate_observation_summary(observations)

    assert "Boundary Preference" in result
    assert "Interpretive Depth" in result


def test_observation_summary_empty():

    assert generate_observation_summary([]) is None