from itertools import combinations


def calculate_genre_affinity(profile):

    distribution = profile.get("genreDistribution", {})

    return {genre: data["percentage"] / 100 for genre, data in distribution.items()}


def calculate_genre_combinations(profile):
    combinations_score = {}
    entries = profile.get("entries", [])

    for entry in entries:
        genres = entry.get("genres", [])

        if len(genres) < 2:
            continue

        for pair in combinations(sorted(genres), 2):

            key = "+".join(pair)

            combinations_score[key] = combinations_score.get(key, 0) + 1

    total_entries = len(entries)

    if total_entries == 0:
        return {}

    return {
        key: round(value / total_entries, 2)
        for key, value in combinations_score.items()
    }
