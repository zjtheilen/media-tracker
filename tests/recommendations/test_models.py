from models.recommendations.models import Recommendation


def test_recommendation_model():

    recommendation = Recommendation(
        title="Annihilation",
        media_type="book",
        match_score=90,
    )

    assert recommendation.title == "Annihilation"
    assert recommendation.match_score == 90