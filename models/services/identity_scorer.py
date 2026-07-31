import json
from pathlib import Path

IDENTITY_PATH = Path(__file__).parents[2] / "fixtures" / "designations"


def load_identities():

    identities = []

    for file in IDENTITY_PATH.glob("*.json"):
        with open(file) as f:
            identities.append(json.load(f))

    return identities


def evaluate_identity_scores(profile):

    identities = load_identities()

    results = []

    for identity in identities:
        results.append(
            {"id": identity["id"], "score": score_identity(identity, profile)}
        )

    return sorted(results, key=lambda item: item["score"], reverse=True)


def normalize(value):
    return max(0, min(value / 10, 1))


def score_identity(identity, profile):

    requirements = identity.get("requirements", {})

    minimum_entries = requirements.get("minimum_entries", 0)

    entry_count = profile.get("entryCount", 0)

    if entry_count < minimum_entries:
        return 0

    score = 0

    weights = identity["identity_weights"]

    universal = profile.get("universalAverages", {})
    media = profile.get("mediaAverages", {})

    for trait, weight in weights.items():

        if trait in universal:
            value = universal[trait]

        elif trait in media:
            value = media[trait]

        else:
            value = calculate_derived_trait(trait, profile)

        score += normalize(value) * weight

    return round(score, 3)


def calculate_derived_trait(trait, profile):

    genres = profile.get("genreDistribution", {})

    if trait == "experimental_affinity":
        percentage = genres.get("experimental", {}).get("percentage", 0)
        return min(10, percentage / 10)

    if trait == "genre_diversity":
        return len(genres) * 2

    if trait == "novelty":
        return genres.get("experimental", {}).get("percentage", 0) / 10

    if trait == "analysis":
        psychological = genres.get("psychological", {}).get("percentage", 0)
        mystery = genres.get("mystery", {}).get("percentage", 0)

        return min(10, (psychological + mystery) / 10)
    
    if trait == "ambiguity":
        psychological = genres.get("psychological", {}).get("percentage", 0)
        mystery = genres.get("mystery", {}).get("percentage", 0)
        surreal = genres.get("surreal", {}).get("percentage", 0)

        return min(10, (psychological + mystery + surreal) / 10)
    
    return 0
