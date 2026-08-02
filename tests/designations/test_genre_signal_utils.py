from models.services.genre_signal_utils import get_genre_signal


def test_get_genre_signal():

    profile = {"genreDistribution": {"surreal": {"count": 5}, "fantasy": {"count": 2}}}

    result = get_genre_signal(profile, "experimentalist")

    assert result == 5


def test_surreal_genre_supports_experimentalist():

    profile = {"genreDistribution": {"surreal": {"count": 10}}}

    result = get_genre_signal(profile, "experimentalist")

    assert result == 10


def test_normalized_genre_signal_uses_archive_size():

    profile = {"entryCount": 100, "genreDistribution": {"surreal": {"count": 25}}}

    result = get_normalized_genre_signal(profile, "experimentalist")

    assert result == 0.25


def get_normalized_genre_signal(profile, designation):

    raw = get_genre_signal(profile, designation)

    entry_count = profile.get("entryCount", 0)

    if entry_count == 0:
        return 0

    return raw / entry_count


from models.services.genre_signal_utils import (
    get_genre_signal,
    get_normalized_genre_signal,
)


def test_normalized_genre_signal_uses_archive_size():

    profile = {"entryCount": 100, "genreDistribution": {"surreal": {"count": 25}}}

    result = get_normalized_genre_signal(
        profile,
        "experimentalist",
    )

    assert result == 0.25
