from .designation_rules import DESIGNATION_RULES


def evaluate_designations(profile):

    if not profile:
        return []

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
