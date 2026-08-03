import json
from pathlib import Path

from .identity_scoring import calculate_identity_breakdown
from .identity_utils import normalize

IDENTITY_PATH = Path(__file__).parents[2] / "fixtures" / "identities"


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

        requirements = identity.get("requirements", {})

        minimum_entries = requirements.get("minimum_entries", 0)

        entry_count = profile.get("entryCount", 0)

        if entry_count < minimum_entries:
            score = 0
            breakdown = []

        else:
            breakdown = calculate_identity_breakdown(
                identity,
                profile,
                normalize,
            )

            score = round(
                sum(item["contribution"] for item in breakdown),
                3,
            )

        results.append(
            {
                "id": identity["id"],
                "name": identity["name"],
                "category": identity["category"],
                "description": identity["description"],
                "score": score,
                "breakdown": breakdown,
                "recommendation_bias": identity.get(
                    "recommendation_bias",
                    [],
                ),
            }
        )

    return sorted(
        results,
        key=lambda item: item["score"],
        reverse=True,
    )


def score_identity(identity, profile):

    breakdown = calculate_identity_breakdown(
        identity,
        profile,
        normalize,
    )

    return round(
        sum(item["contribution"] for item in breakdown),
        3,
    )


def get_primary_identity(profile):

    results = evaluate_identity_scores(profile)

    if not results:
        return None

    identities = load_identities()

    primary_id = results[0]["id"]

    return next(identity for identity in identities if identity["id"] == primary_id)
