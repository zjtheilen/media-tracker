def trait_strength(value):

    if not value:
        return 0

    return min(max((value - 6) / 4, 0), 1)


def genre_weight(genre, profile):

    entry = profile["genreDistribution"].get(genre)

    if not entry:
        return 0

    return entry["count"] / profile["entryCount"]


def genre_affinity(profile, genre):
    return profile.get("genreAffinity", {}).get(genre, 0)
