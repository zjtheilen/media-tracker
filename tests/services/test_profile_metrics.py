from models.services.profile_metrics import (
    calculate_profile_metrics,
)


def test_profile_metrics_include_genre_diversity():

    profile = {
        "genreDistribution": {
            "horror": {},
            "sci-fi": {},
            "experimental": {},
        }
    }

    result = calculate_profile_metrics(profile)

    assert result["genreDiversityScore"] == 0.3
