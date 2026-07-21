def score_threshold(value, thresholds):
    for threshold in thresholds:
        if value >= threshold["value"]:
            return threshold["score"]

    return 0


def genre_presence(genre, profile):

    entry = profile.get("genreDistribution", {}).get(genre)

    if not entry:
        return 0

    return entry["count"] / profile["entryCount"]


def genre_strength(genre, profile):

    return genre_presence(genre, profile) * 100