from models.services.genre_intelligence import calculate_genre_combinations


def test_genre_combinations():

    profile = {
        "entries": [
            {
                "genres": [
                    "horror",
                    "psychological",
                    "sci-fi",
                ]
            },
            {
                "genres": [
                    "horror",
                    "psychological",
                ]
            },
        ]
    }

    result = calculate_genre_combinations(profile)

    assert result["horror+psychological"] == 1.0
    assert result["horror+sci-fi"] == 0.5