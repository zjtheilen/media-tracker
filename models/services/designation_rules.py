from .designation_utils import trait_strength, genre_weight


def evaluate_experimentalist(profile):

    score = 0

    score += genre_weight("experimental", profile) * 35

    score += trait_strength(profile["universalAverages"]["originality"]) * 40

    score += min(profile["entryCount"] / 40, 1) * 25

    experience_factor = min(profile["entryCount"] / 15, 1)

    score *= experience_factor

    return min(score, 100)


def evaluate_entertainer(profile):

    score = 0

    score += trait_strength(profile["universalAverages"].get("engagement")) * 40

    score += trait_strength(profile["mediaAverages"].get("gameplay_mechanics", 0)) * 25

    score += trait_strength(profile["mediaAverages"].get("narrative_pacing", 0)) * 20

    score += trait_strength(profile["averageScore"] / 10) * 15

    return min(score, 100)


def evaluate_specialist(profile):

    genres = [genre["count"] for genre in profile["genreDistribution"].values()]

    total = sum(genres)

    if not total:
        return 0

    largest = max(genres)

    preference_strength = (largest / total) * 100

    evidence_factor = min((profile["entryCount"] / 20) ** 0.5, 1)

    return min(preference_strength * evidence_factor, 100)

DESIGNATION_RULES = [
    {
        "id": "experimentalist",
        "title": "The Experimentalist",
        "description": "A seeker of unusual formats, unconventional ideas, and creative risks.",
        "evaluate": evaluate_experimentalist,
    },
    {
        "id": "entertainer",
        "title": "The Entertainer",
        "description": "A collector who prioritizes enjoyment, momentum, and fun.",
        "evaluate": evaluate_entertainer,
    },
    {
        "id": "specialist",
        "title": "The Specialist",
        "description": "A focused collector with strong preferences in specific areas.",
        "evaluate": evaluate_specialist,
    },
]