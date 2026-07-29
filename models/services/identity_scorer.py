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

    averages = {}

    averages.update(profile.get("universalAverages", {}))
    averages.update(profile.get("mediaAverages", {}))

    for trait, weight in weights.items():
        value = averages.get(trait)

        if value is None:
            value = calculate_derived_trait(trait, profile)

        score += normalize(value) * weight

    return round(score, 3)


def calculate_derived_trait(trait, profile):

    genres = profile.get("genreDistribution", {})

    if trait == "experimental_affinity":
        return genres.get("experimental", {}).get("percentage", 0) / 10

    if trait == "genre_diversity":
        return len(genres) * 2

    if trait == "novelty":
        return genres.get("experimental", {}).get("percentage", 0) / 10

    return 0
