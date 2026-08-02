def genre_diversity_score(profile):

    genres = profile.get("genreDistribution", {})

    if not genres:
        return 0

    return min(len(genres) / 10, 1)


def calculate_profile_metrics(profile):

    return {
        "genreDiversityScore": genre_diversity_score(profile),
    }
