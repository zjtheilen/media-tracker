from .genre_signals import GENRE_SIGNALS


def get_genre_signal(profile, designation):

    score = 0

    for genre, data in profile.get("genreDistribution", {}).items():

        count = data.get("count", 0)

        weight = (
            GENRE_SIGNALS
            .get(genre, {})
            .get(designation, 0)
        )

        score += count * weight

    return score


def get_normalized_genre_signal(profile, designation):

    raw_signal = get_genre_signal(profile, designation)

    entry_count = profile.get("entryCount", 0)

    if entry_count == 0:
        return 0

    return raw_signal / entry_count
