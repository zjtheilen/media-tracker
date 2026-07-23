from models.recommendations.engine import generate_recommendations


def test_generate_recommendations_returns_list():

    result = generate_recommendations(
        {},
        []
    )

    assert isinstance(result, list)