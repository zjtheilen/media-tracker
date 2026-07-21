from models.services.genre_signal_utils import get_genre_signal


def test_get_genre_signal():

    profile = {
        "genreDistribution": {
            "surreal": {
                "count": 5
            },
            "fantasy": {
                "count": 2
            }
        }
    }

    result = get_genre_signal(
        profile,
        "experimentalist"
    )

    assert result == 5