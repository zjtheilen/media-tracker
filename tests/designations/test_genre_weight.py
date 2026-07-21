from models.services.designation_utils import genre_weight


def test_genre_weight():

    profile = {
        "entryCount": 10,
        "genreDistribution": {"experimental": {"count": 4}, "horror": {"count": 3}},
    }

    assert genre_weight("experimental", profile) == 0.4

    assert genre_weight("horror", profile) == 0.3

    assert genre_weight("fantasy", profile) == 0.0


def test_genre_weight_empty_profile():

    profile = {"entryCount": 0, "genreDistribution": {}}

    assert genre_weight("experimental", profile) == 0.0
