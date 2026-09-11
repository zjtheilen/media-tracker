import pytest

from models.services.genre_signal_utils import (
    get_genre_signal,
    get_normalized_genre_signal,
)


@pytest.mark.unit
def test_get_genre_signal():
    profile = {
        "genreDistribution": {
            "surreal": {"count": 5},
            "fantasy": {"count": 2},
        }
    }

    result = get_genre_signal(profile, "experimentalist")

    assert result == 5


@pytest.mark.unit
def test_surreal_genre_supports_experimentalist():
    profile = {
        "genreDistribution": {
            "surreal": {"count": 10},
        }
    }

    result = get_genre_signal(profile, "experimentalist")

    assert result == 10


@pytest.mark.unit
def test_normalized_genre_signal_uses_archive_size():
    profile = {
        "entryCount": 100,
        "genreDistribution": {
            "surreal": {"count": 25},
        },
    }

    result = get_normalized_genre_signal(profile, "experimentalist")

    assert result == 0.25


@pytest.mark.unit
def test_normalized_genre_signal_zero_entries():
    profile = {
        "entryCount": 0,
        "genreDistribution": {
            "surreal": {"count": 25},
        },
    }

    result = get_normalized_genre_signal(profile, "experimentalist")

    assert result == 0