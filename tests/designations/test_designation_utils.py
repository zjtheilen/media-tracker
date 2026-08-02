from models.services.profile_metrics import genre_diversity_score


def test_genre_diversity_score_returns_zero_without_genres():

    profile = {"genreDistribution": {}}

    result = genre_diversity_score(profile)

    assert result == 0


def test_genre_diversity_score_calculates_genre_breadth():

    profile = {
        "genreDistribution": {
            "horror": {
                "count": 5,
                "percentage": 50,
            },
            "sci-fi": {
                "count": 3,
                "percentage": 30,
            },
            "experimental": {
                "count": 2,
                "percentage": 20,
            },
        }
    }

    result = genre_diversity_score(profile)

    assert result == 0.3


def test_genre_diversity_score_caps_at_one():

    profile = {
        "genreDistribution": {
            "horror": {},
            "sci-fi": {},
            "fantasy": {},
            "comedy": {},
            "drama": {},
            "action": {},
            "mystery": {},
            "romance": {},
            "documentary": {},
            "animation": {},
            "western": {},
        }
    }

    result = genre_diversity_score(profile)

    assert result == 1
