from .designation_rules import DESIGNATION_RULES


def evaluate_designations(profile):

    return sorted(
        [
            {
                "id": rule["id"],
                "title": rule["title"],
                "description": rule["description"],
                "score": rule["evaluate"](profile),
            }
            for rule in DESIGNATION_RULES
        ],
        key=lambda x: x["score"],
        reverse=True,
    )


def trait_strength(value: float | None) -> float:
    if value is None:
        return 0.0

    return max(0.0, min(1.0, (value - 6) / 4))


def genre_weight(genre, profile):
    entry = profile.get("genreDistribution", {}).get(genre)

    if not entry:
        return 0.0

    count = entry.get("count", 0)

    total = profile.get("entryCount", 0)

    if total == 0:
        return 0.0

    return count / total
