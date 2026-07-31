from models.services.genre_intelligence import (
    calculate_genre_affinity,
)


def test_genre_affinity():

    profile = {
        "genreDistribution": {
            "horror": {
                "count": 5,
                "percentage": 50
            },
            "sci-fi": {
                "count": 2,
                "percentage": 20
            }
        }
    }

    result = calculate_genre_affinity(profile)

    assert result["horror"] == 0.5
    assert result["sci-fi"] == 0.2