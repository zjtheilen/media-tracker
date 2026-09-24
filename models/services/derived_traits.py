def calculate_analysis(genres):

    psychological = genres.get("psychological", {}).get("percentage", 0)
    mystery = genres.get("mystery", {}).get("percentage", 0)

    return min(10, (psychological + mystery) / 10)


def calculate_experimental_affinity(genres):

    percentage = genres.get("experimental", {}).get("percentage", 0)

    return min(10, percentage / 10)


def calculate_genre_diversity(genres):

    return len(genres) * 2


def calculate_novelty(genres):

    return genres.get("experimental", {}).get("percentage", 0) / 10


def calculate_ambiguity(genres):

    psychological = genres.get("psychological", {}).get("percentage", 0)
    mystery = genres.get("mystery", {}).get("percentage", 0)
    surreal = genres.get("surreal", {}).get("percentage", 0)

    return min(10, (psychological + mystery + surreal) / 10)


def calculate_reflection(genres):
    drama = genres.get("drama", {}).get("percentage", 0)
    psychological = genres.get("psychological", {}).get("percentage", 0)

    return min(10, (drama + psychological) / 10)


def calculate_system_design(profile):
    gameplay = profile.get("mediaAverages", {}).get("gameplay_mechanics", 0)
    return gameplay
