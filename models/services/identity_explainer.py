from .identity_derived_traits import calculate_derived_trait
from .identity_scorer import normalize


def explain_identity_score(identity, profile):

    breakdown = []

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

        normalized = normalize(value)

        breakdown.append(
            {
                "trait": trait,
                "value": value,
                "weight": weight,
                "normalized": normalized,
                "contribution": round(normalized * weight, 3),
            }
        )

    return sorted(breakdown, key=lambda item: item["contribution"], reverse=True)
