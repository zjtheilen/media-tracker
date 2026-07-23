from models.services.observation_engine import evaluate_observations
from tests.designations.test_designations import load_fixture


def test_boundary_observation():

    profile = {
        "universalAverages": {
            "originality": 9,
        },
        "genreDistribution": {
            "experimental": {
                "percentage": 30,
            }
        },
    }

    results = evaluate_observations(profile)

    assert any(observation["id"] == "boundary-preference" for observation in results)


def test_depth_observation():

    profile = {
        "universalAverages": {
            "depth": 9,
        }
    }

    results = evaluate_observations(profile)

    assert any(observation["id"] == "interpretive-depth" for observation in results)


def test_no_observations():

    assert evaluate_observations({}) == []


def test_observation_contains_metadata():

    profile = {
        "universalAverages": {
            "depth": 9,
        }
    }

    results = evaluate_observations(profile)

    observation = next(item for item in results if item["id"] == "interpretive-depth")

    assert "traits" in observation
    assert "genres" in observation
    assert "relatedDesignations" in observation


def test_observation_contains_confidence():

    profile = load_fixture("boundary_explorer.json")

    observations = evaluate_observations(profile)

    assert "confidence" in observations[0]
    assert 0 <= observations[0]["confidence"] <= 1


def test_observations_sorted_by_confidence():

    profile = {
        "universalAverages": {
            "originality": 10,
            "depth": 10,
        },
        "mediaAverages": {
            "gameplay_mechanics": 10,
        },
        "genreDistribution": {
            "experimental": {
                "percentage": 40,
            }
        },
    }

    results = evaluate_observations(profile)

    assert results[0]["confidence"] >= results[-1]["confidence"]


def test_observation_contains_generated_content():

    profile = {
        "universalAverages": {
            "depth": 9,
        }
    }

    results = evaluate_observations(profile)

    observation = results[0]

    assert "title" in observation
    assert "description" in observation
    assert "evidence" in observation
