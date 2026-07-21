from models.services.finding_utils import genre_presence


def test_genre_presence():

    profile = {
        "entryCount": 10,
        "genreDistribution": {
            "horror": {
                "count": 5
            }
        }
    }

    assert genre_presence("horror", profile) == .5