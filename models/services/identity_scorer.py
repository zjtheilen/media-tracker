import json
from pathlib import Path

from .identity_derived_traits import calculate_derived_trait
from .identity_utils import normalize

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

        contribution = normalize(value) * weight

        score += contribution

    return round(score, 3)


def get_primary_identity(profile):

    results = evaluate_identity_scores(profile)

    if not results:
        return None

    identities = load_identities()

    primary_id = results[0]["id"]

    return next(identity for identity in identities if identity["id"] == primary_id)

