from .identity_derived_traits import calculate_derived_trait


def resolve_identity_trait_value(trait, profile):

    universal = profile.get("universalAverages", {})
    media = profile.get("mediaAverages", {})

    if trait in universal:
        return universal[trait]

    if trait in media:
        return media[trait]

    return calculate_derived_trait(trait, profile)


def calculate_identity_breakdown(identity, profile, normalize):

    breakdown = []

    weights = identity["weights"]

    for trait, weight in weights.items():

        value = resolve_identity_trait_value(
            trait,
            profile,
        )

        normalized = normalize(value)

        breakdown.append(
            {
                "trait": trait,
                "value": value,
                "weight": weight,
                "normalized": normalized,
                "contribution": round(
                    normalized * weight,
                    3,
                ),
            }
        )

    return sorted(
        breakdown,
        key=lambda item: item["contribution"],
        reverse=True,
    )