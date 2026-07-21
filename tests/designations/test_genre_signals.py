from models.services.genre_signals import GENRE_SIGNALS


def test_surreal_signal_exists():

    assert GENRE_SIGNALS["surreal"]["experimentalist"] == 1
