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